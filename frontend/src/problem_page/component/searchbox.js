import {useState, useEffect } from 'react';
import styles from './css/searchbox.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
function Searchbox(props) {
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleCategoryClick = (category) => {
        if (selectedCategory && selectedCategory.id === category.id) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showCategories && e.target.closest(`.${styles.categoryContainer}`) === null) {
                setShowCategories(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCategories]);

    const categoryItems = [
        {
            id: 1,
            name: '어려움',
            color: '#FFABAB'
        }, {
            id: 2,
            name: '보통',
            color: '#FDFFAB'
        }, {
            id: 3,
            name: '쉬움',
            color: '#CBFFAB'
        }
    ];

    return (
        <div className={styles.headerSearchbox}>
            <h1>{props.ic_book} 파이썬 기본 문제</h1>
            <div className={styles.headerSearch}>
            </div>
        </div>
    );
}


export default Searchbox;