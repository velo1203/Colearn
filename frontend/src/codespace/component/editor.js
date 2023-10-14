import Editor from '@monaco-editor/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faPaperPlane, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import styles from './editor.module.css';
import axios from '../../axiosConfig';

function CodeEditor({ code, onCodeChange, ProblemID,ModelHint }) {
  const [Output, setOutput] = useState('');
  const [OutputColor, setOutputColor] = useState(true);

  function menu_delete() {
    onCodeChange(ModelHint);
  }

  function code_submit() {
    if (!code) {
      console.log('Please fill in Code editor');
      return;
    }
    axios.post('/judge/scoring', { 'code': code, 'post_id': ProblemID },{withCredentials:true}).then((response) => {
      // Handle the response data
      //  code0 : success
      //  code1 : testcaseError
      //  code2 : compile Error
      let res = response.data;
      console.log(res);
      setOutput(res.message);
      if (res.code === 0) {
        setOutputColor(true);
        setOutput(res.message + ' 해당 문제를 해결하셨습니다');
      } else {
        if (res.code === 1) {
          setOutput(res.message + ' / output: ' + res.output);
        }
        setOutputColor(false);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  async function menu_copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {}
  }

  return (
    <div className={styles.codeEditorContainer}>
      <p style={{ color: '#A4B2CB' }}>파이썬 에디터</p>
      <div className={styles.editorMenu}>
        <button className={`${styles.menuButton} ${styles.menuDelete}`} onClick={menu_delete}>
          <FontAwesomeIcon icon={faTrashAlt} /> 삭제
        </button>
        <button className={`${styles.menuButton} ${styles.menuCopy}`} onClick={menu_copy}>
          <FontAwesomeIcon icon={faClipboard} /> 코드 복사
        </button>
        <OpenFileMenu onCodeChange={onCodeChange} />
        <button className={`${styles.menuButton} ${styles.menuSubmit}`} onClick={code_submit}>
          <FontAwesomeIcon icon={faPaperPlane} /> 코드 제출
        </button>
      </div>
      <Editor height="350px" onChange={onCodeChange} value={code} language="python" />
      <div className={`${styles.ResultContainer}`}>
        <p className={styles.OuputLabel}>Output</p>
        <p className={OutputColor ? styles.ResultGreen : styles.ResultRed}>{Output}</p>
      </div>
    </div>
  );
}

function OpenFileMenu({ onCodeChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.name.endsWith('.py')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onCodeChange(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('파이썬 파일(.py)만 선택할 수 있습니다.');
    }
    e.target.value = null; // 입력 값을 초기화
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <button
        className={`${styles.menuButton} ${styles.menuOpenfile}`}
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={faUpload} /> 파일로 열기
      </button>
      <input
        id="fileInput"
        type="file"
        accept=".py"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default CodeEditor;
