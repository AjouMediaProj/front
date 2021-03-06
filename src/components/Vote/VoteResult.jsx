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
        toast.info('??????????????? ?????????????????????.');
    };

    return (
        <VotingBody>
            <h1>{location.state.voteName}</h1>
            <ResultBody>
                <h1>????????????</h1>
                <ResultBox>
                    <h2>???????????????.</h2>
                    <h2>????????? ?????????????????????.</h2>
                    <h3>???????????? ?????? ????????? {location.state.hash} ?????????.</h3>
                    <CopyToClipboard text={location.state.hash}>
                        <button onClick={onClickToastPopup}>????????????</button>
                    </CopyToClipboard>
                    <h2>??? ????????? ????????? ???????????? ????????? ???????????? ??????????????? ???????????? ???????????? ????????? ?????????????????? ????????????.</h2>
                </ResultBox>
                <button
                    onClick={() => {
                        history.push({
                            pathname: '/vote',
                            //state: { voteIdx: location.state.voteIdx, voteName: location.state.voteName },
                        });
                    }}>
                    ????????????
                </button>
            </ResultBody>
            <ToastContainer position="bottom-center" />
        </VotingBody>
    );
}

export default VoteResult;
