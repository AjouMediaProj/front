import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';

const emailPlaceholder = '@ajou.ac.kr';

const SingupBody = styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 1% 80% 1% 0%;
        font-size: 20px;
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

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const [isEmail, setIsEmail] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const [isStudentId, setIsStudentId] = useState(false);

    const [bChecked, setChecked] = useState(false);
    const checkHandler = (e) => {
        setChecked(!bChecked);
        //allCheckedHandler(target.checked);
    };

    const onEmailHandler = (event) => {
        const emailCurrent = event.currentTarget.value;
        setEmail(emailCurrent);

        if (emailCurrent == '') {
            setIsEmail(false);
            setEmailMessage('이메일 형식이 잘못되었습니다.');
        } else {
            setIsEmail(true);
            setEmailMessage('올바른 이메일 형식입니다.');
        }
    };

    const onAuthHandler = (event) => {
        setConfirmAuth(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
        if (event.currentTarget.value.length < 2 || event.currentTarget.value.length > 5) {
            //console.log('이름을 2~4글자 사이로');
            setIsName(false);
        } else {
            //console.log('올바른 형식');
            setIsName(true);
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

    const onStudentIdHandler = (event) => {
        setStudentId(event.currentTarget.value);
        if (event.currentTarget.value.length !== 9) {
            console.log('학번은 9글자로');
            setIsStudentId(false);
        } else {
            console.log('올바른 형식');
            setIsStudentId(true);
        }
    };

    const onMajorHandler = (event) => {
        setMajor(event.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!bChecked) {
            alert('약관에 동의해주세요.');
            return;
        } else if (!isEmail) {
            alert('이메일 주소를 올바른 형식으로 입력해주세요.');
            return;
        } else if (ConfirmAuth === '' || ConfirmAuth === undefined) {
            alert('인증번호를 입력해주세요');
            return;
        } else if (!isPassword) {
            alert('비밀번호를 숫자,영문자,특수문자 조합으로 8자리 이상으로 입력해주세요.');
            return;
        } else if (!isConfirmPassword) {
            alert('비밀번호가 일치하지 않아요. 다시 확인해주세요.');
            return;
        } else if (!isName) {
            alert('이름을 입력해주세요.');
            return;
        } else if (!isStudentId) {
            alert('학번을 올바르게 입력해주세요.');
            return;
        } else if (Major === null) {
            alert('학과를 선택해주세요');
            return;
        }
        // console.log(Email);
        // console.log(typeof ConfirmAuth);
        // console.log(Password);
        // console.log(Name);
        // console.log(ConfirmPassword);
        // console.log(typeof StudentId);
        // console.log(typeof Major);
        sendAccount();
    };

    const sendEmail = async () => {
        try {
            if (isEmail) {
                const res = await api.member.sendEmail(Email + emailPlaceholder);
                console.log(res);
                alert('인증메일이 발송되었습니다. \n이메일을 확인해주세요.');
            } else {
                alert('이메일 주소를 올바른 형식으로 입력해주세요.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sendAccount = async () => {
        try {
            const res = await api.member.sendAccount(Email + emailPlaceholder, Password, ConfirmAuth, Name, StudentId, Major);
            console.log(res);
            //화면넘기기
            window.location.href = '/vote/signin';
        } catch (e) {
            if (e.response) {
                if (e.response.status === 409) {
                    if (e.response.data.error === 'DuplicatedEmail') {
                        alert('이미 가입된 사용자입니다.');
                    } else if (e.response.data.error === 'DuplicatedStudentID') {
                        alert('중복된 학번입니다.');
                    } else {
                        console.log(e.response.error);
                    }
                } else if (e.response.status === 400) {
                    alert('이메일 인증에 실패하였습니다.\n인증번호를 확인하거나 다시 요청해주시기 바랍니다.');
                }
            } else {
                console.log(e);
            }
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
            value: 10101,
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
            <InputWithLabel2 label="학교 E-mail 인증" onClick={sendEmail} name="email" onChange={onEmailHandler} />
            {isEmail ? (
                <Wrapper3 blue="#4f9e4c">
                    <h3>{emailMessage}</h3>
                </Wrapper3>
            ) : (
                <Wrapper3>
                    <h3>{emailMessage}</h3>
                </Wrapper3>
            )}

            <InputWithLabel name="confirmAuth" placeholder="인증번호를 입력해주세요" backColor="#f7f7f7" onChange={onAuthHandler} />
            <InputWithLabel label="비밀번호" name="pw" onChange={onPasswordHandler} type="password" />
            {isPassword ? (
                <Wrapper3 blue="#4f9e4c">
                    <h3>{passwordMessage}</h3>
                </Wrapper3>
            ) : (
                <Wrapper3>
                    <h3>{passwordMessage}</h3>
                </Wrapper3>
            )}
            <InputWithLabel label="비밀번호 확인" name="confirmPw" onChange={onConfirmPasswordHandler} type="password" />
            {isConfirmPassword ? (
                <Wrapper3 blue="#4f9e4c">
                    <h3>{ConfirmPasswordMessage}</h3>
                </Wrapper3>
            ) : (
                <Wrapper3>
                    <h3>{ConfirmPasswordMessage}</h3>
                </Wrapper3>
            )}
            <InputWithLabel label="성명" name="name" onChange={onNameHandler} />
            <InputWithLabel label="학번" name="studentId" onChange={onStudentIdHandler} />
            <SelectWithLabel label="학과" options={options} placeholder="학과선택" styles={customStyles} onChange={onMajorHandler} />
            <button onClick={onSubmitHandler}> 확인</button>
        </SingupBody>
    );
}

export default SignUp;
