import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/card';

function AppointmentBooking() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const availableTimes = [
    "8:15 - 9:00",
    "9:15 - 10:00",
    "10:15 - 11:00",
    "11:15 - 12:00",
    "14:15 - 15:00",
    "15:15 - 16:00",
    "16:15 - 17:00",
    "17:15 - 18:00",
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md inline-block mb-2">
              Mental Health & Well-Being
            </div>
            <div className="text-gray-500 text-sm mb-1">$125/hour</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              The Ultimate Guide To The Best WordPress LMS Plugin
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
                  src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Professional Service"
                  className="w-80 h-auto rounded-md mb-4"
                />
                <div className="text-gray-500 line-through text-sm mb-1">$160.0</div>
                <div className="text-red-500 text-lg font-bold mb-4">$125.0</div>
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
          <div className="mb-4">
            <Button variant="outline" className="text-sm">
              Select Date
            </Button>
            <span className="ml-4 text-sm text-gray-700">Friday, 21/03/2025</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {availableTimes.map((time, index) => (
              <Button
                key={index}
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
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
            Schedule
          </Button>
        </div>

        {/* Overview Section */}
        <div>
          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-4 bg-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-sm text-gray-700">
                LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of
                the best WordPress LMS Plugins which can be used to easily create & sell courses
                online. You can create a course curriculum with lessons & quizzes included which
                is managed with an easy-to-use interface for users. Having this WordPress LMS
                Plugin, now you have a chance to quickly and easily create education, online
                school, online-course websites with no coding knowledge required.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                LearnPress is free and always will be, but it is still a premium high-quality
                WordPress Plugin that definitely helps you with making money from your WordPress
                Based LMS. Just try and see how amazing it is. LearnPress WordPress Online Course
                plugin is lightweight and super powerful with lots of Add-Ons to empower its core
                system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBooking;