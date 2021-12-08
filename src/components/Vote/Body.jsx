import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import VoteList from 'src/components/Vote/VoteList';
import VotingStatus from 'src/components/Vote/VotingStatus';
import SignUp from 'src/components/Vote/SignUp';
import SignIn from 'src/components/Vote/SignIn';
import Voting from 'src/components/Vote/Voting';
import Signature from 'src/components/Vote/Signature';
import Agreement from 'src/components/Vote/Agreement';

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
                    <Route exact path="/vote/votingstatus" component={VotingStatus} />
                    <Route exact path="/vote/signup" component={SignUp} />
                    <Route exact path="/vote/signin" component={SignIn} />
                    <Route exact path="/vote/voting" component={Voting} />
                    <Route exact path="/vote/signature" component={Signature} />
                    <Route exact path="/vote/agreement" component={Agreement} />
                </BrowserRouter>
            </StyledBody>
        );
    }
}

export default Body;
