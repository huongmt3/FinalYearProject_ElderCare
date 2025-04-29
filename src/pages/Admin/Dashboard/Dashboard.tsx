import { Link, NavLink, Outlet } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { ROUTE_PATH } from '../../../routes/route-path';
import logo from "../../../assets/images/logo.svg";
import avatar from "../../../assets/images/avatar.png";
import logout from "../../../assets/images/logout.png";
import imgScheduleGray from "../../../assets/images/schedule-gray.png";
import imgScheduleWhite from "../../../assets/images/schedule-white.png";
import imgUserListGray from "../../../assets/images/user-list-icon-gray.png";
import imgUserListWhite from "../../../assets/images/dashboard-logo.png";

function Dashboard() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r">
        <div className="p-4">
          <img src={logo} alt="ELDERCARE" className="h-15" />
        </div>
        <div className="mt-8">
          <NavLink to={ROUTE_PATH.ADMIN_USERLIST}>
            {({ isActive }) => (
              <div
                className={`flex items-center p-4 font-medium ${isActive ? "bg-[#00a67d] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="mr-2">
                  <img
                    src={isActive ? imgUserListWhite : imgUserListGray}
                    alt="Admin Dashboard"
                    className="h-6"
                  />
                </span>
                User List
              </div>
            )}
          </NavLink>

          <NavLink to={ROUTE_PATH.ADMIN_APPOINTMENTS}>
            {({ isActive }) => (
              <div
                className={`flex items-center p-4 font-medium ${isActive ? "bg-[#00a67d] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="mr-2">
                  <img
                    src={isActive ? imgScheduleWhite : imgScheduleGray}
                    alt="Manage Appointments"
                    className="h-6"
                  />
                </span>
                Manage Appointments
              </div>
            )}
          </NavLink>

          <Link to={ROUTE_PATH.HOME} className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
            <span className="mr-2">
              <img src={logout} alt="Log Out Icon" className="h-6" />
            </span>
            Log Out
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Navigation */}
        <header className="border-b py-4 px-6 flex justify-between items-center">
          <div className="relative w-96">
            <Input
              placeholder="Search"
              className="pl-10 pr-4 border rounded-md"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} />
              <AvatarFallback>HH</AvatarFallback>
            </Avatar>
            <span className="font-semibold">Huong</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </header>

        <Outlet />

      </div>
    </div>
  );
}

export default Dashboard;
