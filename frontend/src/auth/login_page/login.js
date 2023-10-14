import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import styles from './login.module.css';
import useAuthStore from '../../authStore';
import GoogleLoginButton from './googlelogin';

function LoginPage() {
  const navigate = useNavigate();
  const [useremail, setuseremail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn} = useAuthStore();

  const GoRegister = () => {
    navigate('/register');
  };

  const GoHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    if (!useremail || !password) {
      alert('이메일 주소와 비밀번호를 입력해주세요.');
      return;
    }

    axios
      .post('/user/login', { useremail, password }, { withCredentials: true })
      .then(response => {
        var data = response.data
        logIn(data.role,data.username)
        navigate('/')
      })
      .catch(error => {
        alert(error.response.data.message)
      });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo} onClick={GoHome}>
            Colearn
          </h1>
        </div>
        <h2 className={styles.loginTitle}>로그인</h2>
        <div className={styles.inputContainer}>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="이메일 주소"
            value={useremail}
            onChange={e => setuseremail(e.target.value)}
          />
          <input
            className={styles.loginInput}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginBtn} onClick={handleLogin}>
          로그인
        </button>
        <div className={styles.separator}>
          <span className={styles.separatorText}>또는</span>
        </div>
        <div className={styles.googleLogin}>
          <GoogleLoginButton/>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.backBtn} onClick={GoRegister}>
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;