import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { ROUTE_PATH } from "../../../routes/route-path";
import logo from "../../../assets/images/logo.svg";
import { useSelector } from "react-redux";
import { AppState } from "./../../../store/store";
import { useDispatch } from "react-redux";
import { clearUser } from "./../../../store/userSlice"

function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state: AppState) => state.user);
  const role = user.role;

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());

    // Chuyển hướng đến trang Home
    navigate("/"); // Đường dẫn đến trang Home
  };

  return (
    <header className="border-b border-gray-200 bg-white relative z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* <div className="bg-gray-300 rounded-full px-4 py-2 text-gray-700 font-semibold">LOGO</div> */}
          <NavLink to={ROUTE_PATH.HOME}>
            <img src={logo} alt="logo" className="w-30" />
          </NavLink>
          <nav className="hidden md:flex space-x-8">
            {role === "" && <NavLink
              to={ROUTE_PATH.LOGIN}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Login
            </NavLink>}
            {role === "" && <NavLink
              to={ROUTE_PATH.SIGNUP}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Sign Up
            </NavLink>}
            {/* <NavLink
              to={ROUTE_PATH.HOME}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Home
            </NavLink> */}
            {(role === "user" || role === "professional") && <NavLink
              to={ROUTE_PATH.NOTIFICATIONS}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Notifications
            </NavLink>}
            {role !== "" && <NavLink
              to={ROUTE_PATH.APPOINTMENTS}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Appointments
            </NavLink>}
            {role === "professional" && <NavLink
              to={ROUTE_PATH.PROFESSIONAL_PROFILE}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              PRO Profile
            </NavLink>}
            {role === "user" && <NavLink
              to={ROUTE_PATH.USER_PROFILE}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              User Profile
            </NavLink>}
            {role === "user" && <NavLink
              to={ROUTE_PATH.PROFESSIONAL_LISTING}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Professional Listing
            </NavLink>}
            {/* <NavLink
              to={ROUTE_PATH.APPOINTMENT_BOOKING}
              className={({ isActive }) =>
                isActive ? "text-gray-900 border-b-2 border-gray-900 pb-3 font-medium" : "text-gray-600 hover:text-gray-900"
              }
            >
              Booking
            </NavLink> */}
          </nav>
        </div>

        {role !== "" && <div className="flex items-center space-x-3 relative">
          <span className="text-gray-700">{user.fullName}</span>
          <div
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer mr-0"
            onClick={toggleDropdown}
          >
            SS
          </div>
          {isDropdownVisible && (
            <div className="absolute right-0 top-12 w-32 bg-white border rounded-lg shadow-lg">
              <button className="w-full text-left px-4 py-2 text-gray-700 cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>}

      </div>
    </header>
  );
}

export default Navbar;