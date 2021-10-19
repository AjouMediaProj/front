import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import VoteList from 'src/components/Vote/VoteList';
import VoteStatus from 'src/components/Vote/VoteStatus';
import main_background from 'src/img/MainBackground.jpg';

const StyledBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
`;

class Body extends Component {
    render() {
        return (
            <StyledBody>
                <BrowserRouter>
                    <Route exact path="/vote" component={VoteList} />
                    <Route exact path="/vote/status" component={VoteStatus} />
                </BrowserRouter>
            </StyledBody>
        );
    }
}

export default Body;
