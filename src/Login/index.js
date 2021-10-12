import React, { useState, Commponent } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(Email + Password);
    };

    const login = () => {
        const loginEmail = Email;
        const loginPw = Password;

        const send_param = {
            headers,
            email: Email,
            password: Password,
        };
        console.log('login s1111uc');
        axios
            .post('http://localhost:8080/member/login', send_param)
            .then((res) => {
                console.log('login suc');
                alert(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br />
                <button onClick={login}>Login</button>
            </form>
        </div>
    );
}

export default Login;
