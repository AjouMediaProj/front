import React, { Component, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ restricted, authenticated, component: Component, render, ...rest }) {
    // useEffect(() => {
    //     console.log(authenticated);
    //     if (restricted && authenticated == null) alert('로그인후 이용해주세요');
    // }, []);
    return (
        <Route {...rest} render={(props) => (authenticated ? render ? render(props) : <Component {...props} /> : <Redirect to={{ pathname: '/vote/signin', state: { from: props.location } }} />)} />
    );
}

export default AuthRoute;
