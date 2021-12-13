import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import utils from 'src/utils';
import Select from 'react-select';
import * as api from 'src/api';
import btn_logo from 'src/img/search.png';

const StatusBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 1% 70% 2% 0%;
        width: 20vw;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        outline-style: solid;
        outline-color: black;
        outline-width: 1px;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 8vw;
        height: 4vh;
        font-size: 15px;
        font-weight: bold;
        border-radius: 30px;
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
    padding-left: 14.5vw;
    button {
        margin: 0% 0% 0% 0%;
        width: 10vw;
        height: 4vh;
        border: 0;
        outline: 0;
        font-size: 16px;

        font-weight: ${(props) => (props.status ? 'normal' : 'bold')};
        text-decoration: ${(props) => (props.status ? 'none' : 'underline')};
        background-color: #ffffff;

        color: #393939;
    }
    h6 {
        padding: 0% 1% 0% 1%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }
    h6 + button {
        font-weight: ${(props) => (props.status ? 'bold' : 'normal')};
        text-decoration: ${(props) => (props.status ? 'underline' : 'none')};
    }
`;

const Wrapper2 = styled.div`
    width: 25vw;
    height: 30vh;
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
    width: 20vw;
    height: 25vh; //25

    background-color: #e5e5e5;

    h3 {
        width: 100%;
        //text-align: left;
        font-size: 25px;
        font-family: 'Nanum';
        word-break: keep-all;
        color: #393939;
    }
    h4 {
        text-align: left;
        width: 100%;
        margin-top: 1vw;
        font-size: 20px;
        color: #393939;
    }
`;

const Statusbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90vw;
    height: 35vh; //30
    background-color: #e5e5e5;
    outline-style: solid;
    outline-color: #c2c2c2;
    outline-width: 1px;

    & + & {
        margin-top: 3vh;
    }
`;

const BtnAndBtn = ({ onTrue, onFalse, status, ...rest }) => (
    <Wrapper status={status}>
        <button onClick={onFalse}>진행중인 투표현황</button>
        <h6>|</h6>
        <button onClick={onTrue}>지난 투표결과</button>
    </Wrapper>
);

// const data = {
//     labels: [],
//     datasets: [
//         {
//             labels: [],
//             data: [],
//             borderWidth: 4,
//             hoverBorderWidth: 3,
//             backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],
//             fill: true,
//         },
//     ],
// };

const data = {
    labels: ['긍정적 ', '부정적', '보통'],
    datasets: [
        {
            labels: ['긍정적 15', '부정적', '보통'],
            data: [0, 0, 0],
            borderWidth: 4,
            hoverBorderWidth: 3,
            backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)', 'rgba(255,0,0,1)'],
            fill: true,
        },
    ],
};

//styles of select
const customStyles = {
    control: (provided) => ({
        ...provided,
        height: '5vh',
        width: '10vw',
    }),
};

const Wrapper3 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 5vh;
    padding-left: 5vw;
`;

const Wrapper4 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 25vw;
    height: 5vh;

    border-radius: 2px;
    outline-style: solid;
    outline-color: #cecdcd;
    outline-width: 0.5px;
    margin-left: 3vw;

    button {
        height: 5vh;
        width: 3vw;
        margin: 0% 0% 0% 0%;
        border-radius: 0;
        background-image: url(${btn_logo});
        background-color: white;
        background-size: 1.5vw 2.7vh;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

const Input = styled.input`
    width: 22vw;
    height: 5vh;
    border: 1px solid #707070;
    /* outline-style: solid;
    outline-color: blue;
    outline-width: 1px; */
    font-size: 17px;
    padding: 0% 5% 0% 5%;
    outline: 0;
    border: 0;
    background-color: white;
    ::placeholder {
        color: #707070;
        //padding: 0% 0% 0% 0%;
    }
    &:focus {
        outline: none;
    }
`;

const Table = styled.table`
    width: 90%;
    margin: 3vh 0 1vh 0;
    text-align: center;
    border-spacing: 0;

    th {
        border-bottom: 1px solid #393939;
        border-top: 1px solid #393939;
        background-color: #ebf1f9;
        //padding: 0;
        font-size: 17px;
        padding: 1vh 0 1vh 0;
        font-weight: bold;
    }
    tr {
        font-size: 17px;
        border-bottom: 1px solid #b0b0b0;
    }
    tr:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
    td {
        text-align: center;
    }

    td + td {
        //padding: 10px 5px;
        text-align: start;
        padding: 1vh 0 1vh 10vw;
    }
