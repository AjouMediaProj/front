import React, { Component } from 'react';
import Header from 'src/components/Vote/Header';
import Body from 'src/components/Vote/Body';
import Footer from 'src/components/Vote/Footer';

class Vote extends Component {
    render() {
        return (
            <div className="Vote">
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}

export default Vote;
