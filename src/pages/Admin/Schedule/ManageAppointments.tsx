import { ClipLoader } from "react-spinners";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { Status } from "../../../models/enums/status.enum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../components/ui/Pagination";
import { Input } from "../../../components/ui/Input";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";

function ManageAppointments() {
    const [searchQuery, setSearchQuery] = useState("");
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState("10");
    const [statusFilter, setStatusFilter] = useState<keyof typeof Status | "All">("All");

    // Filter appointments
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch = appointment.userFullName.toLowerCase().includes(searchQuery.toLowerCase())
            || appointment.profFullName.toLowerCase().includes(searchQuery.toLowerCase());
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

    const currentAppointments = filteredAppointments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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

    // convert status enum to string
    const formatStatus = (status: Status) => {
        switch (status) {
            case Status.NoShow:
                return "No-Show";
            default:
                return Status[status];
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    // get appointments info
    const fetchAppointments = async () => {
        try {
            const appointmentsRef = collection(FIREBASE_FIRESTORE, "schedule");

            const querySnapshot = await getDocs(appointmentsRef);

            const appointmentList = querySnapshot.docs.map(doc => (
                doc.data()
            ));
            appointmentList.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
            console.log(appointmentList);

            setAppointments(appointmentList);
        } catch (error) {
            console.error("Error getting appointments: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        < div className="flex-1 p-6" >
            <div className="flex justify-between items-center mb-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Appointment List</h1>
                    <p className="text-gray-500">View all Appointments</p>
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
                                <TableHead>User</TableHead>
                                <TableHead>Professional</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={appointment.userAvatarUrl} alt={appointment.userFullName} />
                                                <AvatarFallback className="bg-gray-200">
                                                    {appointment.userFullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{appointment.userFullName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={appointment.profAvatarUrl} alt={appointment.profFullName} />
                                                <AvatarFallback className="bg-gray-200">
                                                    {appointment.profFullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{appointment.profFullName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{appointment.time}</TableCell>
                                    <TableCell>{appointment.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${getStatusDot(appointment.status)}`}></div>
                                            <span className={getStatusColor(appointment.status)}>
                                                {formatStatus(appointment.status)}
                                            </span>
                                        </div>
                                    </TableCell>
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

export default ManageAppointments;
