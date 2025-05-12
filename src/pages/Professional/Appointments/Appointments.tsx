import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from '../../../components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select";
import { ClipLoader } from 'react-spinners';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { Status } from "../../../models/enums/status.enum";
import toast from "react-hot-toast";
import { ROUTE_PATH } from "../../../routes/route-path";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<keyof typeof Status | "All">("All");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<number, Status>>({} as Record<number, Status>);

  const user = useSelector((state: AppState) => state.user);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Completed: return "text-green-600";
      case Status.Confirmed: return "text-blue-600";
      case Status.Pending: return "text-orange-500";
      case Status.NoShow: return "text-red-600";
      default: return "";
    }
  };

  const getStatusDot = (status: Status) => {
    switch (status) {
      case Status.Completed: return "bg-green-600";
      case Status.Confirmed: return "bg-blue-600";
      case Status.Pending: return "bg-orange-500";
      case Status.NoShow: return "bg-red-600";
      default: return "";
    }
  };

  // set status options for filter dropdown
  const statusOptions = [
    { label: "All", value: "All" },
    ...Object.keys(Status)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        label: key === "NoShow" ? "No-Show" : key,
        value: key,
      }))
  ];

  // get status options base on current appointment status
  const getAvailableStatusOptions = (currentStatus: Status) => {
    // TODO: when user chage appointment date, reverse status to Pending
    // Only allowing changes for Pending and Confirmed date
    switch (currentStatus) {
      case Status.Pending:
        return [
          { label: "Pending", value: "Pending" },
          { label: "Confirmed", value: "Confirmed" },
        ];
      case Status.Confirmed:
        return [
          { label: "Confirmed", value: "Confirmed" },
          { label: "Completed", value: "Completed" },
          { label: "No-Show", value: "No-Show" },
        ];
      case Status.Completed:
        return [
          { label: "Completed", value: "Completed" },
          { label: "No-Show", value: "No-Show" },
        ];
      case Status.NoShow:
        return [
          { label: "No-Show", value: "No-Show" },
          { label: "Completed", value: "Completed" },
        ];
      default:
        return [];
    }
  }

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = user.role === "professional"
      ? appointment.userFullName.toLowerCase().includes(searchQuery.toLowerCase())
      : appointment.profFullName.toLowerCase().includes(searchQuery.toLowerCase());
    const normalizedStatusFilter = statusFilter?.replace(/[\s-]/g, "");
    const matchesStatus = statusFilter && statusFilter !== "All"
      ? Status[normalizedStatusFilter as keyof typeof Status] === appointment.status
      : true;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculation
  const totalRows = filteredAppointments.length;
  const pageSize = parseInt(rowsPerPage, 10);
  const totalPages = Math.ceil(totalRows / pageSize);

  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  // get appointments info
  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(FIREBASE_FIRESTORE, "schedule");

      const q = query(appointmentsRef, where(user.role === "professional" ?
        "profEmail" : "userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      const appointmentList = querySnapshot.docs.map(doc => (
        doc.data()
      ));
      appointmentList.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
      setAppointments(appointmentList);

      // save appointment id with correspoding status in Record object
      if (user.role === "professional") {
        setSelectedStatuses(appointmentList.reduce((acc, appointment) => {
          acc[appointment.id] = appointment.status;
          return acc;
        }, {} as Record<number, Status>));
      }
    } catch (error) {
      console.error("Error getting appointments: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  //update appointment status
  const handleStatusChange = async (appointmentId: number, newStatus: Status) => {
    try {
      const appointmentRef = doc(FIREBASE_FIRESTORE, "schedule", String(appointmentId));
      await updateDoc(appointmentRef, {
        status: newStatus,
      });
      fetchAppointments();
      toast.success("Appointment Status Updated Successfully!");
    }
    catch {
      toast.error("Failed To Update Appointment Status!");
    }
  };

  // create notification for user about appointment status change
  const createNotificationForUser = async (appointment: any, newStatus: Status) => {
    try {
      const id = crypto.randomUUID();
      const notificationRef = doc(FIREBASE_FIRESTORE, `notification/${id}`);
      await setDoc(notificationRef, {
        id: id,
        sentTo: appointment.userEmail,
        personRelated: user.email,
        title: "Appointment Updated",
        content: `${appointment.profFullName} has updated status of the appointment on ${appointment.date} at ${appointment.time} to ${formatStatus(newStatus)}.`,
        createdAt: new Date().toISOString(),
      });
    }
    catch {
      console.log("Failed to create notification: New-Appointment for user.");
    }
  }

  // convert status enum to string
  const formatStatus = (status: Status) => {
    switch (status) {
      case Status.NoShow:
        return "No-Show";
      default:
        return Status[status];
    }
  }

  // convert string to enum status
  const toStatusEnum = (value: string): Status => {
    const normalized = value.replace(/[\s-]/g, "") as keyof typeof Status;
    return Status[normalized];
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // khi search reset về trang 1
              }}
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          </div>
          <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value as "All" | keyof typeof Status); setCurrentPage(1); }}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border rounded-md shadow-md">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <ClipLoader size={40} color="#4F46E5" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {user.role !== "user" && <TableHead>User</TableHead>}
                {user.role !== "professional" && <TableHead>Professional</TableHead>}
                <TableHead>Time</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                {user.role === "professional" && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  {user.role !== "user" && <TableCell onClick={() => {
                    navigate(ROUTE_PATH.PROFESSIONAL_USERPROFILE, {
                      state: appointment.userEmail
                    })
                  }}>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={appointment.userAvatarUrl} alt={appointment.userFullName} />
                        <AvatarFallback className="bg-gray-200">
                          {appointment.userFullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.userFullName}</span>
                    </div>
                  </TableCell>}
                  {user.role !== "professional" && <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={appointment.profAvatarUrl} alt={appointment.profFullName} />
                        <AvatarFallback className="bg-gray-200">
                          {appointment.profFullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.profFullName}</span>
                    </div>
                  </TableCell>}
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    {user.role !== "professional" && <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(appointment.status)}`}></div>
                      <span className={getStatusColor(appointment.status)}>
                        {formatStatus(appointment.status)}
                      </span>
                    </div>}
                    {user.role === "professional" && <Select
                      value={formatStatus(selectedStatuses[appointment.id])}
                      onValueChange={(value) =>
                        // set status of particular appointment based on id
                        setSelectedStatuses(prev => ({
                          ...prev,
                          [appointment.id]: toStatusEnum(value)
                        }))
                      }
                    >
                      <SelectTrigger className="w-32">
                        <div className={`w-full text-left ${getStatusColor(selectedStatuses[appointment.id])}`}>
                          {formatStatus(selectedStatuses[appointment.id])}
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        {getAvailableStatusOptions(appointment.status).map((option) => (
                          <SelectItem key={option.value} value={option.value} className={getStatusColor(toStatusEnum(option.label))}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>}
                  </TableCell>
                  {user.role === "professional" && <TableCell className="text-right">
                    <Button className="bg-[#90E0C9] hover:bg-[#7DCBB4] text-black" variant="secondary"
                      onClick={() => {
                        handleStatusChange(appointment.id, selectedStatuses[appointment.id]);
                        createNotificationForUser(appointment, selectedStatuses[appointment.id]);
                      }
                      }>
                      Update
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
              {currentAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <Select value={rowsPerPage} onValueChange={handleRowsPerPageChange}>
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
          <span className="text-sm text-gray-500">Rows</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Appointments;
