import { SetStateAction, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/card';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FIREBASE_FIRESTORE } from '../../../utils/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { Status } from '../../../models/enums/status.enum';
import toast from 'react-hot-toast';

function AppointmentBooking() {
  const location = useLocation();

  const [professional, setProfessional] = useState(location.state || {});
  const [availableTimes, setAvailableTimes] = useState(professional.availableTimes);
  const user = useSelector((state: AppState) => state.user);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const availableTimes = [
  //   "8:15 - 9:00",
  //   "9:15 - 10:00",
  //   "10:15 - 11:00",
  //   "11:15 - 12:00",
  //   "14:15 - 15:00",
  //   "15:15 - 16:00",
  //   "16:15 - 17:00",
  //   "17:15 - 18:00",
  // ];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      resetAvailableTimes(convertToDbDate(date));
    }
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
    : '';

  const convertToDbDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCreateSchedule = async () => {
    try {
      const id = crypto.randomUUID();
      const scheduleRef = doc(FIREBASE_FIRESTORE, `schedule/${id}`);
      if (!selectedDate || !selectedTime || selectedTime === '') {
        toast.error("Please fill in date and time!");
        return;
      }
      await setDoc(scheduleRef, {
        id: id,
        userEmail: user.email,
        userFullName: user.fullName,
        profEmail: professional.email,
        profFullName: professional.fullName,
        date: convertToDbDate(selectedDate),
        time: selectedTime,
        status: Status.Pending,
      });
      resetAvailableTimes(convertToDbDate(selectedDate));
      toast.success("Appointment Booked Successfully!");
      // const userDocRef = doc(FIREBASE_FIRESTORE, "account", professional.email);
      // const userDoc = await getDoc(userDocRef);
      // setProfessional(userDoc.data());
    } catch {
      toast.error("Failed To Book An Appointment!");
    }
  };

  const resetAvailableTimes = async (dbDate: string) => {
    try {
      console.log("reset");

      const schedulesRef = collection(FIREBASE_FIRESTORE, "schedule");
      let queryConditions = [
        where("profEmail", "==", professional.email),
        where("userEmail", "==", user.email),
      ];

      queryConditions.push(
        where("date", "==", dbDate)
      );
      const q = query(schedulesRef, ...queryConditions);
      const schedules = await getDocs(q);
      const bookedTimes = schedules.docs.map(doc => (doc.data().time));
      setAvailableTimes(professional.availableTimes.filter((item: string) => !bookedTimes.includes(item)));
    }
    catch {
      console.log("Failed to get available times");
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            {/* <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md inline-block mb-2">
              Mental Health & Well-Being
            </div> */}
            <div className="text-gray-500 text-sm mb-1">{professional.pricing}/hour</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {professional.fullName}
            </h1>
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★★★★☆</span>
              <span className="text-xs text-gray-500 ml-1">(120+ Reviews)</span>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <Card className="border rounded-lg shadow-sm">
              <CardContent className="p-4">
                <img
                  src={professional.avatarUrl}
                  alt="Professional Service"
                  className="w-80 h-auto rounded-md mb-4"
                />
                {/* <div className="text-gray-500 line-through text-sm mb-1">$160.0</div> */}
                <div className="text-red-500 text-lg font-bold mb-4">{professional.pricing}</div>
                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                  Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Booking</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your email address will not be published. Required fields are marked *
          </p>
          <div className="mb-4 flex items-center">
            {/* <Button variant="outline" className="text-sm">
              Select Date
            </Button>
            <span className="ml-4 text-sm text-gray-700">Friday, 21/03/2025</span> */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="text-sm text-teal-600 border-teal-600 border-2 rounded-md px-4 py-2 cursor-pointer hover:bg-teal-50 focus:outline-none"
              customInput={<button className="w-full text-sm text-teal-600 border-teal-600 border-2 rounded-md px-4 py-2 hover:bg-teal-50 focus:outline-none">Select Date</button>}
            />
            <span className="ml-4 text-sm text-gray-700">{formattedDate}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {availableTimes && availableTimes.map((time: string) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className={`text-sm ${selectedTime === time
                  ? "bg-emerald-600 text-white"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4">Choose the suitable hour ($0)</p>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleCreateSchedule}>
            Schedule
          </Button>
        </div>

        {/* Overview Section */}
        <div>
          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-4 bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-sm text-gray-700">
                {professional.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBooking;