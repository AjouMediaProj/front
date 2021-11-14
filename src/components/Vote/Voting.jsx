import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import main_background from 'src/img/MainBackground.png';
import * as api from 'src/api';

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

const CandidateListBody = styled.div`
    min-width: 60vw;
    max-width: 90vw;
    height: 60vh;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    ul {
        height: 60vh;
        display: flex;
        outline: none;
        flex-direction: vertical;
        overflow: scroll;
        &::-webkit-scrollbar {
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.4);
        }
        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
        }
    }
    ul li {
        list-style-type: none;
        min-width: 30vw;
        margin: 0% 0% 0% 0%;
    }
`;

const CandidateBody = styled.div`
    text-align: center;
    h4 {
        height: 20%;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin: 7% 0% 0% 0%;
    }
    img {
        width: 20vw;
        height: 30vh;
        outline-style: solid;
        outline-color: black;
        outline-width: 1px;
        margin: 7% 0% 0% 0%;
    }

    h5 {
        height: 20%;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin: 7% 0% 0% 0%;
    }
`;

const FormCheckText = styled.span`
    font-size: 18px;
    width: 6vw;
    height: 4vh;
    background: #e6e6e6;
    border-radius: 50px;

    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #777;
`;

const FormCheckLeft = styled.input.attrs({ type: 'radio' })`
    &:checked {
        background: none;
        padding: 0px 10px;
        text-align: center;
        height: 4vh;
        line-height: 33px;
        font-weight: 500;
        display: none;
    }
    &:checked + ${FormCheckText} {
        background: #00bfff;
        color: #fff;
    }

    display: none;
`;

function Voting({ history }) {
    const location = useLocation();
    const getParams = location.state.voteIdx;

    const [selectValue, setValue] = useState(0);

    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value);
        console.log(value);
    };

    const [overview, setOverview] = useState([]);

    useEffect(async () => {
        try {
            const res = await api.vote.getOverview(getParams);
            console.log('1212314123412341234');
            console.log(res.data.data.candidates[0]);
            // const _inputData = await res.data.data.list.map((rowData) => ({
            //     idx: rowData.idx,
            //     name: rowData.name,
            //     date: rowData.startTime,
            //     category: rowData.category,
            // }));

            // setOverview(overview.concat(_inputData));
            // console.log(overview);
        } catch (err) {
            //팝업
            console.log(err);
        }
    }, []);

    const candidates = [
        { id: 1, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        { id: 2, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
        { id: 3, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        { id: 4, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
        { id: 5, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 6, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 7, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 8, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 9, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 10, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 11, voteIdx: 1, name: '홍길동', img: 'asd', txt: 'asd', count: 0, state: 0 },
        // { id: 12, voteIdx: 1, name: '홍길동1', img: 'asd', txt: 'asd', count: 0, state: 0 },
    ];

    return (
        <VotingBody>
            <h1>2021학년도 아주대학교 총학생회 선거</h1>
            <CandidateListBody>
                <ul>
                    {candidates.map((candidate, i) => (
                        <li>
                            <React.Fragment key={i}>
                                <CandidateBody>
                                    <h4>{candidate.name}</h4>
                                    <img src="https://bloteawsbucket.s3.ap-northeast-2.amazonaws.com/original/1636385521467Picture4.jpg" />
                                    {/* <h5>
                                        <label>
                                            <FormCheckLeft type="radio" id={candidate.id} name={candidate.name} checked={selectValue == candidate.id} onChange={handleChange} value={candidate.id} />
                                            <FormCheckText>찬성</FormCheckText>
                                        </label>
                                    </h5> */}
                                    <h5>
                                        찬성
                                        <input
                                            id={candidate.id}
                                            value={candidate.id}
                                            name="candidate"
                                            type="radio"
                                            checked={selectValue == candidate.id}
                                            onChange={handleChange}
                                            style={{ width: 25, height: 25 }}
                                        />
                                    </h5>
                                </CandidateBody>
                            </React.Fragment>
                        </li>
                    ))}
                </ul>
            </CandidateListBody>
        </VotingBody>
    );
}

export default Voting;
