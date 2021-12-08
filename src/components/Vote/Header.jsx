import React, { Component } from 'react';
import styled from 'styled-components';
import ajou_logo from 'src/img/AjouLogo.png'; //로고체인지

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <LogoButton onClick={() => (window.location.href = '/vote')}></LogoButton>
                <Button onClick={() => (window.location.href = '/vote')}> 투표목록</Button>
                <Button onClick={() => (window.location.href = '/vote/votingstatus')}> 투표현황/결과</Button>
                <Button> 투표코드확인</Button>
                <Button onClick={() => (window.location.href = '/vote/signup')}> 회원가입</Button>
                <Button onClick={() => (window.location.href = '/vote/signin')}> 로그인</Button>
            </StyledHeader>
        );
    }
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
`;

const LogoButton = styled.button`
    width: 11vw;
    height: 65%;
    margin-left: 3vw;
    margin-bottom: 2vh;
    border: 0;
    outline: 0;
    background-color: #3c3c3c;
    background-image: url(${ajou_logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const Button = styled.button`
    color: white;
    min-width: 7vw;
    background-color: #3c3c3c;
    margin-left: 3vw;
    margin-bottom: 2vh;
    font-size: 23px;

    border: 0;
    outline: 0;
    & + button {
        margin-left: 3%;
    }
`;
