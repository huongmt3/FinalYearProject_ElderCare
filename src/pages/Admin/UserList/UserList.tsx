import { Search } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../components/ui/Pagination";
import { useEffect, useState } from "react";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

function UserList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [])

    const rowsPerPageNumber = parseInt(rowsPerPage, 10);

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPageNumber);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * rowsPerPageNumber,
        currentPage * rowsPerPageNumber
    );

    const fetchUsers = async () => {
        try {
            const usersRef = collection(FIREBASE_FIRESTORE, "account");
            const q = query(usersRef, where("role", "!=", "admin"));
            const querySnapshot = await getDocs(q);
            const userList = querySnapshot.docs.map(doc => (
                doc.data()
            ));
            userList.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            setUsers(userList);
        }
        catch (error) {
            console.error("Error fetching users: ", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        /* User List Content */
        < div className="flex-1 p-6" >
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when searching
                        }}
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

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <ClipLoader size={40} color="#4F46E5" />
                </div>) : (
                <div className="bg-white border rounded-md overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-gray-50 p-4 border-b">
                        <div className="font-semibold">User</div>
                        <div className="font-semibold">Status</div>
                        <div className="font-semibold">Role</div>
                        <div className="font-semibold text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y">
                        {paginatedUsers.map((user) => (
                            <div key={user.id} className="grid grid-cols-4 p-4 items-center">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.avatarUrl} />
                                        <AvatarFallback>
                                            {user.fullName.split(' ').map((n: any[]) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{user.fullName}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div>
                                    <Badge
                                        variant="outline"
                                        className={`rounded-full ${user.status === 'Active'
                                            ? 'bg-[#F2FCE2] text-[#00a67d] border-[#00a67d]'
                                            : 'bg-[#FFEBEE] text-[#ea384c] border-[#ea384c]'
                                            }`}
                                    >
                                        <span className={`h-2 w-2 rounded-full inline-block mr-2 ${user.status === 'Active' ? 'bg-[#00a67d]' : 'bg-[#ea384c]'
                                            }`}></span>
                                        {user.status}
                                    </Badge>
                                </div>
                                <div>{user.role === "user" ? "Regular User" : "Professional"}</div>
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
                </div>)}

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Show</span>
                    <Select value={rowsPerPage} onValueChange={(value) => {
                        setRowsPerPage(value);
                        setCurrentPage(1);
                    }}>
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
                        {/* Previous Button */}
                        {currentPage > 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(index + 1)}
                                    isActive={currentPage === index + 1}
                                    className="cursor-pointer"
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next Button */}
                        {currentPage < totalPages && (
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="cursor-pointer"
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>

            </div>
        </div >);
}

export default UserList;