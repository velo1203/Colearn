import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faGear, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import useAuthStore from '../authStore';
import { handleLogout } from '../authService';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, role, logOut } = useAuthStore();

  const getClassName = (path) => {
    return location.pathname === path ? `${styles.sidebarLink} ${styles.sidebarOn}` : styles.sidebarLink;
  };

  const GoHome = () =>{
    navigate('/');
  }
  const GoLearn = () => {
    navigate('/learn')
  }

  const GoAdmin = () => {
    navigate('/admin');
  }


  return (
    <div className={styles.sidebar}>
      <ul>
        <li className={getClassName('/learn')} onClick={GoLearn}>
          <FontAwesomeIcon icon={faBook}/> 파이썬 배우기
        </li>
        <li className={getClassName('/')} onClick={GoHome}>
        <FontAwesomeIcon icon={faBook}/>  문제 풀기
        </li>
        {isLoggedIn && (
          <>
            {role === 'admin' ? (
            <li className={getClassName('/admin')} onClick={GoAdmin}>
              <FontAwesomeIcon icon={faGear}/>  어드민
            </li>) : ''}
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar;
