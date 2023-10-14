import styles from './mypage.module.css'
import { useState ,useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faEnvelope, faStar, } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from '../authStore'
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { user_logout } from '../authService';



function Mypage(){
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { isLoggedIn, logOut, role } = useAuthStore();

  useEffect(() => {
      const checkAuth = async () => {
          try {
              const res = await axios.get(
                  '/user/info',
                  {withCredentials: true}
              );
              setUser(res.data.user_info)
          } catch (error) {
            if (isLoggedIn === true){
              if (error.response.status === 401){
                alert('세션만료')
                user_logout(logOut)
              }
            }
            else{
              navigate('/login')
            }
          }
      };
      if (role === 'user') {
          checkAuth();
      }

  }, []);


  return (
    <div>
      <div className={styles.infoHeader}>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>My Page</h1>
          <h2 className={styles.info}>이름: {user.username}</h2>
          <h3 className={styles.info}><FontAwesomeIcon icon={faEnvelope}/> 이메일: {user.useremail}</h3>
          <h4 className={styles.info}>푼 문제 수: {user.problem_count}</h4>
          <h4 className={styles.info}>로그인 타입: {user.type}</h4>
        </div>
      </div>
    </div>
  );
}

export default Mypage;