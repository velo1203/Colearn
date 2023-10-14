import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import styles from './register.module.css'

const StepOneInput = ({ setName, name}) => {
    return (
        <>
            <input className={styles.registerInput} type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} value={name}/>
        </>
    )
}

const StepTwoInput = ({ setEmail, setPassword, setConfirmPassword, setTermsAccepted,email,password}) => {
    return (
        <>
            <input className={styles.registerInput} type="text" placeholder="이메일 주소" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className={styles.registerInput} type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input className={styles.registerInput} type="password" placeholder="비밀번호 확인" onChange={(e) => setConfirmPassword(e.target.value)} />
            <div className={styles.policy}>
                <input
                    type="checkbox"
                    id="terms"
                    onChange={(e) => setTermsAccepted(e.target.checked)}/>
                <p htmlFor="terms"> 개인정보 수집 및 이용 동의</p>
            </div>
        </>
    )
}

const RegisterButton = ({ step, goToNextStep }) => {
    return (
        <button className={styles.registerBtn} onClick={goToNextStep}>{step === 2 ? '회원가입' : '다음'}</button>
    )
}

const ButtonContainer = ({ step, goLogin, setStep }) => {
    return (
        <div className={styles.buttonContainer}>
            {
            step === 1 ? <div className={styles.backBtn} onClick={goLogin}>로그인</div>
            : <p className={styles.backBtn} onClick={() => setStep(prevStep => prevStep - 1)}>뒤로가기</p>
            }
        </div>
    )
}

const RegisterPage = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const goLogin = () => {
        navigate('/login')
    }
    const goHome = () => {
        navigate('/')
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const goToNextStep = () => {

        if (step === 1) {
            if (!name) {
                alert('Please enter your name');
                return;
            }
        }
        if (step === 2) {
            if (!validateEmail(email)) {
                alert('Invalid email format');
                return;
            }
    
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
    
            if (password !== confirmPassword) {
                alert('Password and confirm password do not match');
                return;
            }
            if (!termsAccepted) {
                alert('Please accept the terms and conditions');
                return;
            }
            register();
            return;
        }
        setStep(prevStep => prevStep + 1);
    }
    const register = async () => {

        try {
            const response = await axios.post('user/register', { useremail: email, password: password ,username:name});
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return(
        <div className={styles.registerPage}>
            <div className={styles.registerContainer}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logo} onClick={goHome}>런스팀 OJ</h1>
                </div>
                <h2 className={styles.registerTitle}>회원가입</h2>
                <div className={styles.inputContainer}>
                        {step === 1 ? (
                           <StepOneInput setName={setName} name={name}/>
                        ):(
                            <StepTwoInput setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} setTermsAccepted={setTermsAccepted} email={email} password={password}/>
                        )}
                </div>
                <RegisterButton step={step} goToNextStep={goToNextStep} />
                {step === 1 && (                
                <div className={styles.separator}>
                    <span className={styles.separatorText}>또는</span>
                </div>
                )}
                <ButtonContainer step={step} goLogin={goLogin} setStep={setStep} />
            </div>
        </div>
    )
}

export default RegisterPage;
