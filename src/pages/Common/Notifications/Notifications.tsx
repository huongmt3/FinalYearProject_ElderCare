import toast from "react-hot-toast";
import { ROUTE_PATH } from '../../../routes/route-path';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Card, CardContent } from '../../../components/ui/card'
  import { Button } from '../../../components/ui/Button';
  import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
  } from '../../../components/ui/Pagination';
  import { ChevronLeft, ChevronRight } from "lucide-react";
  
  // Sample notification data
  const notificationData = [
    {
      id: 1,
      title: "New Schedule",
      description: "You Have A New Schedule With",
      date: "Today",
    },
    {
      id: 2,
      title: "New Schedule",
      description: "You Have A New Schedule With",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "New Schedule",
      description: "You Have A New Schedule With",
      date: "2 days ago",
    },
    {
      id: 4,
      title: "New Schedule",
      description: "You Have A New Schedule With",
      date: "3 days ago",
    },
    {
      id: 5,
      title: "New Schedule",
      description: "You Have A New Schedule With",
      date: "1 week ago",
    },
  ];
  
  function Notifications() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;
    
    // Calculate total pages
    const totalPages = Math.ceil(notificationData.length / itemsPerPage);
    
    // Get current notifications
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotifications = notificationData.slice(indexOfFirstItem, indexOfLastItem);
    
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Notifications</h1>
        
        <div className="space-y-4">
          {currentNotifications.map((notification) => (
            <Card key={notification.id} className="border border-gray-100 shadow-sm">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{notification.description}</p>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-transparent p-0">
                  View More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-8">
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
                    className={currentPage === index + 1 ? "bg-primary text-white" : ""}
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
        )}
      </div>
    );
  };
  
  export default Notifications;
