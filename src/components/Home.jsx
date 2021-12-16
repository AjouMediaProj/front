import React, { Component } from 'react';
import Header from 'src/components/Home/Header';
import MainBody from 'src/components/Home/MainBody';
import Footer from 'src/components/Home/Footer';

//1:8:1 비율로 구성 10이 넘어가면 스크롤이 생김..

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header />
                <MainBody />
            </div>
        );
    }
}

export default Home;
