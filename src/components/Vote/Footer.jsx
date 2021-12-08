import React, { Component } from 'react';
import styled from 'styled-components';
import ajou_logo from 'src/img/Logo2.png'; //로고 체인지

const StyledFooter = styled.div`
    height: 10vh;
    background-color: #fbfbfb;
    display: flex;
    align-items: center;
    outline: none;
    img {
        width: auto;
        height: auto;
        background-size: contain;
        max-height: 8vh;
        margin-left: 90%;
        margin-bottom: 1.5%;
    }
`;

class Footer extends Component {
    render() {
        return (
            <StyledFooter>
                <img src={ajou_logo} alt="bottom_logo"></img>
            </StyledFooter>
        );
    }
}

export default Footer;
