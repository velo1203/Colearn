import styles from './css/viewoption.module.css'
import { useState } from 'react';

function Viewoption({selectedOption,setSelectedOption}) {

    const options = [
      {
        id: 1,
        label: '파이썬 기본 문제',
      },
      {
        id: 2,
        label: '사설 문제',
      },
    ];
  
    const handleOptionClick = (optionId) => {
      setSelectedOption(optionId);
    };
  
    return (
      <ul className={styles.viewoptions}>
        {options.map((option) => (
          <li
            key={option.id}
            className={`${styles.viewoption} ${selectedOption === option.id ? styles['view-on'] : ''}`}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
}

export default Viewoption;
