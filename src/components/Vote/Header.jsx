import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import ajou_logo from 'src/img/AjouLogo.png';
import utils from 'src/utils';
import * as api from 'src/api';

function Header() {
    const [name, setName] = useState();
    useEffect(() => {
        if (sessionStorage.getItem('auth')) setName(utils.storageManager.userInfo.name);
    });

    const removeData = async () => {
        try {
            const res = await api.member.sendSignOut();
            sessionStorage.clear();
            window.location.href = '/vote';
        } catch (err) {
            //팝업
            alert(err);
            console.log(err);
        }
    };

    return (
        <StyledHeader>
            <LogoButton onClick={() => (window.location.href = '/vote')}></LogoButton>
            <Button onClick={() => (window.location.href = '/vote')}>투표목록</Button>
            <Button onClick={() => (window.location.href = '/vote/votingstatus')}>투표현황/결과</Button>
            <Button onClick={() => (window.location.href = '/vote/codecheck')}>투표코드확인</Button>
            <h1></h1>
            {name ? (
                <>
                    <LoginButton onClick={() => (window.location.href = '/vote/mypage')}>{name}님</LoginButton>
                    <LoginButton onClick={removeData}>LOGOUT</LoginButton>
                </>
            ) : (
                <LoginButton onClick={() => (window.location.href = '/vote/signin')}>LOGIN</LoginButton>
            )}
        </StyledHeader>
    );
}

export default Header;

//vh는 높이의 퍼센트느낌
//
const StyledHeader = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: flex-end;
    background-color: #3c3c3c;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    h1 {
        flex-grow: 1;
    }
`;

const LogoButton = styled.button`
    width: 11vw;
    height: 65%;
    margin-left: 3vw;
    margin-bottom: 2vh;
    border: 0;
    outline: 0;
    background: url(${ajou_logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const Button = styled.button`
    color: white;
    background-color: #3c3c3c;
    margin-left: 2vw;
    margin-bottom: 2vh;
    font-size: 18px;
    border: 0;
    outline: 0;
    & + button {
        margin-left: 2%;
    }
`;

const LoginButton = styled.button`
    //flex-grow: 1;
    text-align: right;
    margin-right: 3vw;
    margin-bottom: 3.5vh;
    border: 0;
    outline: 0;
    color: white;
    background-color: #3c3c3c;
    font-size: 17px;
`;
