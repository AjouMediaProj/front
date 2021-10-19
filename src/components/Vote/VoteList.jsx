import React, { Component, useState } from 'react';
import styled from 'styled-components';

function VoteList() {
    const [votes, setVotes] = useState([
        { id: 1, text: '26대 총학생회 선거', date: '2121.10.11~2021.12.11', Category: '총학생회' },
        { id: 2, text: '정보통신대학1', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 3, text: '자연과학대학2', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 7, text: '자연과학대학3', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 8, text: '자연과학대학4', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 9, text: '자연과학대학5', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 10, text: '자연과학대학6', date: '2121.10.11~2021.12.11', Category: '단과대학교' },
        { id: 4, text: '미디어학과', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 5, text: '경제학과', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 6, text: '금융공학과1', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 11, text: '금융공학과2', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 12, text: '금융공학과43', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 14, text: '금융공학과4', date: '2121.10.11~2021.12.11', Category: '학과' },
        { id: 13, text: '금융공학과5', date: '2121.10.11~2021.12.11', Category: '학과' },
    ]);

    const voteAll = votes.filter((vote) => {
        return vote.Category === '총학생회';
    });
    const voteListAll = voteAll.map((vote) => (
        <li>
            <VoteStyledBody color="#506EA5">
                <h4 key={vote.id}>{vote.text}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteCourse = votes.filter((vote) => {
        return vote.Category === '단과대학교';
    });
    const voteListCourse = voteCourse.map((vote) => (
        <li>
            <VoteStyledBody color="#2E8B57">
                <h4 key={vote.id}>{vote.text}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteMajor = votes.filter((vote) => {
        return vote.Category === '학과';
    });
    const voteListMajor = voteMajor.map((vote) => (
        <li>
            <VoteStyledBody color="#8B5927">
                <h4 key={vote.id}>{vote.text}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    console.log(voteListCourse.length);

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
    margin-left: 5%;
    margin-right: 20%;

    li {
        list-style-type: none;
        width: 25%;
        margin-bottom: 2%;
        margin-right: 5%;
    }
`;

//하나의 투포의 틀
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
        font-size: 20px;
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
    }
`;
