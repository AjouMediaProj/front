import React, { Component } from 'react';
import styled from 'styled-components';
import ajou_logo from 'src/img/logo.PNG'; //로고 체인지

const StyledFooter = styled.div`
    height: 10vh;
    background-color: white;
    display: flex;
    align-items: center;
    outline: none;
    img {
        width: auto;
        height: auto;
        max-width: 200px;
        max-height: 5vh;
        margin-left: 85%;
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
