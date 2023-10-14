import styles from './editproblem.module.css'
import {useEffect, useState} from 'react';
import axios from '../../../axiosConfig';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Problem from './components/problem';

const EditProblem = () => {
    const [problemlist, setProblemlist] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // 추가한 상태

    useEffect(() => {
        axios
            .get(`admin/show_problemlist`,{withCredentials:true})
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.order - b.order); // sort by order
                setProblemlist(sortedData);
            })
            .catch(() => {
                console.log('문제가 없습니다')
                setProblemlist([])
            });
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const newProblemList = Array.from(problemlist);
        const [removed] = newProblemList.splice(result.source.index, 1);
        newProblemList.splice(result.destination.index, 0, removed);
    
        newProblemList.forEach((problem, index) => {
            problem.order = index + 1; // order 속성 업데이트
        });
    
        setProblemlist(newProblemList);
    
        // 각 문제의 'order' 업데이트 API 요청
        axios.post('/admin/update_order', newProblemList, { withCredentials: true })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={styles.editproblem}>
            <div className={styles.container}>

                {
                    problemlist.length === 0
                        ? (<p className={styles.noproblem}>문제가 없습니다</p>)
                        : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            <ul>
                                                <li className={styles.TopproblemBar}>
                                                    <div className={styles.probleminfo}>
                                                        <div className={styles.problemTitle}>제목</div>
                                                        <div className={styles.problemDescription}>설명</div>
                                                        <div className={styles.problemDescription}>더보기/수정</div>
                                                    </div>
                                                </li>
                                                {
                                                    problemlist.map((problem, index) => (
                                                        <Draggable key={problem.id} draggableId={problem.id.toString()} index={index} isDragDisabled={selectedId !== null}>
                                                            {(provided) => (
                                                                <ul ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <Problem
                                                                        key={problem.id}
                                                                        row={problem}
                                                                        selectedId={selectedId}
                                                                        setSelectedId={setSelectedId}
                                                                        setProblemlist={setProblemlist}
                                                                        problemlist={problemlist}
                                                                        styles={styles}
                                                                    />
                                                                </ul>
                                                            )}
                                                        </Draggable>
                                                    ))
                                                }
                                                {provided.placeholder}
                                            </ul>
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )
                }
            </div>
        </div>
    )
}




export default EditProblem
