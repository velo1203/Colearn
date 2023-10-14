import axios from "../../axiosConfig";
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import useAuthStore from "../../authStore";

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const { logIn} = useAuthStore();
    const clientId = '963824164602-pgc8lggs3ac9cvea5lkahmfflifd3rru.apps.googleusercontent.com'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        axios.post('/user/google_login', res, {withCredentials: true})
                            .then((response) => {
                                var data = response.data
                                console.log(data)
                                if (data.login){
                                    logIn(data.role,data.username)
                                    navigate('/')
                                }
                            })
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton
