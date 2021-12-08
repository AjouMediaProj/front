import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SignaturePad from 'signature_pad';
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
        margin: 5% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 20vw;
        height: 5vh;
        background-color: #102f57;
        color: white;
    }

    h2 {
        margin: 2% 0% 0% 0%;
        text-align: center;
        font-size: 20px;
        color: #6f6f6f;
    }
`;

const SignatureBody = styled.div`
    width: 60vw;

    height: 30vh;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    h1 {
        margin: 4% 0% 2% 0%;
        text-align: center;
        font-size: 25px;

        color: #000000;
    }
`;

function Agreement({ history }) {
    const location = useLocation();
    const voteName = location.state.voteName;

    return (
        <VotingBody>
            <h1>{voteName}</h1>
            <SignatureBody>
                <h1>동의합니다</h1>
            </SignatureBody>
            <button
                onClick={() => {
                    history.push({
                        pathname: '/vote/signature',
                        state: { voteIdx: location.state.voteIdx, voteName: voteName },
                    });
                }}>
                위의 상황에 대해 동의합니다.
            </button>
            <h2>아주대학교 총학생회 선거관리위원회</h2>
        </VotingBody>
    );
}

export default Agreement;
