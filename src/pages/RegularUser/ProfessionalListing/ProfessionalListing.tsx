import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardContent } from '../../../components/ui/card';
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/Pagination';

const professionals = [
  {
    id: 1,
    title: "Create An LMS Website With LearnPress",
    category: "Mental Health & Well-Being",
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$125/hour",
    rating: 4,
  },
  {
    id: 2,
    title: "Create An LMS Website With LearnPress",
    category: "Pulmonology",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    price: "$125/hour",
    rating: 4,
  },
  {
    id: 3,
    title: "Create An LMS Website With LearnPress",
    category: "Orthopedics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "$125/hour",
    rating: 4,
  },
  {
    id: 4,
    title: "Create An LMS Website With LearnPress",
    category: "Neurology",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    price: "$125/hour",
    rating: 4,
  },
  {
    id: 5,
    title: "Create An LMS Website With LearnPress",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    price: "$125/hour",
    rating: 4,
  },
  {
    id: 6,
    title: "Create An LMS Website With LearnPress",
    category: "Nutrition & Lifestyle Advice",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    price: "$125/hour",
    rating: 4,
  },
];

function ProfessionalListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

        {/* Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {professionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden border rounded-lg shadow-sm">
              <div className="relative">
                <img
                  src={professional.image}
                  alt={professional.title}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-black text-white font-medium rounded-md">
                  {professional.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="mb-2 text-gray-500">{professional.price}</div>
                <h3 className="text-lg font-semibold mb-4">{professional.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex">{renderStarRating(professional.rating)}</div>
                  <span className="text-xs text-gray-500 ml-1">(120+ Reviews)</span>
                  <Button
                    variant="outline"
                    className="text-teal-600 border-teal-600 hover:bg-teal-50 hover:text-teal-700"
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProfessionalListing;