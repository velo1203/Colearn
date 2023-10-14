import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

const TestCase = ({
    testCase,
    index,
    handleRemoveTestCase,
    handleChange,
    setVisible,
    styles
}
) => (
    <div key={index} className={styles.testCaseGroup}>
        <div>
            <div className={styles.CaseInputBox}>
                <div className={styles.Caseinput}>
                    <label htmlFor={`input-${index}`} className={styles.label}>
                        입력 {index + 1}
                    </label>
                    <input
                        id={`input-${index}`}
                        type="text"
                        value={testCase.input}
                        onChange={(e) => handleChange(e, index, setVisible)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.Caseinput}>
                    <label htmlFor={`output-${index}`} className={styles.label}>
                        출력 {index + 1}
                    </label>
                    <input
                        id={`output-${index}`}
                        type="text"
                        value={testCase.output}
                        onChange={(e) => handleChange(e, index, setVisible)}
                        className={styles.input}
                    />
                </div>
            </div>
        </div>
        {index === 0 ? (
            ''
        ) : (
            <button
                type="button"
                onClick={() => handleRemoveTestCase(index, setVisible)}
                className={styles.DeleteButton}
                disabled={index === 0}
            >
                삭제 <FontAwesomeIcon icon={faTrash}/>
            </button>
        )}
    </div>
)

export default TestCase;
