import React, { Component } from 'react';
import styled from 'styled-components';
import blote_logo from 'src/img/Logo2.png';

class Header extends Component {
    render() {
        return (
            <StyledHeader>
                <LogoButton></LogoButton>
                <Button onClick={() => (window.location.href = '/vote')}> VOTE</Button>
                <Button> SERVICE</Button>
                <Button> CONTACT</Button>
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
    background-color: white;
`;

const LogoButton = styled.button`
    width: 8vw;
    height: 60%;
    margin-left: 3%;
    bottom: 1;
    border: 0;
    outline: 0;
    background-image: url(${blote_logo});
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; //vs contain
`;

const Button = styled.button`
    color: gray;
    min-width: 7vw;
    background-color: white;
    margin-left: 2.5%;
    font-size: 20px;
    font-weight: bold;
    border: 0;
    outline: 0;
    & + button {
        margin-left: 2.5%;
    }
`;
