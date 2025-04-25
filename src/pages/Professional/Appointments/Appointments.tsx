import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from '../../../components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage }
 from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/Pagination';
import { Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow, } from '../../../components/ui/Table';
import { Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue } from "../../../components/ui/Select";

interface Appointment {
  id: number;
  user: string;
  userImage: string;
  time: string;
  date: string;
  status: "Completed" | "Confirmed" | "Pending" | "No-Show";
}

function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  
  const appointments: Appointment[] = [
    {
      id: 1,
      user: "Ma Thu Huong",
      userImage: "",
      time: "11:15 - 12:00",
      date: "July 1, 2024",
      status: "Completed",
    },
    {
      id: 2,
      user: "Ma Thu Huong",
      userImage: "",
      time: "11:15 - 12:00",
      date: "July 25, 2024",
      status: "Confirmed",
    },
    {
      id: 3,
      user: "Ma Thu Huong",
      userImage: "",
      time: "11:15 - 12:00",
      date: "August 1, 2024",
      status: "Pending",
    },
    {
      id: 4,
      user: "Ma Thu Huong",
      userImage: "",
      time: "11:15 - 12:00",
      date: "August 22, 2024",
      status: "No-Show",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600";
      case "Confirmed":
        return "text-blue-600";
      case "Pending":
        return "text-orange-500";
      case "No-Show":
        return "text-red-600";
      default:
        return "";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "Confirmed":
        return "bg-blue-600";
      case "Pending":
        return "bg-orange-500";
      case "No-Show":
        return "bg-red-600";
      default:
        return "";
    }
  };

  // Filter appointments based on search query and status filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? appointment.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-gray-500">View and manage your appointments</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                className="pl-10 w-64"
                placeholder="Search for User"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="No-Show">No-Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={appointment.userImage} alt={appointment.user} />
                      <AvatarFallback className="bg-gray-200">
                        {appointment.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{appointment.user}</span>
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(appointment.status)}`}></div>
                      <span className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button className="bg-[#90E0C9] hover:bg-[#7DCBB4] text-black" variant="secondary">
                      Change
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center pt-2">
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
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
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
  );
};

export default Appointments;