import React, { Component } from 'react';
import styled from 'styled-components';
import main_background from 'src/img/MainBackground.jpg';

const StyledBody = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    outline: none;
    flex-direction: column;
    align-items: flex-end;

    background-image: url(${main_background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    h1 {
        margin-top: 10vh;
        margin-right: 10%;
        color: white;
        font-size: 40px;
    }
    h2 {
        margin-top: 1vh;
        margin-right: 10%;
        color: white;
        font-size: 40px;
    }
    h3 {
        margin-top: 3vh;
        margin-right: 10%;
        color: white;
        font-size: 30px;
    }
`;

const LinkBtn = styled.button`
    width: 25vw;
    height: 5vh;
    border: 1px solid white;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    font-size: 20px;
    :hover {
        background-color: white;
        color: black;
    }
`;


class MainBody extends Component {
    render() {
        return (
            <StyledBody>
                <h1>BlockChain</h1>
                <h2>Vote</h2>
                <h2>System</h2>
                <h3>보다 투명하게, 보다 공정하게</h3>
                <h3>
                    <LinkBtn onClick={() => (window.location.href = '/vote')}>아주대학교 학생회 투표 참여하기</LinkBtn>
                </h3>
            </StyledBody>
        );
    }
}

export default MainBody;
