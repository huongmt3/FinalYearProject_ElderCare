import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { ROUTE_PATH } from "../../../routes/route-path";
import logo from "../../../assets/images/logo.svg";

function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* <div className="bg-gray-300 rounded-full px-4 py-2 text-gray-700 font-semibold">LOGO</div> */}
          <img src={logo} alt="logo" className="w-30" />
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to={ROUTE_PATH.LOGIN}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Login
            </NavLink>
            <NavLink
              to={ROUTE_PATH.SIGNUP}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to={ROUTE_PATH.HOME}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTE_PATH.NOTIFICATIONS}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Notifications
            </NavLink>
            <NavLink
              to={ROUTE_PATH.APPOINTMENTS}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Appointments
            </NavLink>
            <NavLink
              to={ROUTE_PATH.PROFESSIONAL_PROFILE}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              PRO Profile
            </NavLink>
            <NavLink
              to={ROUTE_PATH.USER_PROFILE}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              User Profile
            </NavLink>
            <NavLink
              to={ROUTE_PATH.PROFESSIONAL_LISTING}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Professional Listing
            </NavLink>
            <NavLink
              to={ROUTE_PATH.APPOINTMENT_BOOKING}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Booking
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700">StevilSquad</span>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;