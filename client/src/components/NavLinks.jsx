/* eslint-disable react/prop-types */
import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router';
import links from '../utils/links';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        if (link.path === 'admin' && user.role !== 'admin') return;
        return (
          <NavLink
            to={link.path}
            key={link.text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{link.icon}</span> {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
