import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/Button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../../components/ui/Pagination';
import { AppState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { FIREBASE_FIRESTORE } from '../../../utils/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../routes/route-path';

function Notifications() {
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  // Get current notifications
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // get notifications based on current user
  const fetchNotifications = async () => {
    try {
      const notificationsRef = collection(FIREBASE_FIRESTORE, "notification");
      const q = query(notificationsRef, where("sentTo", "==", user.email));
      const querySnapshot = await getDocs(q);
      const notificationList = querySnapshot.docs.map(doc => (
        doc.data()
      ));
      notificationList.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setNotifications(notificationList);
    }
    catch (error) {
      console.error("Error fetching appointments: ", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Notifications</h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader size={40} color="#4F46E5" />
        </div>
      ) : (
        <div className="space-y-4">
          {currentNotifications.map((notification) => (
            <Card key={notification.id} className="border border-gray-100 shadow-sm">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{notification.content}</p>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary/90 hover:bg-transparent p-0 cursor-pointer"
                  onClick={() => navigate(ROUTE_PATH.APPOINTMENTS)}>
                  View More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>)}

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
