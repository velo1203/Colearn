import React, { useState, useEffect } from 'react';
import axios from '../../../axiosConfig';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import styles from '../editproblem/editproblem.module.css'
import { useNavigate } from 'react-router-dom';

const Markdown_upload = () => {
    const [title, setTitle] = useState("");
    const [problemlist, setProblemlist] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState("");
    const navigate = useNavigate()
    let editorRef = React.createRef();

    useEffect(() => {
        // 초기 문제 리스트 로딩
        axios.get(`admin/show_problemlist`, { withCredentials: true })
            .then((response) => {
                setProblemlist(response.data);
            })
            .catch(() => {
                console.log('문제가 없습니다');
            });
    }, []);

    const handleSubmit = () => {
        const markdown = editorRef.current.getInstance().getMarkdown();

        // 백엔드에 전송할 데이터 객체 생성
        const partData = {
            title: title,
            markdownContent: markdown,
            problemId: selectedProblem
        };

        // 백엔드에 데이터 전송
        axios.post('/admin/upload_part', partData, { withCredentials: true })
            .then(response => {
                navigate('/')
            })
            .catch(error => {
                console.error("Error uploading part:", error);
                alert("파트 업로드 중 에러가 발생하였습니다. 다시 시도해주세요.");
            });
    };

    return (
        <div className={styles.markdownEdit}>
            <div className={styles.container}>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        파트 제목  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.editInput} />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                        <Editor
                            previewStyle="vertical"
                            height="400px"
                            initialEditType="markdown"
                            initialValue=''
                            ref={editorRef}
                            hideModeSwitch={true}

                        />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        <select value={selectedProblem} onChange={(e) => setSelectedProblem(e.target.value)} className={styles.select}>
                            <option value="">-- 문제 선택 --</option>
                            {
                                problemlist.map(problem => (
                                    <option key={problem.id} value={problem.id}>{problem.title}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>

                <button onClick={handleSubmit} className={styles.button}>파트 등록</button>
            </div>
        </div>
    );
}

export default Markdown_upload;
