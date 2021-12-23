import React, { Component } from 'react';
import styled from 'styled-components';
import main_background from 'src/img/MainBackground.png';

const StyledBody = styled.div`
    width: 100%;
    min-height: 130vh;
    display: flex;
    outline: none;
    flex-direction: column;
    align-items: flex-end;

    background-image: url(${main_background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;

    h1 {
        margin-top: 14vh;
        margin-right: 10%;
        color: white;
        font-size: 45px;
    }
    h2 {
        margin-right: 10%;
        color: white;
        font-size: 45px;
    }
    h3 {
        margin-top: 2vh;
        margin-right: 10%;
        color: white;
        font-size: 31px;
    }
`;

const LinkBtn = styled.button`
    width: 25vw;
    height: 7vh;
    border: 1px solid white;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    margin-top: 7vh;
    margin-right: 10%;
    font-size: 24px;
    :hover {
        background-color: white;
        color: black;
    }
`;

class MainBody extends Component {
    render() {
        return (
            <StyledBody>
                <h1>Blockchain</h1>
                <h2>Vote</h2>
                <h2>System</h2>
                <h3>보다 투명하게, 보다 공정하게</h3>
                <LinkBtn onClick={() => (window.location.href = '/vote')}>아주대학교 학생회 투표 참여하기</LinkBtn>
            </StyledBody>
        );
    }
}

export default MainBody;
