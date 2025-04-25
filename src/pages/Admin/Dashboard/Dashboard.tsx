import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Button } from '../../../components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { Select, SelectContent, SelectItem,
     SelectTrigger, SelectValue } from "../../../components/ui/Select";
import { Badge } from "../../../components/ui/Badge";
import { Pagination, PaginationContent, 
    PaginationEllipsis, PaginationItem, 
    PaginationLink, PaginationNext } from '../../../components/ui/Pagination';
import { ROUTE_PATH } from '../../../routes/route-path';
import logo from "../../../assets/images/logo.svg";
import avatar from "../../../assets/images/avatar.png";
import useravt from "../../../assets/images/user-avatar.png";
import proavt from "../../../assets/images/pro-avatar.png";
import dashboard from "../../../assets/images/dashboard-logo.png";
import logout from "../../../assets/images/logout.png";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  role: string;
  avatar: string;
}

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  
  // Sample data for the user list
  const users: User[] = [
    {
      id: 1,
      name: "Ma Thu Huong",
      email: "mathuhuong@gmail.com",
      status: "Active",
      role: "Regular User",
      avatar: useravt,
    },
    {
      id: 2,
      name: "Ma Thu Huong",
      email: "mathuhuong@gmail.com",
      status: "Inactive",
      role: "Professional",
      avatar: proavt,
    },
    {
      id: 3,
      name: "Ma Thu Huong",
      email: "mathuhuong@gmail.com",
      status: "Active",
      role: "Regular User",
      avatar: useravt,
    },
    {
      id: 4,
      name: "Ma Thu Huong",
      email: "mathuhuong@gmail.com",
      status: "Inactive",
      role: "Professional",
      avatar: proavt,
    },
    {
      id: 5,
      name: "Ma Thu Huong",
      email: "mathuhuong@gmail.com",
      status: "Active",
      role: "Regular User",
      avatar: useravt,
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r">
        <div className="p-4">
          <img 
            src={logo} 
            alt="ELDERCARE" 
            className="h-15"
          />
        </div>
        <div className="mt-8">
          <Link
            to={ROUTE_PATH.ADMIN_DASHBOARD}
            className="flex items-center p-4 bg-[#00a67d] text-white font-medium"
          >
            <span className="mr-2">
                <img src={dashboard}
                alt="Admin Dashboard"
                className="h-6" />
            </span>
            User List
          </Link>
          <Link
            to={ROUTE_PATH.HOME}
            className="flex items-center p-4 text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-2">
                <img src={logout}
                alt="Log Out Icon"
                className="h-6" />
            </span>
            Log Out
          </Link>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col"> */}
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

        {/* User List Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">User List</h1>
            <p className="text-gray-500">View and manage all users</p>
          </div>

          {/* Search and Filters */}
          <div className="flex justify-between mb-6">
            <div className="relative w-64">
              <Input 
                placeholder="Search for User" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 border rounded-md" 
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Role</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="regular">Regular User</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white border rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 p-4 border-b">
              <div className="font-semibold">User</div>
              <div className="font-semibold">Status</div>
              <div className="font-semibold">Role</div>
              <div className="font-semibold text-right">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {users.map((user) => (
                <div key={user.id} className="grid grid-cols-4 p-4 items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className={`rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-[#F2FCE2] text-[#00a67d] border-[#00a67d]' 
                          : 'bg-[#FFEBEE] text-[#ea384c] border-[#ea384c]'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full inline-block mr-2 ${
                        user.status === 'Active' ? 'bg-[#00a67d]' : 'bg-[#ea384c]'
                      }`}></span>
                      {user.status}
                    </Badge>
                  </div>
                  <div>{user.role}</div>
                  <div className="text-right">
                    <Button 
                      variant="outline" 
                      className="bg-[#B2F2E5] hover:bg-[#A0E0D3] text-[#00a67d] border-none"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {/* <div className="mt-6 flex items-center justify-between"> */}
          <div className="mt-6 flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">Row</span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink className="bg-[#00a67d] text-white" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">10</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;