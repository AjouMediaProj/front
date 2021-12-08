import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';

function VoteList({ history }) {
    const [votes, setVotes] = useState([]);

    const changeDate = (start, end) => {
        const startTime = new Date(start * 1000);
        const endTime = new Date(end * 1000);

        let startDate = '';
        startDate += startTime.getFullYear() + '.';
        startDate += changeDateFomat(startTime.getMonth() + 1);
        startDate += '.' + changeDateFomat(startTime.getDate());

        let endDate = '';
        endDate += endTime.getFullYear() + '.';
        endDate += changeDateFomat(endTime.getMonth() + 1);
        endDate += '.' + changeDateFomat(endTime.getDate());

        return startDate + ' ~ ' + endDate;
    };

    const changeDateFomat = (time) => {
        if (time < 10) return '0' + time;
        else return time;
    };

    useEffect(async () => {
        try {
            const res = await api.vote.getList();
            const _inputData = await res.map((rowData) => ({
                idx: rowData.idx,
                name: rowData.name,
                date: changeDate(rowData.startTime, rowData.endTime),
                category: rowData.category,
            }));
            setVotes(votes.concat(_inputData));
        } catch (err) {
            //팝업
            alert(err);
            console.log(err);
        }
    }, []);

    //임시
    // const votes = [
    //     { id: 1, name: '26대 총학생회 선거', date: '2121.10.11~2021.12.11', category: '총학생회' },
    //     { id: 2, name: '정보통신대학1', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 3, name: '자연과학대학2', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 7, name: '자연과학대학3', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 8, name: '자연과학대학4', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 9, name: '자연과학대학5', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 10, name: '자연과학대학6', date: '2121.10.11~2021.12.11', category: '단과대학교' },
    //     { id: 4, name: '미디어학과', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 5, name: '경제학과', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 6, name: '금융공학과1', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 11, name: '금융공학과2', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 12, name: '금융공학과43', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 14, name: '금융공학과4', date: '2121.10.11~2021.12.11', category: '학과' },
    //     { id: 13, name: '금융공학과5', date: '2121.10.11~2021.12.11', category: '학과' },
    // ];

    const voteAll = votes.filter((vote) => {
        return vote.category == 0;
    });

    const voteListAll = voteAll.map((vote) => (
        <li key={vote.idx}>
            <VoteStyledBody
                onClick={() => {
                    history.push({
                        pathname: '/vote/agreement',
                        state: { voteIdx: vote.idx, voteName: vote.name },
                    });
                }}
                color="#506EA5">
                <h4>{vote.name}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteCourse = votes.filter((vote) => {
        return vote.category == 101;
    });
    const voteListCourse = voteCourse.map((vote) => (
        <li key={vote.id}>
            <VoteStyledBody
                onClick={() => {
                    history.push({
                        pathname: '/vote/signature',
                        state: { voteIdx: vote.id },
                    });
                }}
                color="#2E8B57">
                <h4>{vote.name}</h4>
                <h5>{vote.date}</h5>
            </VoteStyledBody>
        </li>
    ));

    const voteMajor = votes.filter((vote) => {
        return vote.category == 10101;
    });
    const voteListMajor = voteMajor.map((vote) => (
        <li key={vote.id}>
            <VoteStyledBody color="#8B5927">
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
