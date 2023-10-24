import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import styles from './PartDetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';

const PartDetail = () => {
    const { id } = useParams();
    const [partData, setMarkdownData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/parts/${id}`,{withCredentials:true})
            .then(response => {
                console.log(response.data)
                setMarkdownData(response.data.part);  // assuming the backend returns an object with a part property
            })
            .catch(error => {
                console.error("Error fetching part data:", error);
            });
    }, [id]);  // Effect will run every time ID changes

    return (
        <div className={styles.pdfContainer}>
            {partData ? (
                <>
                    <h1>{partData.title}</h1>
                    <div className={styles.MarkdownPart}>
                    <Viewer initialValue={partData.markdownContent} />
                    </div>
                    <p className={styles.LinktoProblem}>문제풀러가기</p>
                    {partData.problemId && (
                    <div className={styles.Linkto} onClick={()=>{navigate(`/codespace/${partData.problemId}`)}}>

                            <p className={styles.LinktoProblem}>문제풀러가기</p>
                    </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
    
};

export default PartDetail;
