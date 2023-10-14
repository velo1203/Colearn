import NavigationBar from './nav/Nav';
import Sidebar from './sidebar/sidebar';
import './Layout.css'

// Layout 컴포넌트는 공통 구조를 구성하는데 사용
// 이 컴포넌트는 NavigationBar와 Sidebar를 포함함
// 이를 통해 각 페이지에 동일한 구조를 적용할 수 있다.
// children prop은 해당 컴포넌트의 자식 요소를 나타내며,
// 여기서는 각 페이지의 주요 컨텐츠가 된다.

const Layout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Sidebar />
      <div className="layout-content">{children}</div>
    </>
  );
};

export default Layout;