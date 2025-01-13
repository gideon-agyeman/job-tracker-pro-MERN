import { FaTimes } from 'react-icons/fa';
import SidebarWrapper from '../assets/page-wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SSideBar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <SidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default SSideBar;
