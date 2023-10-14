import {useState, useEffect} from "react";
import styles from './admin.module.css'
import axios from "../axiosConfig";
import {useNavigate} from "react-router-dom";
import PostProblem from "./pages/postproblem/postproblem";
import EditProblem from "./pages/editproblem/editproblem";
import useAuthStore from "../authStore";
import Markdown_uplaod from "./pages/postmarkdown/markdown_upload";

const AdminPage = () => {
    const {isLoggedIn, role} = useAuthStore();
    const [CurrentPage, SetCurrentPage] = useState('list')
    const navigate = useNavigate()

    function HandleChangeOption(page) {
        SetCurrentPage(page)
    }

    useEffect(() => {
        if (role === 'user') {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <div className={styles.nav}>
                <div className={styles.navcontainer}>
                    <div className={styles.navtitle}>AdminPage</div>
                    <ul className={styles.navoptions}>
                        <li
                            onClick={() => HandleChangeOption('list')}
                            className={`${styles.option} ${CurrentPage === 'list'
                                ? styles.onoption
                                : ''}`}>
                            문제 목록
                        </li>
                        <li
                            onClick={() => HandleChangeOption('post')}
                            className={`${styles.option} ${CurrentPage === 'post'
                                ? styles.onoption
                                : ''}`}>
                            문제 등록
                        </li>
                        <li
                            onClick={() => HandleChangeOption('markdown')}
                            className={`${styles.option} ${CurrentPage === 'markdown'
                                ? styles.onoption
                                : ''}`}>
                            교재 등록
                        </li>
                    </ul>
                </div>
            </div>

            {{
          list: <EditProblem />,
          post: <PostProblem HandleChangeOption={HandleChangeOption} />,
          markdown: <Markdown_uplaod/>
        }[CurrentPage]}
        </div>
    );

}

export default AdminPage;
