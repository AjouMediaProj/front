import React, { Component, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';
import utils from 'src/utils';

const emailPlaceholder = '@ajou.ac.kr';

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

const Wrapper2 = styled.div`
    width: 17vw;
    display: flex;
    align-items: center;
    border: 1px solid #707070;
    background-color: ${(props) => props.backColor || 'white'};
`;

const Label = styled.div`
    font-size: 20px;
    color: #000000;
    margin-right: 2vw;
    font-weight: bold;
`;

const Label2 = styled.div`
    font-size: 17px;
    color: #000000;
    margin-right: 2vw;
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
    &:focus {
        outline: none;
    }
`;

const Input2 = styled.input`
    width: 8vw;
    height: 4vh;
    font-size: 17px;
    border: none;
    padding: 0% 5% 0% 5%;
    flex-grow: 1;

    &:focus {
        outline: none;
    }
`;

//input with label
const InputWithLabel = ({ label, ...rest }) => (
    <Wrapper transform="translate(-50%, 0%)" marginTop="15vh" marginLeft="20vw">
        <Label>{label}</Label>
        <Wrapper2>
            <Input2 {...rest} />
            <Label2>{emailPlaceholder}</Label2>
        </Wrapper2>
    </Wrapper>
);

const InputWithLabel2 = ({ label, ...rest }) => (
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

function SignIn({ props, location, history }) {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    useEffect(() => {
        if (location.state) alert('로그인후 이용해주세요');
    }, []);

    const onEmailHandler = (event) => {
        const emailCurrent = event.currentTarget.value;
        setEmail(emailCurrent);

        if (emailCurrent == '') {
            setIsEmail(false);
            console.log('이메일 형식이 잘못되었습니다.');
        } else {
            setIsEmail(true);
            console.log('올바른 이메일 형식입니다.');
        }
    };

    const onPasswordHandler = (event) => {
        const passwordCurrent = event.currentTarget.value;
        setPassword(passwordCurrent);
        if (passwordCurrent.length > 0) {
            setIsPassword(true);
        } else {
            setIsPassword(false);
        }
    };

    const onKeyPress = (event) => {
        if (event.key == 'Enter') {
            onSubmitHandler(event);
        }
    };

    const { from } = location.state || { from: { pathname: '/vote' } };
    const pathCheck = () => {
        if (from.pathname === '/vote/agreement') {
            from.pathname = '/vote';
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!isEmail) {
            alert('아이디를 입력해주세요');
            return;
        } else if (!isPassword) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        console.log(from);
        sendSignIn();
    };

    //Sign-In
    const sendSignIn = async () => {
        try {
            const res = await api.member.sendSignIn(Email + emailPlaceholder, Password);
            utils.storageManager.setUserInfo(res);
            utils.storageManager.setAuth(true);
            pathCheck();
            window.location.href = from.pathname;
        } catch (e) {
            if (e.response) {
                if (e.response.status === utils.types.HttpStatus.NotFound) {
                    console.log(e.response.data.error);
                    alert('아이디 혹은 비밀번호가 틀렸습니다.');
                }
            } else {
                console.log(e);
            }
        }
    };

    return (
        <Body>
            <h1>아주대학교 온라인 투표시스템 로그인</h1>
            <SignInBody>
                <InputWithLabel label="학교 E-mail" name="email" onChange={onEmailHandler} />
                <InputWithLabel2 label="비밀번호" name="password" onChange={onPasswordHandler} onKeyPress={onKeyPress} type="password" />
                <button onClick={onSubmitHandler}>로그인</button>
                <BtnAndBtn />
            </SignInBody>
        </Body>
    );
}

export default SignIn;
