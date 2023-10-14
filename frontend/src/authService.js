import axios from "./axiosConfig";

export const handleLogout = (logOut, navigate) => { // logOut은 상태관리 라이브러리에서 login 상태를 해제하는것
  axios.post('/user/logout', {}, { withCredentials: true })
      .then(res => {
          logOut();
          navigate('/');
      })
      .catch(error => console.error(error));
};

export const user_logout = (logOut) => { // logOut은 상태관리 라이브러리에서 login 상태를 해제하는것
    axios.post('/user/logout', {}, { withCredentials: true })
        .then(res => {
            logOut();
        })
        .catch(error => console.error(error));
  };
  