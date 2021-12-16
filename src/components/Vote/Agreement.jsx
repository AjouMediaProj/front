import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SignaturePad from 'signature_pad';
import main_background from 'src/img/MainBackground.png';
import * as api from 'src/api';

const VotingBody = styled.div`
    width: 100%;
    max-height: 80vh;
    display: flex;
    align-items: center;
    outline: none;
    flex-direction: column;
    background-color: #fbfbfb;

    h1 {
        margin: 5% 0% 2% 0%;
        text-align: center;
        font-size: 25px;
        color: #000000;
    }

    button {
        margin: 3% 0% 0% 0%;
        width: 20vw;
        height: 5vh;
        background-color: #102f57;
        color: white;
    }

    h2 {
        margin: 2% 0% 0% 0%;
        text-align: center;
        font-size: 20px;
        color: #6f6f6f;
    }
`;

const SignatureBody = styled.div`
    width: 60vw;
    height: 30vh;
    background-color: #ffffff;
    outline-style: solid;
    outline-color: black;
    outline-width: 1px;
    padding: 1% 2% 1% 2%;
    white-space: pre-line;
    h1 {
        margin: 0% 0% 0% 0%;
        text-align: start;
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

function Agreement({ history }) {
    const location = useLocation();
    const voteName = location.state.voteName;

    return (
        <VotingBody>
            <h1>{voteName}</h1>
            <SignatureBody>
                <h1>
                    온라인투표서비스를 이용하는데 필요한 기본적인 확인 사항을 안내하는 것이며 서비스 이용에 필요한 구체적 사항은 선거관리위원회와 이용기관간 체결하는 이용협약서에 명시하여야 합니다.
                    <br />
                    <br />
                    1. 온라인투표서비스는 이용기관의 신청에 따라 선거관리위원회가 제공하는 서비스로 해당 선거의 관리는 이용기관의 책임 하에 이루어집니다.
                    <br />
                    <br />
                    2. 온라인투표서비스는 이용신청 후 이용협약 체결 및 이용승인의 절차를 마치고 이용할 수 있습니다.
                    <br />
                    <br />
                    3. 다음의 각 호에 해당하는 경우 중앙선거관리위원회(관할선거관리위원회 포함)는 사용승인을 거절할 수 있습니다.
                    <br />
                    &nbsp; 가. 기술상 서비스 제공이 불가능한 경우
                    <br />
                    &nbsp; 나. 실명이 아니거나, 타인의 명의를 도용하여 허위로 신청하는 경우
                    <br />
                    &nbsp; 다. 등록사항을 누락하거나 오기하여 신청하는 경우
                    <br />
                    &nbsp; 라. 악성 프로그램 및 버그를 이용하거나 시스템 취약점을 악용하는 등 부정한 방법을 서비스에 사용한 경우
                    <br />
                    &nbsp; 마. 서비스를 지원하는 대상에 해당하지 않는 경우
                    <br />
                    &nbsp; 바. 기타 서비스 제공이 불가능하거나 사회적 민감성, 업무상황 등을 고려하여 부적절하다고 판단한 경우
                    <br />
                    4. 이용기관은 선거 실시전 선거인명부를 작성하여야 하고, 선거인명부 작성에 필요한 개인정보(생년월일, 휴대폰번호, 이메일 등) 수집이나 잘못된 선거인 정보 등으로 인한 책임은 이용기관에
                    있습니다. *선거인 개인정보 활용동의는 이용기관에서 별도 확인
                    <br />
                    <br />
                    5. 이용기관은 투표절차 및 그 결과의 정당한 효력 발생을 위해 온라인투표서비스를 활용하는 것이 내부규정 등에 부합하는지 여부를 직접 확인하여야 하고, 그 위반으로 인하여 발생하는
                    문제에 대해서는 ‘중앙선거관리위원회’가 책임지지 않습니다.
                    <br />
                    <br />
                    6. 이용기관 관리자의 로그기록은 서버에 저장되며, 이용기관 관리자는 언제든지 그 내용을 확인할 수 있습니다.
                    <br />
                    <br />
                    7. 투표중 선거인명부 수정기능, 미투표자대상 메시지 발송내역 조회기능, 키분할 기능 등은 사용여부를 사전에 명확히 결정하여 선거개설시 반영 하여야 하며, 이들 기능의 설정 잘못으로
                    발생하는 문제에 대해서는 중앙선거관리위원회가 책임지지 않습니다.
                    <br />
                    <br />
                    8. 시스템을 통해 선거인에게 발송하는 문자메시지는 통신사의 사정, 기기의 종류 또는 설정(스팸처리) 등의 이유로 인해 전송이 지연되거나 실패할 수 있습니다.
                    <br />
                    <br />
                    9. 투표개시 전 선거인에게 안내 메시지를 발송하였거나 투표를 개시한 후에는 선거 세부정보 변경이 불가합니다.
                    <br />
                    <br />
                    10. 2건 이상의 선거를 동시에 진행하는 경우 ‘휴대폰(문자)’ 방식의 투표방법은 제공되지 않습니다.
                    <br />
                    <br />
                    11. 선거인의 투표참여 여부가 표시된 선거인명부는 투표종료 후에 다운로드 받을 수 있습니다.
                    <br />
                    <br />
                    12. 선거인명부('투표참여 여부가 표시된 선거인명부' 포함) 관련된 논쟁으로 인한 책임은 이용기관에 있습니다.
                </h1>
            </SignatureBody>
            <button
                onClick={() => {
                    history.push({
                        pathname: '/vote/signature',
                        state: { voteIdx: location.state.voteIdx, voteName: voteName },
                    });
                }}>
                위의 상황에 대해 동의합니다.
            </button>
            <h2>아주대학교 총학생회 선거관리위원회</h2>
        </VotingBody>
    );
}

export default Agreement;
