import axios from 'axios';
import styles from './Nav.module.css';
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../authStore';
import { handleLogout } from '../authService';

function NavigationBar() {
    const code = <FontAwesomeIcon icon={faCode} />
    const navigate = useNavigate();
    const { isLoggedIn, logOut ,role,username} = useAuthStore();

    const GoLogin = () => {
        navigate('/login');
    }

    const GoRegister = () => {
        navigate('/register');
    }

    const GoHome = () => {
        navigate('/');
    }

    const GoMypage = () => {
        navigate('/mypage');
    }
    const GoAdmin = () => {
        navigate('/admin');
      }

    return (
      <nav className={styles.nav}>
      <div className={styles.navContainer}>
          <div className={styles.navLogo} onClick={GoHome}>
              Colearn {code}
          </div>
          <ul className={styles.navList}>
              {!isLoggedIn && <li onClick={GoLogin}>로그인</li>}
              {!isLoggedIn && <li onClick={GoRegister}>회원가입</li>}
              {isLoggedIn && role === 'user' ?  <li onClick={GoMypage}>{username}</li> : ''}
              {isLoggedIn && <li onClick={()=> handleLogout(logOut,navigate)}>로그아웃</li>}
              {isLoggedIn && role === 'admin' ?  <li onClick={GoAdmin}>어드민</li> : ''}
          </ul>
      </div>
  </nav>
    )
}

export default NavigationBar;
