import React, { Component, useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';
import utils from 'src/utils';
import Icon from 'src/img/icon.png';
import down from 'src/img/down.jpg';

const emailPlaceholder = '@ajou.ac.kr';

const Body = styled.div`
    width: 100%;
    max-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 2% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }
`;

const PromiseBody = styled.div`
    width: 60vw;
    min-height: 60vh;
    max-height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
    h6 {
        flex-grow: 1;
    }

    h1 {
        margin: 3% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }

    button {
        margin: 0% 0% 2% 0%;
        width: 8vw;
        height: 5vh;
        font-size: 20px;
        background-color: #102f57;
        color: white;
    }
    overflow: scroll;
    &::-webkit-scrollbar {
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`;

//input을 감싸주는 껍데기
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    outline: none;
    align-items: center;
    width: 22vw;
    transform: ${(props) => props.transform};
    margin-top: ${(props) => props.marginTop};
    margin-left: ${(props) => props.marginLeft};

    & + & {
        margin-top: 2.5vh;
    }
    h6 {
        flex-grow: 1;
    }

    button {
        width: 8vw;
        height: 4.5vh;
        margin: 0% 0% 0% 0%;

        font-size: 20px;
        font-weight: bold;
        background-color: white;
        color: black;
        border: 0.5px solid black;
        border-radius: 30px;
    }
`;

const Label = styled.div`
    font-size: 20px;
    color: #000000;
    margin-left: 1vw;
    font-weight: bold;
`;

//input with label
const ButtonWithLabel = ({ label, ...rest }) => (
    <Wrapper transform="translate(-50%, 0%)" marginTop="5vh" marginLeft="20vw">
        <img src={Icon} />
        <Label>{label}</Label>
        <h6></h6>
        <button {...rest}>공약보기 &gt;</button>
    </Wrapper>
);

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 60vw;
    height: 80vh;
    h6 {
        flex-grow: 1;
    }
    button {
        margin: 0% 0% 3% 0%;
        width: 7vw;
        height: 4vh;
        font-size: 18px;
        background-color: #102f57;
        color: #ffffff;
    }
    img {
        margin: 3% 0% 0% 0%;
        height: 60vh;
        width: 45vw;
        object-fit: contain;
    }
`;

const ModalWithImg = ({ ...rest }) => (
    <Modal>
        <ModalBox>
            <img {...rest} />
            <h6></h6>
            <button {...rest}>닫기</button>
        </ModalBox>
    </Modal>
);
function Promise({ history }) {
    const location = useLocation();
    const getParams = location.state.voteIdx;
    const voteName = location.state.voteName;

    const [overview, setOverview] = useState([]);
    const [modalOn, setModalOn] = useState(false);
    const [imgURL, setImgURL] = useState();

    useEffect(async () => {
        try {
            const res = await api.vote.getOverview(getParams);
            const _inputData = await res.candidates.map((rowData) => ({
                idx: rowData.idx,
                voteIdx: rowData.voteIdx,
                name: rowData.name,
                photo: rowData.photo,
                img: rowData.img,
                txt: rowData.txt,
                count: rowData.count,
                status: rowData.status,
            }));
            setOverview(overview.concat(_inputData));
        } catch (err) {
            //팝업
            alert(err);
        }
    }, []);

    const onOpenModal = () => {
        setModalOn(!modalOn);
    };

    return (
        <Body>
            <h1>{voteName}</h1>
            <PromiseBody>
                <h1>혹시 공약은 보셨나요?</h1>
                {overview.map((candidate) => (
                    <ButtonWithLabel
                        label={candidate.name}
                        onClick={() => {
                            onOpenModal();
                            setImgURL(candidate.img);
                        }}></ButtonWithLabel>
                ))}
                {modalOn ? <ModalWithImg onClick={onOpenModal} src={imgURL} /> : ''}
                <h6></h6>
                <button
                    onClick={() => {
                        history.push({
                            pathname: '/vote/voting',
                            state: { voteIdx: location.state.voteIdx, voteName: location.state.voteName, voteData: overview },
                        });
                    }}>
                    다음
                </button>
            </PromiseBody>
        </Body>
    );
}

export default Promise;
