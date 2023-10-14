import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import useAuthStore from './authStore';
import axios from './axiosConfig';
import { user_logout } from './authService';
import PartList from './learn-python/Partlist';
import PartDetail from './learn-python/PartDetail';

const ProblemPage = lazy(() => import('./problem_page/Problem'));
const LoginPage = lazy(() => import('./auth/login_page/login'));
const RegisterPage = lazy(() => import('./auth/register_page/register'));
const CodeSpace = lazy(() => import('./codespace/codespace'));
const Mypage = lazy(() => import('./mypage/mypage'));
const NotFound = lazy(() => import('./404/404'));
const AdminPage = lazy(() => import('./admin/admin'));

function App() {
  const { logIn, logOut, isLoggedIn ,setLoading,isLoading } = useAuthStore();
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/user/status', { withCredentials: true });

        if (res.status === 200) {
          console.log('check auth')
          logIn(res.data.role,res.data.username);
        }
      } catch (error) {
        if (isLoggedIn === true) {
          if (error.response.status === 401) {
            user_logout(logOut);
            navigate('/login')
          }
        }
      } finally {
        setLoading(false); // Set loading state back to false after the request finishes
      }
    };

    checkAuth();
  }, [logIn, logOut, isLoggedIn, setLoading]);

  if (isLoading) {
    return <LoadingPage/> // Or your custom loading component
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingPage/>} >
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <ProblemPage />
              </Layout>
            }
          />
          <Route
            path="/learn"
            element={
              <Layout>
                <PartList />
              </Layout>
            }
          />
                    <Route
            path="/learn/:id"
            element={
              <Layout>
                <PartDetail />
              </Layout>
            }
          />
          <Route
            path="/mypage"
            element={
              <Layout>
                <Mypage />
              </Layout>
            }
          />
          <Route
            path="/codespace/:id"
            element={
              <Layout>
                <CodeSpace />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminPage />
              </Layout>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

function LoadingPage(){
  return(
    <div className='Loading'>
      <div className='LoadingContainer'>
      <p>로딩중...</p>
      <h4> {'</> Colearn'} </h4>
      </div>
  </div>
  )
}