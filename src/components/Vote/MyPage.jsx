import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';
import utils from 'src/utils';

const emailPlaceholder = '@ajou.ac.kr';

const MyPageBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 3% 80% 2% 0%;
        font-size: 25px;
        font-weight: bold;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 8vw;
        height: 4vh;
        font-size: 15px;
        background-color: #102f57;
        color: white;
    }

    h2 {
        display: flex;
        margin: 1% 0% 2% 0%;
        text-align: center;
        font-size: 20px;
        color: #000000;
        align-items: end;
    }

    h3 {
        transform: translate(50%, 0%);
        //margin-left: 50vw;
        margin: 0.3% 17% 0.3% 0%;
        text-align: center;
        font-size: 17px;
        color: ${(props) => props.blue || 'red'};
    }
    h6 {
        flex-grow: 1;
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
    & + & {
        margin-top: 3vh;
    }
`;

const Label = styled.div`
    font-size: 17px;
    color: #000000;
    margin-right: 2vw;
    font-weight: bold;
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
    &:focus {
        outline: none;
    }
`;

const Wrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: 50vw;
    //margin-bottom: 3vh;
    position: relative;
    button {
        margin: 0% 0% 0% 0%;
        position: absolute;
        right: 7vw;
        width: 8vw;
        height: 4vh;
        font-size: 15px;
        background-color: #102f57;
        color: white;
    }
`;

const Wrapper3 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    h3 {
        transform: translate(50%, 0%);
        //margin-left: 50vw;
        margin: 0.5% 19% 0.5% 0%;
        text-align: center;
        font-size: 14px;
        color: ${(props) => props.blue || 'red'};
    }
`;

const Wrapper4 = styled.div`
    width: 17vw;
    display: flex;
    align-items: center;
    border: 1px solid #707070;
    background-color: ${(props) => props.backColor || 'white'};
`;

const Input2 = styled.input`
    width: 8vw;
    height: 4vh;
    font-size: 17px;
    border: none;
    padding: 0% 5% 0% 5%;
    flex-grow: 1;

    &:focus {
        outline: none;
    }
`;

const Label2 = styled.div`
    font-size: 17px;
    color: #000000;
    margin-right: 2vw;
`;

//input with label
const InputWithLabel = ({ label, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);

const InputWithLabel2 = ({ label, onClick, ...rest }) => (
    <Wrapper2>
        <Wrapper>
            <Label>{label}</Label>
            <Wrapper4>
                <Input2 {...rest} />
                <Label2>{emailPlaceholder}</Label2>
            </Wrapper4>
        </Wrapper>
        <button onClick={onClick}>인증번호 확인</button>
    </Wrapper2>
);

//styles of select
const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '17vw',
    }),
};

function MyPage() {
    const [PastPassword, setPastPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    //오류메시지 상태저장
    const [passwordMessage, setPasswordMessage] = useState('');
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const [isPastPassword, setIsPastPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const onPastPasswordHandler = (event) => {
        const passwordCurrent = event.currentTarget.value;
        if (passwordCurrent.length > 0) {
            setPastPassword(passwordCurrent);
            setIsPastPassword(true);
        } else {
            setIsPastPassword(false);
        }
    };

    const onPasswordHandler = (event) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&^])[A-Za-z\d$@$!%*#?&^]{8,24}$/;
        const passwordCurrent = event.currentTarget.value;
        setPassword(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            //console.log('숫자+영문자+특수문자 조합으로 8자리 이상으로 입력');
            setIsPassword(false);
            setPasswordMessage('8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.');
        } else {
            //console.log('올바른 비번형식');
            setIsPassword(true);
            setPasswordMessage('올바른 비밀번호 형식입니다.');
        }
    };

    const onConfirmPasswordHandler = (event) => {
        const passwordConfirmCurrent = event.currentTarget.value;
        setConfirmPassword(passwordConfirmCurrent);

        if (Password === passwordConfirmCurrent) {
            //console.log('비밀번호가 똑같아요');
            setIsConfirmPassword(true);
            setConfirmPasswordMessage('비밀번호가 일치합니다.');
        } else {
            //console.log('비밀번호가 틀려요');
            setIsConfirmPassword(false);
            setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (isConfirmPassword) {
            sendChangePassword();
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }

        // console.log(Email);
        // console.log(typeof ConfirmAuth);
        // console.log(Password);
        // console.log(Name);
        // console.log(ConfirmPassword);
        // console.log(typeof StudentId);
        // console.log(typeof Major);
    };

    const sendChangePassword = async () => {
        try {
            const res = await api.member.sendPassword(Password);
            console.log(res);
            //화면넘기기
            alert('비밀번호가 정상적으로 변경되었습니다.');
            window.location.href = '/vote';
        } catch (e) {
            if (e.response) {
                if (e.response.status === utils.types.HttpStatus.Conflict) {
                    //     if (e.response.data.error === 'DuplicatedEmail') {
                    //         alert('이미 가입된 사용자입니다.');
                    //     } else if (e.response.data.error === 'DuplicatedStudentID') {
                    //         alert('중복된 학번입니다.');
                    //     } else {
                    //         console.log(e.response.error);
                    //     }
                    // } else if (e.response.status === utils.types.HttpStatus.BadRequest) {
                    //     alert('이메일 인증에 실패하였습니다.\n인증번호를 확인하거나 다시 요청해주시기 바랍니다.');
                }
            } else {
                alert(e);
            }
        }
    };

    return (
        <MyPageBody>
            <h1>마이페이지</h1>
            <InputWithLabel label="등급" name="accessLevel" backColor="#fbfbfb" placeholder={accessLevel[utils.storageManager.userInfo.accessLevel]} disabled={true} />
            <InputWithLabel label="학교 E-mail" name="email" backColor="#fbfbfb" placeholder={utils.storageManager.userInfo.email} disabled={true} />
            <InputWithLabel label="기존 비밀번호 확인" name="pastPW" onChange={onPastPasswordHandler} type="password" />
            <InputWithLabel label="새 비밀번호 입력" name="pw" onChange={onPasswordHandler} type="password" />
            {isPassword ? (
                <Wrapper3 blue="#4f9e4c">
                    <h3>{passwordMessage}</h3>
                </Wrapper3>
            ) : (
                <Wrapper3>
                    <h3>{passwordMessage}</h3>
                </Wrapper3>
            )}
            <InputWithLabel label="새 비밀번호 재확인" name="confirmPw" onChange={onConfirmPasswordHandler} type="password" />
            {isConfirmPassword ? (
                <Wrapper3 blue="#4f9e4c">
                    <h3>{ConfirmPasswordMessage}</h3>
                </Wrapper3>
            ) : (
                <Wrapper3>
                    <h3>{ConfirmPasswordMessage}</h3>
                </Wrapper3>
            )}
            <InputWithLabel label="성명" name="name" backColor="#fbfbfb" placeholder={utils.storageManager.userInfo.name} disabled={true} />
            <InputWithLabel label="학번" name="studentID" backColor="#fbfbfb" placeholder={utils.storageManager.userInfo.studentID} disabled={true} />
            <InputWithLabel label="학과" name="major" backColor="#fbfbfb" placeholder={utils.types.Category[utils.storageManager.userInfo.major]} disabled={true} />
            <h6></h6>
            <button onClick={onSubmitHandler}> 저장</button>
        </MyPageBody>
    );
}

export default MyPage;

let accessLevel = {
    0: '관리자',
    1: '일반',
};
