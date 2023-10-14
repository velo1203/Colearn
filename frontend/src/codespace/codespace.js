import styles from './codespace.module.css';
import { useState, useEffect } from 'react';
import CodeEditor from './component/editor';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosConfig';

function CodeSpace() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ProblemTitle, setProblemTitle] = useState('');
  const [ProblemDescription, setProblemDescription] = useState('');
  const [ProblemID, setProblemID] = useState('');
  const [exampleData, setExampleData] = useState([]);
  const [ModelHint,setModelHint] = useState('');
  const [code, setCode] = useState('');
  
  useEffect(() => {
    axios
      .get('/user/problem/' + id,{ withCredentials:true})
      .then((response) => {
        // Handle the response data
        let res = response.data;
        console.log(res);
        setProblemTitle(res.title);
        setProblemDescription(res.description);
        setExampleData(res.TestCases);
        setProblemID(res.id);
        setModelHint(res.modelHint)
        setCode(res.modelHint)
      })
      .catch((error) => {
        if (error.response.status === 401){
          navigate('/login')
        }
        else{
          navigate('/404')
        }
      });
  }, [id, navigate]);


  const onCodeChange = (value) => {
    setCode(value);
  };

  return (
    <div className={styles.csContainer}>
      <div className={styles.csTitle}>{ProblemTitle}</div>
      <div className={styles.csDescription}>{ProblemDescription}</div>
      <p className={styles.csId}>ID: {ProblemID}</p>
      <div className={styles.csExampleIO}>
        {exampleData.map((example, index) => (
          <div key={index} className={styles.csExamplePair}>
            <div className={styles.cxExampleBox}>
              <div className={styles.csExampleLabel}>예시입력 {index + 1}</div>
              <div className={styles.csExampleInput}>{example.input}</div>
            </div>
            <div className={styles.cxExampleBox}>
              <div className={styles.csExampleLabel}>예시 출력 {index + 1}</div>
              <div className={styles.csExampleOutput}>{example.output}</div>
            </div>
          </div>
        ))}
      </div>
      <CodeEditor code={code} onCodeChange={onCodeChange} styles={styles} ProblemID={ProblemID} ModelHint={ModelHint} />
    </div>
  );
}

export default CodeSpace;
