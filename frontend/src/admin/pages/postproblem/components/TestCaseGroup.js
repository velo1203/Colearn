import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import TestCase from "./TestCase";

const TestCaseGroup = ({
    visibleTestCases,
    hiddenTestCases,
    handleRemoveTestCase,
    handleChange,
    handleAddTestCase,
    styles
}) => (
    <div className={styles.testCaseBox}>
        <div className={styles.ShowCase}>
            <h4 className={styles.CaseTitle}>보여지는 예시 {visibleTestCases.length}/3</h4>
            {visibleTestCases.map((testCase, index) => (
                <TestCase
                    testCase={testCase}
                    index={index}
                    handleRemoveTestCase={handleRemoveTestCase}
                    handleChange={handleChange}
                    setVisible={true}
                    styles={styles}
                    key={index}
                />
            ))}
            {visibleTestCases.length < 3 ? (
                <button
                    type="button"
                    onClick={() => handleAddTestCase(true)}
                    className={styles.button}
                >
                    보여지는 예시 추가 <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
            ) : null}
        </div>
        <div className={styles.HiddenCase}>
            <h4 className={styles.CaseTitle}>안보여지는 예시 {hiddenTestCases.length}/2</h4>
            {hiddenTestCases.map((testCase, index) => (
                <TestCase
                    testCase={testCase}
                    index={index}
                    handleRemoveTestCase={handleRemoveTestCase}
                    handleChange={handleChange}
                    setVisible={false}
                    styles={styles}
                    key={index}
                />
            ))}
            {hiddenTestCases.length < 2 ? (
                <button
                    type="button"
                    onClick={() => handleAddTestCase(false)}
                    className={styles.button}
                >
                    안보여지는 예시 추가 <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
            ) : null}
        </div>
    </div>
);

export default TestCaseGroup;