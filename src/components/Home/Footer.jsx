import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
    height: 8vh;
    background-color: white;
`;

class Footer extends Component {
    render() {
        return <StyledFooter>Footer Part</StyledFooter>;
    }
}

export default Footer;
