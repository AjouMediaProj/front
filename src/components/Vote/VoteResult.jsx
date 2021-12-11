import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SignaturePad from 'signature_pad';
import main_background from 'src/img/MainBackground.png';
import * as api from 'src/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VotingBody = styled.div`
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

const ResultBody = styled.div`
    width: 60vw;
    height: 60vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    h1 {
        margin: 2% 0% 3% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 8vw;
        height: 5vh;
        font-size: 18px;
        background-color: #102f57;
        color: white;
    }
`;

const ResultBox = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: space-around;
    align-items: center;
    width: 50vw;
    height: 40vh;
    background-color: #e5e5e5;
    padding: 0% 7% 0% 7%;
    outline-style: solid;
    outline-color: #c2c2c2;
    outline-width: 1px;

    h2 {
        margin: 4% 0% 0% 0%;
        text-align: center;
        font-size: 20px;
        color: #767676;
    }

    h2 + h2 {
        margin: 0% 0% 2% 0%;
    }

    h3 {
        margin: 2% 0% 0% 0%;
        text-align: center;
        font-size: 20px;
        color: #0139aa;
    }

    button {
        margin: 0% 0% 0% 0%;
        width: 7vw;
        height: 4vh;
        font-size: 18px;
        border: 0;
        outline: 0;
        text-decoration: underline;
        background-color: #e5e5e5;
        color: #0139aa;
    }
`;

function VoteResult({ history }) {
    const location = useLocation();

    const onClickToastPopup = () => {
        toast.info('클립보드에 복사되었습니다.');
    };

    return (
        <VotingBody>
            <h1>{location.state.voteName}</h1>
            <ResultBody>
                <h1>투표완료</h1>
                <ResultBox>
                    <h2>감사합니다.</h2>
                    <h2>투표가 완료되었습니다.</h2>
                    <h3>회원님의 투표 코드는 {location.state.hash} 입니다.</h3>
                    <CopyToClipboard text={location.state.hash}>
                        <button onClick={onClickToastPopup}>코드복사</button>
                    </CopyToClipboard>
                    <h2>본 코드는 서버에 저장되지 않으니 회원님의 투표결과를 확인하기 위해서는 반드시 기억해주시길 바랍니다.</h2>
                </ResultBox>
                <button
                    onClick={() => {
                        history.push({
                            pathname: '/vote',
                            //state: { voteIdx: location.state.voteIdx, voteName: location.state.voteName },
                        });
                    }}>
                    투표종료
                </button>
            </ResultBody>
            <ToastContainer position="bottom-center" />
        </VotingBody>
    );
}

export default VoteResult;
