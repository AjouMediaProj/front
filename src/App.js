import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Home from 'src/components/Home';
import Vote from 'src/components/Vote';
import Contact from 'src/components/Contact';
import Login from 'src/Login';
import Register from 'src/Register';

function App() {
    /*
    const callApi = async () => {
        try {
            const res = await axios.get('http://59.12.7.180/api');
            console.log(res.data.greeting);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        callApi();
    }, []);
    */

    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact" component={Contact} />
        </BrowserRouter>
    );
}

export default App;
