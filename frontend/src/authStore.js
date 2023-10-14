import { create } from 'zustand';

// Define your store
const useAuthStore = create(set => ({
  isLoggedIn: false,
  isLoading: true, // 초기 로딩 상태 설정
  role: 'user', // 초기 role 설정
  username: '', // Add a username state variable
  logIn: (role = 'user', username = '내정보') => set({ isLoggedIn: true, role: role, username: username }), // Include username in the logIn function
  logOut: () => set({ isLoggedIn: false, role: 'user', username: '' }), // Reset username on logOut
  setLoading: (loading) => set({ isLoading: loading }), // Add setLoading function
}));

export default useAuthStore;
