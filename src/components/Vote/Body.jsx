import React, { Component } from 'react';
import styled from 'styled-components';
import main_background from 'src/img/MainBackground.jpg';

const StyledBody = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    outline: none;
`;

class Body extends Component {
    render() {
        return (
            <StyledBody>
                <h1>this is body components</h1>
            </StyledBody>
        );
    }
}

export default Body;
