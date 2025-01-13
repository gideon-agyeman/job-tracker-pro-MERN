import { createBrowserRouter, RouterProvider } from 'react-router';
import {
  HomeLayout,
  LandingPage,
  Error,
  Register,
  Login,
  DashboardLayout,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
  DeleteJob,
} from './pages';

import {
  addJobAction,
  deleteJobAction,
  editJobAction,
  loginUserAction,
  registerUserAction,
  userProfileUpdateAction,
} from './utils/formActions';
import {
  adminPageLoader,
  dashboardLoader,
  editJobLoader,
  jobsLoader,
  statsPageLoader,
} from './utils/loaders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerUserAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginUserAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsPageLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: jobsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: userProfileUpdateAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminPageLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: 'delete-job/:id',
            element: <DeleteJob />,
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
