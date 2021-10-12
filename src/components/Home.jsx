import React, { Component } from 'react';
import Header from './Home/Header';
import MainBody from './Home/MainBody';
import Footer from './Home/Footer';

//1:8:1 비율로 구성 10이 넘어가면 스크롤이 생김..

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <MainBody />
                <Footer />
            </div>
        );
    }
}

export default Home;
