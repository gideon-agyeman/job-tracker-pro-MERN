import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import ErrorElement from './components/ErrorElement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
            loader: statsPageLoader(queryClient),
            errorElement: <ErrorElement />,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>;
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default App;
