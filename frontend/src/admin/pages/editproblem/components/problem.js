import {useEffect, useState} from 'react';
import axios from '../../../../axiosConfig';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import Editor from '@monaco-editor/react'

const Problem = ({row, selectedId, setSelectedId, setProblemlist, problemlist,styles}) => {
    console.log(row)
    const showEdit = row.id === selectedId;
    const [editMode, setEditMode] = useState(false);
    const [editedRow, setEditedRow] = useState({
        ...row
    });
    const [isEditing, setIsEditing] = useState(false); // 상태 변수 추가

    const handleMoreClick = () => {
        if (row.id === selectedId) {
            setSelectedId(null);
        } else {
            setSelectedId(row.id);
        }
        setEditMode(false);
        setEditedRow({
            ...row
        });
    };

    const handleEditClick = () => {
        if (editMode) {
            setIsEditing(true); // 수정 시작
            axios
                .post('/admin/edit_problem', editedRow,{withCredentials:true})
                .then((response) => {
                    alert(response.data.message)
                    setIsEditing(false); // 수정 완료
                })
                .catch((error) => {
                    console.log(error)
                    setIsEditing(false); // 수정 완료
                });
        }
        setEditMode(!editMode);
    };
    const handleDeleteClick = () => {
        axios
            .post('/admin/delete_problem', editedRow,{withCredentials:true})
            .then((response) => {
                alert(response.data.message)
                setProblemlist(problemlist.filter(problem => problem.id !== editedRow.id));
            })
            .catch((error) => {
                console.log(error)
            });
    }
    async function handleCopyClick() {
        try {
            await navigator
                .clipboard
                .writeText(JSON.stringify(editedRow));
        } catch (err) {}
    }
    return (
        <li className={styles.problemBar}>
            <div className={styles.probleminfo}>
                <div className={styles.problemTitle}>
                {row.order}. {row.title}
                </div>
                <div className={styles.problemDescription}>
                    {row.description}
                </div>
                <button className={styles.button} onClick={handleMoreClick}>{
                        showEdit
                            ? '닫기'
                            : '더보기'
                    }
                    {showEdit && <FontAwesomeIcon icon={faClose}/>}</button>
            </div>
            {
                showEdit && (
                    <div className={styles.problemedit}>
                        <div className={styles.editcontainer}>
                            <div className={styles.problemTitle}>
                                {
                                    editMode
                                        ? <input
                                                className={styles.editInput}
                                                defaultValue={editedRow.title}
                                                onChange={e => setEditedRow(prevState => ({
                                                    ...prevState,
                                                    title: e.target.value
                                                }))}/>
                                        : editedRow.title
                                }
                            </div>
                            <div className={styles.problemDescription_info}>
                                {
                                    editMode
                                        ? <input
                                                className={styles.editInput}
                                                defaultValue={editedRow.description}
                                                onChange={e => setEditedRow(prevState => ({
                                                    ...prevState,
                                                    description: e.target.value
                                                }))}/>
                                        : editedRow.description
                                }
                            </div>
                        </div>
                        <div className={styles.editcontainer}>
                            <h4>보이는 테스트 케이스들</h4>
                            {
                                editedRow
                                    .visibleTestCases
                                    .map((visibletestcase, i) => {
                                        return (
                                            <div className={styles.testcase} key={i}>
                                                <div className={styles.testcaseinput}>Input : {
                                                        editMode
                                                            ? <input
                                                                    defaultValue={visibletestcase.input}
                                                                    className={styles.editInput}
                                                                    onChange={e => {
                                                                        let updatedRow = {
                                                                            ...editedRow
                                                                        };
                                                                        updatedRow
                                                                            .visibleTestCases[i]
                                                                            .input = e.target.value;
                                                                        setEditedRow(updatedRow);
                                                                    }}/>
                                                            : visibletestcase.input
                                                    }</div>
                                                <div className={styles.testcaseoutput}>Output : {
                                                        editMode
                                                            ? <input
                                                                    defaultValue={visibletestcase.output}
                                                                    className={styles.editInput}
                                                                    onChange={e => {
                                                                        let updatedRow = {
                                                                            ...editedRow
                                                                        };
                                                                        updatedRow
                                                                            .visibleTestCases[i]
                                                                            .output = e.target.value;
                                                                        setEditedRow(updatedRow);
                                                                    }}/>
                                                            : visibletestcase.output
                                                    }</div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                        <div className={styles.editcontainer}>
                            <h4>안보이는 테스트 케이스들</h4>
                            {
                                editedRow
                                    .hiddenTestCases
                                    .map((hiddentestcase, i) => {
                                        return (
                                            <div className={styles.testcase} key={i}>
                                                <div className={styles.testcaseinput}>Input : {
                                                        editMode
                                                            ? <input
                                                                    defaultValue={hiddentestcase.input}
                                                                    className={styles.editInput}
                                                                    onChange={e => {
                                                                        let updatedRow = {
                                                                            ...editedRow
                                                                        };
                                                                        updatedRow
                                                                            .hiddenTestCases[i]
                                                                            .input = e.target.value;
                                                                        setEditedRow(updatedRow);
                                                                    }}/>
                                                            : hiddentestcase.input
                                                    }</div>
                                                <div className={styles.testcaseoutput}>Output : {
                                                        editMode
                                                            ? <input
                                                                    defaultValue={hiddentestcase.output}
                                                                    className={styles.editInput}
                                                                    onChange={e => {
                                                                        let updatedRow = {
                                                                            ...editedRow
                                                                        };
                                                                        updatedRow
                                                                            .hiddenTestCases[i]
                                                                            .output = e.target.value;
                                                                        setEditedRow(updatedRow);
                                                                    }}/>
                                                            : hiddentestcase.output
                                                    }</div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                        <div className={styles.editcontainer}>
                            <h4>문제 힌트</h4>
                            <Editor
                                height="300px"
                                value={editedRow.modelHint}
                                language="python"
                                onChange={value => setEditedRow(prevState => ({
                                    ...prevState,
                                    modelHint: value
                                }))}/>
                        </div>
                        <div className={styles.editcontainer}>
                            <h4>모범 답안</h4>
                            <Editor
                                height="300px"
                                value={editedRow.modelAnswer}
                                language="python"
                                onChange={value => setEditedRow(prevState => ({
                                    ...prevState,
                                    modelAnswer: value
                                }))}/>
                        </div>
                        <div className={styles.menucontainer}>
                            {
                                showEdit && <button onClick={handleEditClick} className={styles.button}>{
                                            isEditing
                                                ? '수정 중...'
                                                : editMode
                                                    ? '완료'
                                                    : '수정'
                                        }</button>
                            }
                            {showEdit && <button onClick={handleDeleteClick} className={styles.button}>삭제</button>}
                            {showEdit && <button onClick={handleCopyClick} className={styles.button}>문제 JSON 복사</button>}
                        </div>
                    </div>
                )
            }
        </li>
    )
}

export default Problem;