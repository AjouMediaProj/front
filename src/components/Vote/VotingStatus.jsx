import React, { Component, useState } from 'react';
// import * as wijmo from '@grapecity/wijmo';
// import * as wjChart from '@grapecity/wijmo.react.chart';

import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

const StatusBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 1% 85% 2% 0%;
        font-size: 20px;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 8vw;
        height: 4vh;
        font-size: 15px;
        font-weight: bold;
        //border-radius: 30px;
        background-color: #102f57;
        color: white;
    }

    h2 {
        margin: 1% 0% 2% 0%;
        text-align: center;
        font-size: 20px;
        color: #000000;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 5vh;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
    padding-left: 21vw;
    button {
        margin: 0% 0% 0% 0%;
        width: 10vw;
        height: 4vh;
        /* border: 0;
        outline: 0; */

        font-size: 16px;
        font-weight: bold;
        background-color: #ffffff;
        color: #8b2b2b;
    }
    h6 {
        padding: 0% 1% 0% 1%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }
`;

const Wrapper2 = styled.div`
    width: 25vw;
    height: 25vh;
    outline-style: solid;
    outline-color: #707070;
    outline-width: 0.5px;
    background-color: #ffffff;
    padding-bottom: 1%;
    /* & + & {
        margin-left: 4vw;
    } */
`;

const BoxWithText = styled.div`
    width: 15vw;
    height: 25vh;
    outline-style: solid;
    outline-color: #707070;
    outline-width: 0.5px;
    background-color: #e5e5e5;
    h1 {
        font-size: 30px;
        color: #393939;
    }
    h2 {
        margin-top: 1vw;
        font-size: 25px;
        color: #393939;
    }
`;

const Statusbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90vw;
    height: 30vh;
    background-color: #e5e5e5;
    outline-style: solid;
    outline-color: #c2c2c2;
    outline-width: 1px;

    h1 {
        margin: 4% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }
`;

const BtnAndBtn = ({ ...rest }) => (
    <Wrapper>
        <button>진행중인 투표현황</button>
        <h6>|</h6>
        <button onClick={() => (window.location.href = '/vote/signup')}>지난 투표결과</button>
    </Wrapper>
);

const data = {
    labels: ['긍정적 15%', '부정적', '보통'],
    datasets: [
        {
            labels: ['긍정적', '부정적', '보통'],
            data: [60, 13, 27],
            borderWidth: 2,
            hoverBorderWidth: 3,
            backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],
            fill: true,
        },
    ],
};
function VotingStatus() {
    // const data = [
    //     { candidate: 'Samsung', votes: 321 },
    //     { candidate: 'Apple', votes: 215 },
    //     { candidate: 'Huawei', votes: 160 },
    //     { candidate: 'OPPO', votes: 112 },
    //     { candidate: 'Vivo', votes: 100 },
    //     { candidate: 'Others', votes: 638 },
    // ];

    // const getLabelContent = (ht) => {
    //     return wijmo.format('{name} {val:p2}', { name: ht.name, val: ht.value / 1546 });
    // };

    return (
        <StatusBody>
            <BtnAndBtn />
            <h1>진행중인 투표현황</h1>
            <Statusbox>
                <BoxWithText>
                    <h1>2021학년도 아주대학교 총학생회 선거</h1>
                    <h2>21.11.21~21.12.23</h2>
                </BoxWithText>
                <Wrapper2>
                    <Doughnut
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: true,
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: '응답자 비율',
                                fontSize: 15,
                                fontStyle: 'bold',
                                fontFamily: 'sans-serif',
                            },
                        }}
                        data={data}
                        height={100}
                    />
                </Wrapper2>
                <Wrapper2>
                    <Doughnut
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: true,
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: '투표 현황',
                                fontSize: 15,
                                fontStyle: 'bold',
                                fontFamily: 'sans-serif',
                            },
                        }}
                        data={data}
                        height={100}
                    />
                </Wrapper2>
            </Statusbox>
        </StatusBody>
    );
}

export default VotingStatus;
