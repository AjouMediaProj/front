import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from 'src/api';
import Select from 'react-select';
import utils from 'src/utils';

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
    padding: 1% 2% 1% 2%;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
    white-space: pre-line;
    h1 {
        margin: 0% 0% 0% 0%;
        //text-align: center;
        font-size: 15px;
        color: #000000;
    }
    overflow: scroll;
    &::-webkit-scrollbar {
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
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
        <button onClick={onClick}>인증번호 발송</button>
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

    useEffect(() => {
        setMajorData();
    }, [Email, Major, ConfirmAuth, Name, Password, ConfirmPassword, StudentId, bChecked]);

    let options = [];
    const setMajorData = () => {
        for (let key in utils.types.Category) {
            if (key.length === 5) {
                options.push({ value: Number(key), label: utils.types.Category[key] });
            }
        }
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
            alert('회원가입에 성공했습니다.');
        } catch (e) {
            if (e.response) {
                if (e.response.status === utils.types.HttpStatus.Conflict) {
                    if (e.response.data.error === 'DuplicatedEmail') {
                        alert('이미 가입된 사용자입니다.');
                    } else if (e.response.data.error === 'DuplicatedStudentID') {
                        alert('중복된 학번입니다.');
                    } else {
                        console.log(e.response.error);
                    }
                } else if (e.response.status === utils.types.HttpStatus.BadRequest) {
                    alert('이메일 인증에 실패하였습니다.\n인증번호를 확인하거나 다시 요청해주시기 바랍니다.');
                }
            } else {
                alert(e);
            }
        }
    };

    return (
        <SingupBody>
            <h1>개인정보보호정책</h1>
            <SignatureBody>
                <h1>
                    가. 개인정보의 수집 및 이용 목적
                    <br />
                    ① BLOTE은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에
                    따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    <br />
                    1. BLOTE 서비스 제공을 위한 회원관리
                    <br />
                    1) 공간정보 다운로드, 오픈API 신청 및 활용 등 포털 서비스 제공과 서비스 부정이용 방지를 목적으로 개인정보를 처리합니다.
                    <br />
                    나. 수집하는 개인정보의 항목
                    <br />
                    ① BLOTE 회원정보(필수): 이름, 이메일(아이디), 비밀번호
                    <br />
                    다. 개인정보의 보유 및 이용기간
                    <br />
                    ① BLOTE은 법령에 따른 개인정보 보유ㆍ이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유ㆍ이용기간 내에서 개인정보를 처리ㆍ보유합니다.
                    <br />
                    1. BLOTE 회원정보
                    <br />
                    - 수집근거: 정보주체의 동의
                    <br />
                    - 보존기간: 회원 탈퇴 요청 전까지(1년 경과 시 재동의)
                    <br />
                    - 보존근거: 정보주체의 동의
                    <br />
                    라. 동의 거부 권리 및 동의 거부에 따른 불이익
                    <br />
                    위 개인정보의 수집 및 이용에 대한 동의를 거부할 수 있으나, 동의를 거부할 경우 회원 가입이 제한됩니다.
                    <br />
                </h1>
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
