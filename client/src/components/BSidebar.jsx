import SidebarWrapper from '../assets/page-wrappers/BigSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavLinks from './NavLinks';

const BSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <SidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <h2
            style={{
              fontWeight: 'bold',
              textAlign: 'start',
              padding: '20px',
              margin: '10px',
              color: '#14919b',
            }}
          >
            Menu
          </h2>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default BSidebar;
