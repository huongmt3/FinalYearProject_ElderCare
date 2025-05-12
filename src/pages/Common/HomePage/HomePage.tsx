import { Link, useNavigate } from 'react-router-dom';
import doctorcare from '../../../assets/images/doctor-care.png';
import heart from '../../../assets/images/doctor-n-heart.png';
import hospital from '../../../assets/images/hospital.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { useEffect, useState } from 'react';
import { ROUTE_PATH } from '../../../routes/route-path';
import { FIREBASE_FIRESTORE } from '../../../utils/firebaseConfig';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';

function HomePage() {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<any>([]);

  useEffect(() => {
    if (user && user?.role === "admin") {
      navigate(ROUTE_PATH.ADMIN);
    }
    fetchAccounts();
  }, [user, navigate]);

  // Get professionals by role
  const fetchAccounts = async () => {
    try {
      const accountsColRef = collection(FIREBASE_FIRESTORE, "account");
      const q = query(accountsColRef, where("role", "==", "professional"), limit(6));
      const querySnapshot = await getDocs(q);

      const accountList = querySnapshot.docs.map(doc => (
        doc.data()
      ));
      setProfessionals(accountList);
    } catch (error) {
      console.error("Error getting accounts: ", error);
    }
  }

  // Go to appointment booking page, set state for the target page
  const handleNavigate = (professional: any) => {
    navigate(ROUTE_PATH.APPOINTMENT_BOOKING, {
      state: professional
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-gray-50 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 py-28 flex flex-col gap-7 md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-4xl md:text-4xl font-bold text-emerald-700 mb-3 leading-tight">
              Book Appointments With
              Trusted Healthcare Professionals
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              We provide seamless scheduling for seniors to connect with experienced doctors and healthcare specialists
            </p>
            {user?.role !== "professional" && <Link to={user ? ROUTE_PATH.PROFESSIONAL_LISTING : ROUTE_PATH.LOGIN} className="inline-flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors">
              Book An Appointment
            </Link>}
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            <img
              src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg"
              alt="Doctor with stethoscope"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Categories</h2>
              <p className="text-gray-500 mt-2">Explore our popular categories</p>
            </div>
            <Link to="#" className="px-4 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              All Categories
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'General Medicine', icon: '🩺' },
              { name: 'Cardiology', icon: '❤️' },
              { name: 'Neurology', icon: '🧠' },
              { name: 'Mental Health & Well-Being', icon: '😊' },
              { name: 'Endocrinology', icon: '⚕️' },
              { name: 'Pulmonology', icon: '🌬️' },
              { name: 'Urology & Nephrology', icon: '🧪' },
              { name: 'Otolaryngology', icon: '👂' },
              { name: 'Orthopedics', icon: '🦴' },
              { name: 'Nutrition & Lifestyle Advice', icon: '🥗' }
            ].map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-white border-2 border-gray-200 rounded-xl hover:shadow-xl duration-500 hover:cursor-pointer transition-all text-center hover:bg-emerald-600 hover:text-white"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      {user?.role !== "professional" && <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Professionals</h2>
              <p className="text-gray-500 mt-2">Explore our featured specialists</p>
            </div>
            <Link to={user ? ROUTE_PATH.PROFESSIONAL_LISTING : ROUTE_PATH.LOGIN} className="px-4 py-2 text-sm border border-gray-200
             bg-white rounded-full hover:bg-gray-50 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional: any, index: number) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm 
              hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    //src={`https://source.unsplash.com/random/400x300?doctor&sig=${index}`}
                    src={professional.avatarUrl}
                    alt="Doctor"
                    className="w-full h-48 object-cover"
                  />
                  {/* <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-xs
                   px-2 py-1 rounded">
                    {index % 2 === 0 ? 'Neurologist' : 'Cardiologist'}
                  </div> */}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Dr. {professional.fullName}</h3>
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' :
                        'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(120+ Reviews)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-primary font-medium">{professional.pricing + "/ hour"}</div>
                    <button className="text-sm text-primary hover:underline cursor-pointer"
                      onClick={() => handleNavigate(professional)}>View More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* Enhance Healthcare Experience */}
      {user?.role !== "professional" && <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="text-sm font-medium text-primary mb-2">WITH ELDERCARE, THERE'S A SOLUTION</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Enhance Your Healthcare Experience</h2>
                <p className="text-gray-600 mb-6">Get matched with the healthcare service that's perfectly designed for you. Schedule an appointment, visit your chosen provider, and get back to your wellbeing.</p>
                <Link to={user ? ROUTE_PATH.PROFESSIONAL_LISTING : ROUTE_PATH.LOGIN} className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                  Find A Professional
                </Link>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <img
                  src={doctorcare}
                  alt="Doctor with patient"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '31k+', label: 'Customers' },
              { value: '899', label: 'Top-Rated Appointments' },
              { value: '158', label: 'Professionals' },
              { value: '100%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find The Right Care Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={heart}
                alt="Doctor and heart illustration"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Find The Right Care<br />For Your Needs</h2>
              <p className="text-gray-600 mb-6">Get quickly connected to a leading healthcare network and professional experts, ensuring that we can enhance your medical consultations.</p>

              <div className="space-y-4 mb-6">
                {[
                  'Specialist Consultations',
                  'Personalized Treatment Plans',
                  'In-Home Health Checkups',
                  'Same Day/Next Day Appointments'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {user?.role !== "professional" && <Link to={user ? ROUTE_PATH.PROFESSIONAL_LISTING : ROUTE_PATH.LOGIN} className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700
               text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                Book An Appointment
              </Link>}
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Services */}
      {/* <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="text-sm font-medium text-primary mb-1">PREMIUM SERVICES</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Healthcare Services</h2>
                <p className="text-gray-600 mb-4 text-sm">The best level of health healthcare assistance. Get support from certified doctors, counselors.</p>
                <Link to="#" className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary font-medium rounded-md hover:bg-primary/5 transition-colors text-sm">
                  Find A Professional
                </Link>
              </div>
              <div className="md:w-1/2 md:pl-6">
                <img 
                  src={bluevector}
                  alt="Healthcare services" 
                  className="w-2/3 h-auto rounded-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Customer Feedbacks */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Customer Feedbacks</h2>
          <p className="text-center text-gray-500 mb-8">What people are saying about ElderCare</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  "I need to express my gratitude for the exceptional healthcare booking experience with ElderCare. The process was seamless, the doctors were top-notch, and I've improved my wellness as a result. I cannot recommend it enough to anyone who prioritizes good healthcare and satisfaction."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-500 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Alex Smith</div>
                    <div className="text-xs text-gray-500">Customer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      {user?.role !== "professional" && <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-white p-4 rounded-full mr-6">
                <img
                  src={hospital}
                  alt="Healthcare services"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Let's Start With ElderCare</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                <button >
                  <text className="mr-2">I'm A Customer</text>
                </button>
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-button-figma text-white font-medium rounded-md hover:bg-primary/90 transition-colors">
                <button>
                  <text className="mr-2">Become an Professional</text>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>}
    </div >
  );
}

export default HomePage;