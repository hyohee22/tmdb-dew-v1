import React from 'react'

const Login = () => {
  return (
    <div className='login'>
      <div className="login-wrap">
        <div className="login-desc">
          <h2>  Sign in instantly <br />
            Watch endlessly</h2>
          <img src="/image/login01.png" alt="" />
        </div>
        <div className="login-box">
          <input type="text" placeholder='아이디를 입력하세요' /><br />
          <input type="text" placeholder='비밀번호를 입력하세요' />
          <div className="login-ck">
            <div>
              <input type="checkbox" name="remember" />
              Remember Me
            </div>
            <button>Log In</button>
          </div>
          <div className="login-item">
            <div className="naver">
              <div className="icons">
                <strong className='naver-icon'>N</strong>
                <span className='naver-span'>Login with Naver</span>
              </div>
            </div>
          </div>
          <div className="login-item">
            <div className="facebook">
              <div className="icons">
              <i class="bi bi-facebook"></i>
                <span>Login with Facebook</span>
              </div>
            </div>
          </div>
          <div className="login-item">
            <div className="instagram">
              <div className="icons">
              <i class="bi bi-instagram"></i>
                <span>Login with Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-bg">
        306
      </div>
    </div>
  )
}

export default Login