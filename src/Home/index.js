import React, { useState } from 'react';

import { withRouter } from 'react-router-dom';

function Home({ history }) {
    let [voteTitle, voteTitleSetting] = useState(['첫번째', '두번째']);
    let [따봉, 따봉변경] = useState(0);

    return (
        <div>
            <div className="black-nav">
                <div> 투표 사이트</div>
                <button onClick={() => history.push('/login')}> 로그인 </button>
                <button onClick={() => history.push('/register')}> 회원가입 </button>
            </div>
            <div className="list">
                <h3>
                    {' '}
                    {voteTitle[0]}{' '}
                    <span
                        onClick={() => {
                            voteTitleSetting(따봉 + 1);
                        }}>
                        👍
                    </span>{' '}
                    {따봉}{' '}
                </h3>
                <p>2월 17일 투표</p>
                <hr />
            </div>
        </div>
    );
}

export default withRouter(Home);
