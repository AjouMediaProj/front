import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';

const Body = styled.div`
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

const SignInBody = styled.div`
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
        margin: 15% 0% 2% 0%;
        //text-align: center;
        font-size: 20px;
        //font-weight: bold;
        color: red;
    }

    button {
        margin: 5% 0% 0% 0%;
        width: 8vw;
        height: 5vh;
        font-size: 20px;
        background-color: #102f57;
        color: white;
    }
`;

//input을 감싸주는 껍데기
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    outline: none;
    align-items: center;
    transform: ${(props) => props.transform};
    margin-top: ${(props) => props.marginTop};
    margin-left: ${(props) => props.marginLeft};

    & + & {
        margin-top: 3vh;
    }
    button {
        width: 20vw;
        height: 4vh;
        border: 0;
        outline: 0;
        margin-bottom: 4vh;
        font-size: 20px;
        font-weight: bold;
        background-color: #ffffff;
        color: #000000;
    }
    h6 {
        padding: 0% 10% 0% 10%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }
`;

const Label = styled.div`
    font-size: 20px;
    color: #000000;
    margin-right: 2vw;
    font-weight: bold;
`;

const Input = styled.input`
    width: 40vw;
    height: 4vh;
    border: 1px solid #707070;
    font-size: 20px;
    padding: 0% 5% 0% 5%;
    background-color: ${(props) => props.backColor || 'white'};
    ::placeholder {
        color: #707070;
        padding: 0% 0% 0% 60%;
    }
`;

//input with label
const InputWithLabel = ({ label, ...rest }) => (
    <Wrapper marginTop="10vh">
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);

function CodeCheck({ props, location, history }) {
    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [isCode, setIsCode] = useState(false);
    //console.log(location);

    useEffect(async () => {
        console.log(sessionStorage.getItem('auth'));
    }, []);

    const onCodeHandler = (event) => {
        const codeCurrent = event.currentTarget.value;
        setCode(codeCurrent);
        if (codeCurrent.length == 66 && codeCurrent.slice(0, 2) === '0x') {
            setIsCode(true);
        } else {
            setIsCode(false);
        }
        console.log(isCode);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!isCode) {
            alert('투표코드를 올바르게 입력해주세요.');
            return;
        }
        console.log(code);
    };

    return (
        <Body>
            <h1>투표코드확인</h1>
            <SignInBody>
                <InputWithLabel label="코드입력" onChange={onCodeHandler} onBlur={onCodeHandler} />
                <button onClick={onSubmitHandler}>확 인</button>
                <h1>블록체인 투표시스템은 투표코드를 통해 투표결과가 투명하게 진행되었는지 확인할 수 있습니다.</h1>
            </SignInBody>
        </Body>
    );
}

export default CodeCheck;