`;

function VotingStatus({ history }) {
    const location = useLocation();

    const getParams = location.state ? location.state.status : false;

    const [status, setStatus] = useState(getParams); //false: progress , ture: past
    const onStatusTrueHandler = () => {
        setStatus(true);
    };
    const onStatusFalseHandler = () => {
        setStatus(false);
    };

    const [voteData, setVoteData] = useState([]);
    const [pastVoteData, setPastVoteData] = useState([]);
    const [listCount, setListCount] = useState();
    //----------------------------------------------------------------------
    const [year, setYear] = useState(0);
    const [title, setTitle] = useState('');
    const [isTitle, setIsTitle] = useState(false);

    useEffect(async () => {
        try {
            setStatus(utils.storageManager.back ? true : status);
            sessionStorage.removeItem('back');

            if (!status) {
                const res = await api.vote.getMyVote();
                setVoteData(res.list);
            } else {
                const res = await api.vote.getPastVote(1, '', 0);
                setPastVoteData(res.list);
                setListCount(res.totalCount);
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response);
            } else {
                console.log(e);
            }
        }
    }, [status]);

    //Set Vote Name for Status
    const setVoteName = (name, start, end) => {
        const array = name.split(' ');
        let firstStr = array[0];
        let secondStr = array[1];
        let lastStr = '';
        for (var i = 2; i < array.length; i++) {
            lastStr += array[i] + ' ';
        }
        let date = utils.common.changeDate(start, end);
        return (
            <BoxWithText>
                <h3>{firstStr}</h3>
                <h3>{secondStr}</h3>
                <h3>{lastStr}</h3>
                <h4>{date}</h4>
            </BoxWithText>
        );
    };

    const TotalNumber = 250;

    //Set Response Data for Status
    const setResData = (totalCnt) => {
        let dataSet = {
            labels: [],
            datasets: [
                {
                    labels: ['응답자', '미응답자'],
                    data: [],
                    borderWidth: 4,
                    hoverBorderWidth: 3,
                    backgroundColor: ['rgba(255, 232, 138, 1)', 'rgba(165, 165, 165, 1)'],
                    fill: true,
                },
            ],
        };
        dataSet.labels = ['응답자 ' + ((totalCnt / TotalNumber) * 100).toFixed(1) + '%', '미응답자 ' + (((TotalNumber - totalCnt) / TotalNumber) * 100).toFixed(1) + '%'];
        dataSet.datasets[0].data = [totalCnt, TotalNumber - totalCnt];
        return dataSet;
    };

    //Set Candidates Data for Status
    const setCandData = (candList) => {
        let dataSet = {
            labels: [],
            datasets: [
                {
                    labels: [],
                    data: [],
                    borderWidth: 4,
                    hoverBorderWidth: 3,
                    backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],
                    fill: true,
                },
            ],
        };
        let total = 0;
        for (var i = 0; i < candList.length; i++) {
            total += candList[i].count;
        }
        dataSet.labels = candList.map((item) => item.name + ' ' + ((item.count / total) * 100).toFixed(1) + '%');
        dataSet.datasets[0].labels = candList.map((item) => item.name);
        dataSet.datasets[0].data = candList.map((item) => item.count);
        return dataSet;
    };

    const setCandDataOnly = (totalCnt, candList) => {
        let dataSet = {
            labels: [],
            datasets: [
                {
                    labels: [],
                    data: [],
                    borderWidth: 4,
                    hoverBorderWidth: 3,
                    backgroundColor: ['rgba(238, 102, 121, 1)', 'rgba(98, 181, 229, 1)', 'rgba(255, 198, 0, 1)'],
                    fill: true,
                },
            ],
        };
        dataSet.labels = [candList[0].name + ' ' + ((candList[0].count / totalCnt) * 100).toFixed(1) + '%', '반대' + ' ' + (((totalCnt - candList[0].count) / totalCnt) * 100).toFixed(1) + '%'];
        dataSet.datasets[0].labels = [candList[0].name, '반대'];
        dataSet.datasets[0].data = [candList[0].count, totalCnt - candList[0].count];
        return dataSet;
    };

    const drawVoteStatus = voteData.map((item) => {
        if (item.candidates.length === 1) {
            let resData = setResData(item.totalVoteCnt);
            let candData = setCandDataOnly(item.totalVoteCnt, item.candidates);
            return (
                <Statusbox>
                    {setVoteName(item.voteName, item.startTime, item.endTime)}
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
                                },
                            }}
                            data={resData}
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
                                },
                            }}
                            data={candData}
                            height={100}
                        />
                    </Wrapper2>
                </Statusbox>
            );
        } else {
            let resData = setResData(item.totalVoteCnt);
            let candData = setCandData(item.candidates);

            return (
                <Statusbox>
                    {setVoteName(item.voteName, item.startTime, item.endTime)}
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
                                },
                            }}
                            data={resData}
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
                                },
                            }}
                            data={candData}
                            height={100}
                        />
                    </Wrapper2>
                </Statusbox>
            );
        }
    });

    //--------------------------------------------------------------

    const options = [
        {
            value: 2020,
            label: '2020',
        },
        {
            value: 2021,
            label: '2021',
        },
    ];

    const onYearHandler = (event) => {
        setYear(event.value);
    };

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
        if (event.currentTarget.value.length > 0) {
            setIsTitle(true);
        } else {
            setIsTitle(false);
        }
    };

    const drawPastVoteList = pastVoteData.map((item) => {
        let result = '';
        let count = -1;
        for (let i = 0; i < item.candidates.length; i++) {
            if (item.candidates[i].count > count) {
                count = item.candidates[i].count;
                result = item.candidates[i].name;
            }
        }
        return (
            <tr
                onClick={() =>
                    history.push({
                        pathname: '/vote/pastvotingstatus',
                        state: { data: item },
                    })
                }>
                <td>{item.idx}</td>
                <td>{item.voteName}</td>
                <td>{result}</td>
            </tr>
        );
    });

    return (
        <StatusBody>
            <BtnAndBtn onTrue={onStatusTrueHandler} onFalse={onStatusFalseHandler} status={status} />
            {status ? (
                <>
                    <h1>지난 투표결과</h1>
                    <Wrapper3>
                        <Select label="연도" options={options} placeholder="연도" styles={customStyles} onChange={onYearHandler} />
                        <Wrapper4>
                            <Input name="title" placeholder="투표 검색" onChange={onTitleHandler} />
                            <button></button>
                        </Wrapper4>
                    </Wrapper3>
                    <Table>
                        <thead>
                            <tr>
                                <th>투표번호</th>
                                <th>투표명</th>
                                <th>결과</th>
                            </tr>
                        </thead>
                        <tbody>{drawPastVoteList}</tbody>
                    </Table>
                </>
            ) : (
                <>
                    <h1>진행중인 투표현황</h1>
                    {drawVoteStatus}
                </>
            )}
        </StatusBody>
    );
}

export default VotingStatus;
