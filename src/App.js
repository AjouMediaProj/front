import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </BrowserRouter>
    );
}

export default App;
