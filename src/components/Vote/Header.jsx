import React, { Component } from 'react';
import styled from 'styled-components';
import ajou_logo from 'src/img/logo.PNG'; //로고체인지

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <LogoButton></LogoButton>
                <Button> 투표목록</Button>
                <Button> 투표현황/결과</Button>
                <Button> 투표코드확인</Button>
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
    width: 180px;
    height: 60%;
    margin-left: 3%;
    margin-bottom: 2vh;
    border: 0;
    outline: 0;
    background-image: url(${ajou_logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const Button = styled.button`
    color: white;
    min-width: 100px;
    background-color: #3c3c3c;
    margin-left: 5%;
    margin-bottom: 2vh;
    font-size: 23px;
    font-weight: bold;
    border: 0;
    outline: 0;
    & + button {
        margin-left: 5%;
    }
`;
