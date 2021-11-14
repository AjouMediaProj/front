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
`;

let sigPad = null;

function Signature() {
    const [sigPadData, setSigPadData] = useState(null);

    useEffect(() => {
        sigPad = new SignaturePad(document.querySelector('canvas'), {
            onBegin: () => {
                setSigPadData(sigPad.toDataURL());
            },
        });
    }, []);

    const handleRestSignature = () => {
        sigPad.clear();
        setSigPadData();
    };

    return (
        <VotingBody>
            <h1>2021학년도 아주대학교 총학생회 선거</h1>
            <SignatureBody>
                <h1>전자서명</h1>
                <canvas width={300} height={325} style={{ border: '1px solid #cdcdcd' }} />
            </SignatureBody>
        </VotingBody>
    );
}

export default Signature;
