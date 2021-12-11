import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import VoteList from 'src/components/Vote/VoteList';
import VotingStatus from 'src/components/Vote/VotingStatus';
import SignUp from 'src/components/Vote/SignUp';
import SignIn from 'src/components/Vote/SignIn';
import Voting from 'src/components/Vote/Voting';
import Signature from 'src/components/Vote/Signature';
import Agreement from 'src/components/Vote/Agreement';
import CodeCheck from 'src/components/Vote/CodeCheck';
import AuthRoute from 'src/components/AuthRoute';

const StyledBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
`;

class Body extends Component {
    render() {
        return (
            <StyledBody>
                <Switch>
                    <Route exact path="/vote" component={VoteList} />
                    {/* <AuthRoute restricted={false} authenticated={sessionStorage.getItem('auth')} path="/vote/votingstatus" render={(props) => <VotingStatus {...props} />} /> */}
                    <Route path="/vote/votingstatus" component={VotingStatus} />
                    <Route path="/vote/signup" component={SignUp} />
                    <Route path="/vote/signin" render={(props) => <SignIn {...props} />} />
                    <Route path="/vote/voting" component={Voting} />
                    <Route path="/vote/signature" component={Signature} />
                    <AuthRoute restricted={false} authenticated={sessionStorage.getItem('auth')} path="/vote/agreement" render={(props) => <Agreement {...props} />} />
                    <Route path="/vote/codecheck" render={(props) => <CodeCheck {...props} />} />
                </Switch>
            </StyledBody>
        );
    }
}

export default Body;

//auth / restricted : false (메인 ) restricted : true (로그인같은 로그인후 접근 불가능)
