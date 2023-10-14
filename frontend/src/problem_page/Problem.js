import styles from './Problem.module.css'
import Searchbox from './component/searchbox';
import Viewoption from './component/viewoption';
import Problemlist from './component/problemlist';
import { useState,useEffect } from 'react';
import axios from '../axiosConfig';


function ProblemPage() {
    const [problemlist, setProblemlist] = useState([]);
    const [selectedOption, setSelectedOption] = useState(1);

    useEffect(() => {
        axios.get(`/user/show_problemlist`)
          .then((response) => {
            setProblemlist(response.data);
          })
          .catch(() => {
            console.log('문제가 없습니다')
            setProblemlist([]);
          });
      }, [selectedOption]);
      

    return (
        <div className={styles.problempage}>
            <div className={styles.pbHeader}>
                <div className={styles.pbContainer}>
                    <Searchbox/>
                    {/* <Viewoption selectedOption={selectedOption} setSelectedOption={setSelectedOption}/> */}
                </div>
            </div>
            <div className={styles.pbContainer}>
            <Problemlist problemlist={problemlist} />
            </div>
      </div>
    )
}

export default ProblemPage;