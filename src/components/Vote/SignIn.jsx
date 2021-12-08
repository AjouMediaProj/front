import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';

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
        margin: 4% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }

    button {
        margin: 5% 0% 0% 0%;
        width: 10vw;
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
    width: 17vw;
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
    <Wrapper transform="translate(-50%, 0%)" marginTop="15vh" marginLeft="20vw">
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);

const BtnAndBtn = ({ ...rest }) => (
    <Wrapper marginTop="3vh">
        <button>비밀번호 찾기</button>
        <h6>|</h6>
        <button onClick={() => (window.location.href = '/vote/signup')}>학교 e-mail로 회원가입</button>
    </Wrapper>
);

function SignIn() {
    const [Email, setEmail] = useState('');

    const [Password, setPassword] = useState('');

    const [isEmail, setIsEmail] = useState(false);

    const [isPassword, setIsPassword] = useState(false);

    const onEmailHandler = (event) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const emailCurrent = event.currentTarget.value;
        setEmail(emailCurrent);
        if (!emailRegex.test(emailCurrent)) {
            console.log('이메일 형식이 틀림');
            setIsEmail(false);
        } else {
            console.log('올바른 이메일 형식');
            setIsEmail(true);
        }
    };

    return (
        <Body>
            <h1>아주대학교 온라인 투표시스템 로그인</h1>
            <SignInBody>
                <InputWithLabel label="학교 E-mail" name="email" placeholder="@ajou.ac.kr" onChange={onEmailHandler} type="email" />
                <InputWithLabel label="비밀번호" name="password" onChange={onEmailHandler} type="password" />
                <button>로그인</button>
                <BtnAndBtn />
            </SignInBody>
        </Body>
    );
}

export default SignIn;
