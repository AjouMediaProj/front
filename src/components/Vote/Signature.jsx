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
        margin: 2% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }
`;

const SignatureBody = styled.div`
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
        margin: 4% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 10vw;
        height: 5vh;
        border-radius: 30px;
        font-size: 20px;
        background-color: #102f57;
        color: white;
    }

    /* canvas {
        margin: 2% 0% 0% 0%;
        width: 30vw;
        height: 30vh;
        outline-style: solid;
        outline-color: black;
        outline-width: 1px;
        background-color: #f7f7f7;
        border: 1px solid #cdcdcd;
    } */
`;

let sigPad = null;

function Signature({ history }) {
    const location = useLocation();

    const [sigPadData, setSigPadData] = useState(null);

    useEffect(() => {
        sigPad = new SignaturePad(document.querySelector('canvas'), {
            onBegin: () => {
                setSigPadData(sigPad.toDataURL());
            },
            // onEnd: () => {
            //     sigPad.clear();
            // },
        });
    }, []);

    const handleRestSignature = () => {
        sigPad.clear();
        setSigPadData();
    };

    return (
        <VotingBody>
            <h1>{location.state.voteName}</h1>
            <SignatureBody>
                <h1>전자서명</h1>
                <canvas width={600} height={325} style={{ border: '1px solid #000000', background: '#f7f7f7' }} />
                <button
                    onClick={() => {
                        history.push({
                            pathname: '/vote/voting',
                            state: { voteIdx: location.state.voteIdx, voteName: location.state.voteName },
                        });
                    }}>
                    확 인
                </button>
            </SignatureBody>
        </VotingBody>
    );
}

export default Signature;
