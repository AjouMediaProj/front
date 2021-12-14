import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import utils from 'src/utils';

function VoteList({ history }) {
    const [votes, setVotes] = useState([]);

    useEffect(async () => {
        try {
            const res = await api.vote.getList();
            const _inputData = await res.map((rowData) => ({
                idx: rowData.idx,
                name: splitName(rowData.name),
                date: utils.common.changeDate(rowData.startTime, rowData.endTime),
                category: rowData.category,
                isVoted: rowData.isVoted,
            }));
            setVotes(votes.concat(_inputData));
        } catch (err) {
            //팝업
            alert(err);
            console.log(err);
        }
    }, []);

    const splitName = (name) => {
        let rtn = '';
        const nameArr = name.split(' ');
        for (let i in nameArr) {
            if (i == 0) {
                continue;
            }
            rtn += nameArr[i] + ' ';
        }
        return rtn;
    };

    const calNumLength = (num) => {
        num = num.toString();
        return num.length;
    };

    const voteAll = votes.filter((vote) => {
        return calNumLength(vote.category) === 1;
    });

    const voteListAll = voteAll.map((vote) => (
        <li key={vote.idx}>
            <VoteStyledBody
                onClick={() => {
                    if (utils.storageManager.userInfo !== null) {
                        if (vote.category !== Math.floor(utils.storageManager.userInfo.major / 10000)) {
                            alert('투표 권한이 없습니다.');
                        }
                    } else if (vote.isVoted) {
                        alert('이미 투표한 선거입니다.');
                    } else {
                        history.push({
                            pathname: '/vote/agreement',
                            state: { voteIdx: vote.idx, voteName: vote.name },
                        });
                    }
                }}
                color="#506EA5">
                <h4>{vote.name}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteCourse = votes.filter((vote) => {
        return calNumLength(vote.category) === 3;
    });
    const voteListCourse = voteCourse.map((vote) => (
        <li key={vote.idx}>
            <VoteStyledBody
                onClick={() => {
                    if (utils.storageManager.userInfo !== null) {
                        if (vote.category !== Math.floor(utils.storageManager.userInfo.major / 100)) {
                            alert('투표 권한이 없습니다.');
                        }
                    } else if (vote.isVoted) {
                        alert('이미 투표한 선거입니다.');
                    } else {
                        history.push({
                            pathname: '/vote/agreement',
                            state: { voteIdx: vote.idx, voteName: vote.name },
                        });
                    }
                }}
                color="#2E8B57">
                <h4>{vote.name}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteMajor = votes.filter((vote) => {
        return calNumLength(vote.category) === 5;
    });
    const voteListMajor = voteMajor.map((vote) => (
        <li key={vote.idx}>
            <VoteStyledBody
                onClick={() => {
                    if (utils.storageManager.userInfo !== null) {
                        if (vote.category !== utils.storageManager.userInfo.major) {
                            alert('투표 권한이 없습니다.');
                        }
                    } else if (vote.isVoted) {
                        alert('이미 투표한 선거입니다.');
                    } else {
                        history.push({
                            pathname: '/vote/agreement',
                            state: { voteIdx: vote.idx, voteName: vote.name },
                        });
                    }
                }}
                color="#8B5927">
                <h4>{vote.name}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    return (
        <StyledBody>
            <h1>진행중인 투표목록</h1>
            {(() => {
                if (voteListAll.length !== 0) {
                    return <h2>총학생회</h2>;
                }
            })()}
            <StyledList>{voteListAll}</StyledList>

            {(() => {
                if (voteListCourse.length !== 0) {
                    return <h2>단과대학교</h2>;
                }
            })()}
            <StyledList>{voteListCourse}</StyledList>

            {(() => {
                if (voteListMajor.length !== 0) {
                    return <h2>학과</h2>;
                }
            })()}
            <StyledList>{voteListMajor}</StyledList>
        </StyledBody>
    );
}

export default VoteList;

//전체적인 틀
const StyledBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin-top: 2%;
        margin-left: 5%;
        font-size: 25px;
        font-weight: bold;
        color: #3c3c3c;
    }

    h2 {
        margin-top: 1%;
        margin-left: 7%;
        font-size: 20px;
        font-weight: bold;
        color: #3c3c3c;
    }
`;

//카테고리별 리스트 틀
const StyledList = styled.ul`
    /* background-color: red; */
    display: flex;
    outline: none;
    flex-direction: vertical;
    flex-flow: wrap;
    margin-top: 0.5%;
    margin-left: 5.5%;
    width: 80%;

    li {
        list-style-type: none;
        width: 20%;
        margin-bottom: 2%;
        margin-right: 5%;
    }
`;

//하나의 투표의 틀
const VoteStyledBody = styled.div`
    width: 100%;
    height: 10vh;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    background-color: white;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    h4 {
        height: 60%;
        font-size: 17px;
        font-weight: bold;
        text-align: center;
        line-height: 7vh;
    }

    h5 {
        color: white;
        height: 32%;
        background-color: ${(props) => props.color || 'black'};
        font-size: 15px;
        text-align: right;
        padding-right: 3%;
        line-height: 3vh;
        border-top: 1px solid #212529;
    }
`;
