import React, { Component } from 'react';
//import '../../styles/Header.less';

import styled from 'styled-components';
import blote_logo from '../../img/logo.PNG';

//vh는 높이의 퍼센트느낌
//
const StyledHeader = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: flex-end;
    background-color: white;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
`;

const LogoButton = styled.button`
    width: 180px;
    height: 60%;
    margin-left: 3%;
    bottom: 1;
    border: 0;
    outline: 0;
    background-image: url(${blote_logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const Button = styled.button`
    color: gray;
    min-width: 100px;
    background-color: white;
    margin-left: 5%;
    font-size: 20px;
    font-weight: bold;
    border: 0;
    outline: 0;
    & + button {
        margin-left: 5%;
    }
`;

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <LogoButton></LogoButton>
                <Button onClick={() => (window.location.href = '/login')}> VOTE</Button>
                <Button> MY PAGE</Button>
                <Button onClick={() => (window.location.href = '/contact')}> CONTACT US</Button>
            </StyledHeader>
        );
    }
}

export default Header;
