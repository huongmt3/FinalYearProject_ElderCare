import React, { useEffect, useState } from "react";
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardContent } from '../../../components/ui/card';
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/Pagination';
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../routes/route-path";

const ITEMS_PER_PAGE = 6;

function ProfessionalListing() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Get professionals by role
  const fetchAccounts = async () => {
    try {
      const accountsColRef = collection(FIREBASE_FIRESTORE, "account");
      const q = query(accountsColRef, where("role", "==", "professional"));
      const querySnapshot = await getDocs(q);

      const accountList = querySnapshot.docs.map(doc => (
        doc.data()
      ));
      setProfessionals(accountList);
    } catch (error) {
      console.error("Error getting accounts: ", error);
    } finally {
      setLoading(false);
    }
  }

  // Filter professionals based on search term
  const filteredProfessionals = professionals.filter((professional: { fullName: string; }) =>
    professional.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Paginate the filtered professionals
  const currentProfessionals = filteredProfessionals.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const totalPages = Math.ceil(filteredProfessionals.length / ITEMS_PER_PAGE);

  // Go to appointment booking page, set state for the target page
  const handleNavigate = (professional: any) => {
    navigate(ROUTE_PATH.APPOINTMENT_BOOKING, {
      state: professional
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Professional</h1>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 pr-4 h-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {/* Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {currentProfessionals.map((professional: any) => (
            <Card key={professional.id} className="overflow-hidden border rounded-lg shadow-sm">
              <div className="relative">
                <img
                  src={professional.avatarUrl}
                  alt={professional.fullName}
                  className="w-full h-64 object-cover"
                />
                {/* <Badge className="absolute top-4 left-4 bg-black text-white font-medium rounded-md">
                  {professional.category}
                </Badge> */}
              </div>
              <CardContent className="p-6">
                <div className="mb-2 text-gray-500">{professional.pricing}</div>
                <h3 className="text-lg font-semibold mb-4">{professional.fullName}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex">{renderStarRating(5)}</div>
                  <span className="text-xs text-gray-500 ml-1">(120+ Reviews)</span>
                  <Button
                    variant="outline"
                    className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:text-teal-700"
                    onClick={() => handleNavigate(professional)}
                  >
                    View More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className={currentPage === index + 1 ? "bg-emerald-700 text-white" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProfessionalListing;
