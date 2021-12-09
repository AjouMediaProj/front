import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';

function CodeCheck({ props, location, history }) {
    const [name, setName] = useState();
    //console.log(location);

    useEffect(async () => {
        console.log(sessionStorage.getItem('auth'));
    }, []);

    return <div>asdasd{name}</div>;
}

export default CodeCheck;
