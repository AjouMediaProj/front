import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import main_background from 'src/img/MainBackground.png';
import * as api from 'src/api';
import utils from 'src/utils';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    width: 70vw;
    height: 63vh;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    ul {
        height: 53vh;
        max-width: 70vw;
        display: flex;
        outline: none;
        align-self: center;
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

    button {
        width: 10vw;
        height: 5vh;
        align-self: center;
        margin-top: 2vh;
        margin-bottom: 3vh;
        border: none;
        background-color: #102f57;
        color: white;
    }
`;

const CandidateBody = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

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
        object-fit: contain;
        outline-style: solid;
        outline-color: black;
        outline-width: 1px;
        margin: 7% 0% 0% 0%;
    }

    h5 {
        display: flex;
        height: 20%;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin: 7% 0% 0% 0%;
        align-items: end;
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

const DivStyle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

let click = true;

function Voting({ history }) {
    const location = useLocation();
    const getParams = location.state.voteIdx;

    const [selectValue, setValue] = useState(0);

    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value);
        console.log(value);
    };

    const [voteName, setVoteName] = useState('');
    const [overview, setOverview] = useState([]);
    const [circle, setCircle] = useState('none');

    // useEffect(async () => {
    //     try {
    //         const res = await api.vote.getOverview(getParams);
    //         setVoteName(res.voteName);
    //         const _inputData = await res.candidates.map((rowData) => ({
    //             idx: rowData.idx,
    //             voteIdx: rowData.voteIdx,
    //             name: rowData.name,
    //             img: rowData.img,
    //             txt: rowData.txt,
    //             count: rowData.count,
    //             status: rowData.status,
    //         }));
    //         setOverview(overview.concat(_inputData));
    //     } catch (err) {
    //         //??????
    //         alert(err);
    //     }
    // }, []);
    useEffect(() => {
        setVoteName(location.state.voteName);
        setOverview(location.state.voteData);
    }, []);

    const overClick = () => {
        if (click) {
            console.log('?????????');
            click = !click;
            setTimeout(() => {
                click = true;
            }, 2000);
        } else {
            console.log('?????????');
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (selectValue === 0) {
            alert('????????? ??????????????????.');
            return;
        } else {
            if (click) sendVote();
        }
    };

    const sendVote = async () => {
        overClick();
        setCircle('inline');
        try {
            const res = await api.vote.sendVote(location.state.voteIdx, selectValue, false);
            let hash = res.receipt;
            history.push({
                pathname: '/vote/voteresult',
                state: { hash: hash, voteName: location.state.voteName },
            });
            setCircle('none');
        } catch (e) {
            if (e.response) {
                if (e.response.status === utils.types.HttpStatus.NotFound) {
                    console.log(e.response.data.error);
                } else if (e.response.status === utils.types.HttpStatus.InternalServerError) {
                    if (e.response.data.error === 'UserAlreadyVoted') {
                        alert('?????? ????????? ???????????????.');
                    } else if (e.response.data.error === 'InvalidVoteCategory') {
                        alert('?????? ????????? ????????????.');
                    }
                }
            } else {
                alert(e);
            }
        }
    };

    return (
        <VotingBody>
            <h1>{voteName}</h1>

            <CandidateListBody>
                <ul>
                    {overview.map((candidate, i) => (
                        <li key={candidate.idx}>
                            <React.Fragment key={i}>
                                <CandidateBody>
                                    <h4>{candidate.name}</h4>
                                    <img src={candidate.photo} />
                                    {/* <h5>
                                        <label>
                                            <FormCheckLeft type="radio" id={candidate.id} name={candidate.name} checked={selectValue == candidate.id} onChange={handleChange} value={candidate.id} />
                                            <FormCheckText>??????</FormCheckText>
                                        </label>
                                    </h5> */}
                                    <h5>
                                        ??????
                                        <input
                                            id={candidate.idx}
                                            value={candidate.idx}
                                            name="candidate"
                                            type="radio"
                                            checked={selectValue == candidate.idx}
                                            onChange={handleChange}
                                            style={{ width: 20, height: 20, marginLeft: 10 }}
                                        />
                                    </h5>
                                </CandidateBody>
                            </React.Fragment>
                        </li>
                    ))}
                </ul>
                <CircularProgress style={{ alignSelf: 'center', display: circle }} />
                <button onClick={onSubmitHandler}>??? ???</button>
            </CandidateListBody>
        </VotingBody>
    );
}

export default Voting;
