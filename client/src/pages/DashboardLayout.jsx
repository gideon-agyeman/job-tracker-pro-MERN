/* eslint-disable react-refresh/only-export-components */
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router';
import DashboardWrapper from '../assets/page-wrappers/Dashboard';
import SSideBar from '../components/SSideBar';
import BSidebar from '../components/BSidebar';
import Navbar from '../components/Navbar';
import { createContext, useContext, useState } from 'react';
import customFetch from '../utils/customFetch';
import Loading from '../components/Loading';

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
  };

  const dashboardProps = {
    user,
    showSidebar,
    toggleSidebar,
    logoutUser,
  };

  return (
    <DashboardContext.Provider value={dashboardProps}>
      <DashboardWrapper>
        <main className="dashboard">
          <SSideBar />
          <BSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </DashboardWrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
