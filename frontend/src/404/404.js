import { useNavigate } from 'react-router-dom';
import styles from './404.module.css'
function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.notFoundContainer}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.errorMessage}>페이지를 찾을 수 없습니다.</div>
        <button className={styles.goBackButton} onClick={() => navigate('/')}>
          뒤로 가기
        </button>
      </div>
    )
}

export default NotFound;