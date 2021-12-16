import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Home from 'src/components/Home';
import Vote from 'src/components/Vote';
import Contact from 'src/components/Contact';

import GlobalFonts from 'src/fonts/GlobalFonts';

function App() {
    return (
        <BrowserRouter>
            <GlobalFonts />
            <Route exact path="/" component={Home} />
            <Route path="/vote" component={Vote} />
            <Route exact path="/contact" component={Contact} />
        </BrowserRouter>
    );
}

export default App;
