import React from 'react';
import logo from "../../assets/images/logo.svg";
import man from "../../assets/images/man.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  illustration?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
}) => {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 flex flex-col">
        <div className="lg:hidden mb-10">
        <img 
                  src={logo} 
                  alt="ElderCare Logo" 
                  width="240" 
                  height="240" 
                  className="object-contain"
                />          
        </div>
        <div className="w-full max-w-md mx-auto mt-8 lg:mt-16 animate-slide-up">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}
          
          {children}
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="h-full w-full relative">
          <img 
            src={man} 
            alt="Professional man with glasses"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;