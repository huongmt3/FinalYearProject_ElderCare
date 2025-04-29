import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import DefaultLayout from "../layouts/DefaultLayout";
//Common
import HomePage from "../pages/Common/HomePage/HomePage";
import Login from "../pages/Common/Login/Login";
import SignUp from "../pages/Common/SignUp/SignUp";
import NotFound from "../pages/Common/NotFound/NotFound";
import Notifications from "../pages/Common/Notifications/Notifications";
//Admin
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
//Professional
import Appointments from "../pages/Professional/Appointments/Appointments";
import ProfessionalProfile from "../pages/Professional/ProfessionalProfile/ProfessionalProfile";
//Regular User
import UserProfile from "../pages/RegularUser/UserProfile/UserProfile";
import ProfessionalListing from "../pages/RegularUser/ProfessionalListing/ProfessionalListing";
import AppointmentBooking from "../pages/RegularUser/AppointmentBooking/AppointmentBooking";
import ManageAppointments from "../pages/Admin/Schedule/ManageAppointments";
import UserList from "../pages/Admin/UserList/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: ROUTE_PATH.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: ROUTE_PATH.APPOINTMENTS,
        element: <Appointments />,
      },
      {
        path: ROUTE_PATH.USER_PROFILE,
        element: <UserProfile />,
      },
      {
        path: ROUTE_PATH.PROFESSIONAL_PROFILE,
        element: <ProfessionalProfile />,
      },
      {
        path: ROUTE_PATH.PROFESSIONAL_LISTING,
        element: <ProfessionalListing />,
      },
      {
        path: ROUTE_PATH.APPOINTMENT_BOOKING,
        element: <AppointmentBooking />,
      }
    ],
  },
  {
    path: ROUTE_PATH.ADMIN_DASHBOARD,
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATH.ADMIN_USERLIST} replace />
      },
      {
        path: ROUTE_PATH.ADMIN_USERLIST,
        element: <UserList />
      },
      {
        path: ROUTE_PATH.ADMIN_APPOINTMENTS,
        element: <ManageAppointments />
      },
    ]
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATH.SIGNUP,
    element: <SignUp />,
  },
]);

export default router;