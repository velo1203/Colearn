import { useNavigate } from 'react-router-dom';
import styles from './css/problemlist.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from '../../authStore';
import { useEffect ,useState} from 'react';
import axios from '../../axiosConfig';

function Problemlist(props) {
  const { problemlist } = props;
  const { isLoggedIn, role } = useAuthStore();
  const [solvedProblems, setSolvedProblems] = useState([]);
  
  useEffect(() => {
    if (isLoggedIn) { // 로그인 상태일 경우만 요청 수행
      axios.get(`/user/info`,{withCredentials:true})
        .then((response) => {
          var solved_problem = response.data.user_info.solved_problem;
          setSolvedProblems(solved_problem); // 받아온 데이터를 solvedProblems 상태에 저장
        })
        .catch(() => {
          console.log("Failed to fetch solved problem list.");
        });
    }
  }, [isLoggedIn]); // isLoggedIn 의존성 추가
  console.log(problemlist)
  const sortedProblemlist = [...problemlist].sort((a, b) => a.order - b.order);

  return (
    <div>
      {problemlist.length === 0 ? (
        <p className={styles.noproblem}>문제가 없습니다</p>
      ) : (
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '55%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead className={styles.tableHead}>
            <tr>
              <th>문제 이름/아이디</th>
              <th>문제 설명</th>
              <th>아이디</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {sortedProblemlist.map((row, index) => (
              <TableRow key={index} i={index} rowData={row} solvedProblems={solvedProblems} /> // solvedProblems를 TableRow에 전달
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function TableRow({ i ,rowData, solvedProblems }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate('/codespace/' + rowData.id);
  };
  const solved = solvedProblems && solvedProblems.includes(rowData.id);
  return (
    <tr>
      <td className={styles.tableTitle} onClick={handleRowClick}>
        <FontAwesomeIcon icon={faBook}/> {i + 1}. {rowData.title} {solved && <FontAwesomeIcon icon={faCheckCircle} className={styles.solvedBadge}/>}
      </td>
      <td className={styles.tableDescription}>{rowData.description}</td>
      <td className={styles.tableId}>{rowData.id}</td>
    </tr>
  );
}


export default Problemlist;