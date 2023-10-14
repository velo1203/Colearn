import { useState, useEffect} from "react";
import styles from './postproblem.module.css'
import axios from "../../../axiosConfig";
import Editor from '@monaco-editor/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import TestCaseGroup from './components/TestCaseGroup'

const PostProblem = ({HandleChangeOption}) => {

    const defaultJson = JSON.stringify({
        "title": "문제 제목",
        "description": "문제 설명",
        "visibleTestCases": [
            {
                "input": "보여지는 테스트 케이스 1의 입력",
                "output": "보여지는 테스트 케이스 1의 출력"
            },
            {
                "input": "보여지는 테스트 케이스 2의 입력",
                "output": "보여지는 테스트 케이스 2의 출력"
            }
        ],
        "hiddenTestCases": [
            {
                "input": "숨겨진 테스트 케이스 1의 입력",
                "output": "숨겨진 테스트 케이스 1의 출력"
            }
        ],
        "modelAnswer": "모델 답안 코드",
        "modelHint": "모델 힌트 코드"
    }
    , null, 2); // json pretty print

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [visibleTestCases, setVisibleTestCases] = useState([{ input: '', output: '' }]);
    const [hiddenTestCases, setHiddenTestCases] = useState([{ input: '', output: ''}]);
    const [modelAnswer, setModelAnswer] = useState('');
    const [jsonInput, setJsonInput] = useState('');
    const [modelHint, setModelHint] = useState('');


    const copyToClipboard = async text => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
        }
    };

    useEffect(() => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            if (parsedJson.title) setTitle(parsedJson.title);
            if (parsedJson.description) setDescription(parsedJson.description);
            if (parsedJson.visibleTestCases) setVisibleTestCases(parsedJson.visibleTestCases);
            if (parsedJson.hiddenTestCases) setHiddenTestCases(parsedJson.hiddenTestCases);
            if (parsedJson.modelAnswer) setModelAnswer(parsedJson.modelAnswer);
            if (parsedJson.modelHint) setModelHint(parsedJson.modelHint);

        } catch (error) {
            console.error('Invalid JSON');
        }
    }, [jsonInput]);

    const OnCodeChangeAnswer = (value) => setModelAnswer(value);
    const OnCodeChangeHint = (value) => setModelHint(value);


    const handleAddTestCase = (setVisible) => {
        const testCases = setVisible ? [...visibleTestCases] : [...hiddenTestCases];
    
        if ((setVisible && testCases.length < 3) || !setVisible) {
            testCases.push({ input: '', output: '' });
            setVisible ? setVisibleTestCases(testCases) : setHiddenTestCases(testCases);
        }
    };
    
    const handleRemoveTestCase = (index, setVisible) => {
        const testCases = setVisible ? [...visibleTestCases] : [...hiddenTestCases];
    
        if (testCases.length > 1) {
            testCases.splice(index, 1);
            setVisible ? setVisibleTestCases(testCases) : setHiddenTestCases(testCases);
        }
    };
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if the first visible test case has a non-empty input and output
        const firstVisibleTestCaseHasValues = visibleTestCases[0].output.trim() !== '';

        if (!title || !description || !firstVisibleTestCaseHasValues) {
            alert('첫 번째 보이는 테스트 케이스의 입력과 출력 필드를 채우고, 문제 제목과 설명이 있는지 확인하십시오.');
            return;
        }
        console.log({
                    title, 
                    description, 
                    visibleTestCases, // visible test cases separately
                    hiddenTestCases,   // hidden test cases separately
                    modelAnswer,
                })
    
        try {
            const response = await axios.post('/admin/post_problem',{
                title, 
                description, 
                visibleTestCases, // visible test cases separately
                hiddenTestCases,   // hidden test cases separately
                modelAnswer,
                modelHint
            },{withCredentials:true});

            console.log(response.data);
            HandleChangeOption('list');

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e, index, setVisible) => {
        const testCases = setVisible ? [...visibleTestCases] : [...hiddenTestCases];
        testCases[index][e.target.id.startsWith('input') ? 'input' : 'output'] = e.target.value;

        setVisible ? setVisibleTestCases(testCases) : setHiddenTestCases(testCases);
    };

    return (
        <div className={styles.postproblem}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.probleminfo}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="jsonInput" className={styles.label}>JSON 입력</label>
                                <input id="jsonInput" type="text" value={jsonInput} onChange={e => setJsonInput(e.target.value)} className={styles.input}/>
                            </div>
                            <button 
                                type="button"
                                onClick={() => copyToClipboard(defaultJson)}
                                className={styles.button} 
                            >
                                JSON 양식 복사
                            </button>
                        </div>

                    <div className={styles.probleminfo}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="title" className={styles.label}>문제 제목</label>
                            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={styles.input}/>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="description" className={styles.label}>문제 설명</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className={styles.input}/>
                        </div>
                    </div>

                    <TestCaseGroup
                        visibleTestCases={visibleTestCases}
                        hiddenTestCases={hiddenTestCases}
                        handleRemoveTestCase={handleRemoveTestCase}
                        handleChange={handleChange}
                        handleAddTestCase={handleAddTestCase}
                        styles={styles} 
                    />
                    <div className={styles.modelAnswerInputbox}>
                        <label htmlFor="modelHint" className={styles.label}>코드 힌트</label>
                        <Editor id="modelHint" height="300px" language="python" value={modelHint} onChange={OnCodeChangeHint} className={styles.modelAnswerInput}/>
                    </div>
                    <div className={styles.modelAnswerInputbox}>
                        <label htmlFor="modelAnswer" className={styles.label}>모범 답안 (관리자만 볼 수 있음)</label>
                        <Editor id="modelAnswer" height="300px" language="python" value={modelAnswer} onChange={OnCodeChangeAnswer} className={styles.modelAnswerInput}/>
                    </div>


                    <div className={styles.options}>
                        <p>보여지는 예시: {visibleTestCases.length}/3</p>
                        <p>안보여지는 예시: {hiddenTestCases.length}/2</p>
                        <button type="submit" className={styles.submit}>등록 <FontAwesomeIcon icon={faCloudUpload}/></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostProblem;