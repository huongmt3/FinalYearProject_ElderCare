import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

const Footer = () => {
 
  return (
    <footer className="w-full bg-eldercare-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                <img 
                  src={logo} 
                  alt="ElderCare Logo" 
                  width="240" 
                  height="240" 
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Get Help Column */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-black font-bold text-lg mb-4">GET HELP</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs Column */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-black font-bold text-lg mb-4">PROGRAMS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs/art-design" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  Art & Design
                </Link>
              </li>
              <li>
                <Link to="/programs/business" className="text-eldercare-green hover:text-eldercare-green/80 transition-colors duration-300 font-medium">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/programs/it-software" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  IT & Software
                </Link>
              </li>
              <li>
                <Link to="/programs/languages" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  Languages
                </Link>
              </li>
              <li>
                <Link to="/programs/programming" className="text-gray-600 hover:text-eldercare-green transition-colors duration-300">
                  Programming
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-black font-bold text-lg mb-4">CONTACT US</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA
              </p>
              <p className="text-gray-600">Tel: + (123) 2500-567-8988</p>
              <p className="text-gray-600">Mail: supportlms@gmail.com</p>
              
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eldercare-green transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eldercare-green transition-all duration-300 transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6"></path>
                    <circle cx="12" cy="6" r="4"></circle>
                    <path d="M12 10v8"></path>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eldercare-green transition-all duration-300 transform hover:scale-110"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eldercare-green transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-eldercare-green transition-all duration-300 transform hover:scale-110"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            Copyright ©2024 StevilSquad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;