import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';

const SingupBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 1% 85% 2% 0%;
        font-size: 20px;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 7vw;
        height: 5vh;
        border-radius: 30px;
        background-color: #102f57;
        color: white;
    }

    h2 {
        margin: 1% 0% 2% 0%;
        text-align: center;
        font-size: 20px;
        color: #000000;
    }

    h3 {
        margin: 0% 0% 2% 0%;
        text-align: center;
        font-size: 20px;
    }
`;

const SignatureBody = styled.div`
    width: 90vw;
    height: 20vh;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;

    h1 {
        margin: 4% 0% 2% 0%;
        text-align: center;
        font-size: 25px;

        color: #000000;
    }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    width: 2vw;
    height: 2vh;
`;

//input을 감싸주는 껍데기
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    outline: none;
    align-items: center;
    transform: translate(-50%, 0%);
    margin-left: 15vw;
    /* outline-style: solid;
    outline-color: red;
    outline-width: 1px; */

    & + & {
        margin-top: 3vh;
    }
    /* button {
        margin: 0% 0% 0% 0%;
        width: 7vw;
        height: 4vh;
        border-radius: 30px;
        background-color: #102f57;

        color: white;
    } */
`;

const Label = styled.div`
    font-size: 17px;
    color: #000000;
    margin-right: 2vw;
    font-weight: bold;
    /* outline-style: solid;
    outline-color: green;
    outline-width: 1px; */
    /* & + input {
        margin-left: 3vw;
    } */
`;

const Input = styled.input`
    width: 17vw;
    height: 4vh;
    border: 1px solid #707070;
    /* outline-style: solid;
    outline-color: blue;
    outline-width: 1px; */
    font-size: 17px;
    padding: 0% 5% 0% 5%;
    background-color: ${(props) => props.backColor || 'white'};
    ::placeholder {
        color: #707070;
        //padding: 0% 0% 0% 0%;
    }
`;

const Wrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    width: 60vw;
    outline-style: solid;
    outline-color: blcak;
    outline-width: 1px;

    button {
        margin: 0% 0% 0% 0%;
        width: 7vw;
        height: 4vh;
        border-radius: 30px;
        background-color: #102f57;
        color: white;
    }
`;

//input with label
const InputWithLabel = ({ label, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);

//select with label
const SelectWithLabel = ({ label, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <Select {...rest} />
    </Wrapper>
);

//styles of select
const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '17vw',
    }),
};

function SignUp() {
    const [Email, setEmail] = useState('');
    const [ConfirmAuth, setConfirmAuth] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [Major, setMajor] = useState(null);

    const [isEmail, setIsEmail] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const onEmailHandler = (event) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const emailCurrent = event.currentTarget.value;
        setEmail(emailCurrent);
        if (!emailRegex.test(emailCurrent)) {
            console.log('이메일 형식이 틀림');
            setIsEmail(false);
        } else {
            console.log('올바른 이메일 형식');
            setIsEmail(true);
        }
    };

    const onAuthHandler = (event) => {
        setConfirmAuth(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
        if (event.currentTarget.value.length < 2 || event.currentTarget.value.length > 5) {
            console.log('이름을 2~4글자 사이로');
            setIsName(false);
        } else {
            console.log('올바른 형식');
            setIsName(true);
        }
    };

    const onPasswordHandler = (event) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,24}$/;
        const passwordCurrent = event.currentTarget.value;
        setPassword(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            console.log('숫자+영문자+특수문자 조합으로 8자리 이상으로 입력');
            setIsPassword(false);
        } else {
            console.log('올바른 비번형식');
            setIsPassword(true);
        }
    };

    const onConfirmPasswordHandler = (event) => {
        const passwordConfirmCurrent = event.currentTarget.value;
        setConfirmPassword(passwordConfirmCurrent);

        if (Password === passwordConfirmCurrent) {
            console.log('비밀번호가 똑같아요');
            setIsConfirmPassword(true);
        } else {
            console.log('비밀번호가 틀려요');
            setIsConfirmPassword(false);
        }
    };

    const onStudentIdHandler = (event) => {
        setStudentId(event.currentTarget.value);
    };

    const onMajorHandler = (event) => {
        setMajor(event.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(Email);
        console.log(Password);
        console.log(ConfirmAuth);
        console.log(Name);
        console.log(ConfirmPassword);
        console.log(Major);
    };

    const [bChecked, setChecked] = useState(false);
    const checkHandler = (e) => {
        setChecked(!bChecked);

        //allCheckedHandler(target.checked);
    };

    const sendEmail = async () => {
        try {
            //if(Email)
            const res = await api.member.sendEmail(Email);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const options = [
        {
            value: 'media',
            label: '미디어학과',
        },
        {
            value: 'media1',
            label: '미디어학과1',
        },
        {
            value: 'media2',
            label: '미디어학과2',
        },
        {
            value: 'media3',
            label: '미디어학과',
        },
        {
            value: 'media4',
            label: '미디어학과1',
        },
        {
            value: 'media5',
            label: '미디어학과2',
        },
        {
            value: 'media6',
            label: '미디어학과',
        },
        {
            value: 'media7',
            label: '미디어학과1',
        },
        {
            value: 'media8',
            label: '미디어학과2',
        },
    ];

    return (
        <SingupBody>
            <h1>개인정보보호정책</h1>
            <SignatureBody>
                <h1>동의합니다</h1>
            </SignatureBody>
            <h2>
                <Checkbox checked={bChecked} onChange={(e) => checkHandler(e)} /> 동의합니다.
            </h2>

            <InputWithLabel label="학교 E-mail 인증" name="email" placeholder="@ajou.ac.kr" onChange={onEmailHandler} type="email" />
            <button onClick={sendEmail}>인증번호 확인</button>

            <InputWithLabel name="confirmAuth" placeholder="인증번호를 입력해주세요" backColor="#f7f7f7" onChange={onAuthHandler} />
            <InputWithLabel label="비밀번호" name="pw" onChange={onPasswordHandler} />
            {/* <h3>올바른 비밀번호 형식이에요</h3> */}
            <InputWithLabel label="비밀번호 확인" name="confirmPw" onChange={onConfirmPasswordHandler} />
            <InputWithLabel label="성명" name="name" onChange={onNameHandler} />
            <InputWithLabel label="학번" name="studentId" onChange={onStudentIdHandler} />
            <SelectWithLabel label="학과" options={options} placeholder="학과선택" styles={customStyles} onChange={onMajorHandler} />

            <button onClick={onSubmitHandler}> 확인</button>

            {/* {bChecked ? <h2>yes</h2> : <h2>no</h2>} */}
        </SingupBody>
    );
}

export default SignUp;
