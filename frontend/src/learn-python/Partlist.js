import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import styles from './PartList.module.css';
import { useNavigate } from 'react-router-dom';

const PartList = () => {
    const [Parts, setParts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/parts', { withCredentials: true })
            .then((response) => {
                setParts(response.data.parts);
            })
            .catch((error) => {
                console.error('교재 데이터를 가져오는데 실패했습니다:', error);
            });
    }, []);

    return (
        <div className={styles.PartListContainer}>
            <div className={styles.PartListBox}>
            <h2 className={styles.PartListTitle}>교재 목록</h2>
            <ul className={styles.PartList}>
                {Parts.map((part,i) => (
                    <li key={part.id} className={styles.PartItem} onClick={()=>{navigate(`/learn/${part.id}`)}}>
                        <h3 className={styles.PartItemTitle}>{i + 1}. {part.title}</h3>
                        <p className={styles.PartItemId}>id : {part.id}</p>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default PartList;
