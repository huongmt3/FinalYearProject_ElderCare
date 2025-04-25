import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../routes/route-path";
import toast from "react-hot-toast";
import { Eye, EyeOff, Upload } from "lucide-react";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import man from '../../../assets/images/man.png';
import { doc, getDoc } from "firebase/firestore";

// Role and Status types
const ROLES = {
  USER: "user",
  PROFESSIONAL: "professional",
  ADMIN: "admin"
} as const;

const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive"
} as const;

// Default avatar URL
const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=random&name=";

function Signup() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: ROLES.USER,
    status: STATUS.ACTIVE,
    acceptedTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDefaultAvatarUrl = (name: string) => {
    return DEFAULT_AVATAR + encodeURIComponent(name);
  };

  const saveUserToDatabase = async (userId: string, userData: any) => {
    try {
      const userRef = doc(FIREBASE_FIRESTORE, `account/${userId}`);
      await setDoc(userRef, {
        id: userId,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        avatarUrl: userData.avatarUrl || getDefaultAvatarUrl(userData.fullName),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error("Error saving user data:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      toast.error("Please accept the Terms and Conditions", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '16px',
        },
      });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        formData.email,
        formData.password
      );
      
      await saveUserToDatabase(userCredential.user.uid, {
        ...formData,
        avatarUrl: previewImage
      });
      
      toast.success("Welcome! Your account has been created successfully. Redirecting to homepage...", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4caf50',
          color: '#fff',
          padding: '16px',
        },
      });

      // Add a small delay before navigation to ensure the toast is visible
      setTimeout(() => {
        navigate(ROUTE_PATH.HOME);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '16px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!formData.acceptedTerms) {
      toast.error("Please accept the Terms and Conditions", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '16px',
        },
      });
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(FIREBASE_AUTH, provider);
      
      await saveUserToDatabase(result.user.uid, {
        fullName: result.user.displayName,
        email: result.user.email,
        role: formData.role,
        status: STATUS.ACTIVE,
        avatarUrl: result.user.photoURL
      });

      toast.success("Welcome! Your account has been created successfully with Google. Redirecting to homepage...", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4caf50',
          color: '#fff',
          padding: '16px',
        },
      });

      // Add a small delay before navigation to ensure the toast is visible
      setTimeout(() => {
        navigate(ROUTE_PATH.HOME);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '16px',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an account for free</h1>
            <p className="text-gray-500 text-sm">Free forever. No payment needed</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Full Name*</label>
              <div className="flex items-center border p-3 rounded-md border-gray-200 bg-gray-50">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Email*</label>
              <div className="flex items-center border p-3 rounded-md border-gray-200 bg-gray-50">
                <input
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Password*</label>
              <div className="relative flex items-center border p-3 rounded-md border-gray-200 bg-gray-50">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Role*</label>
              <div className="flex items-center border p-3 rounded-md border-gray-200 bg-gray-50">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                  required
                >
                  <option value={ROLES.USER}>User</option>
                  <option value={ROLES.PROFESSIONAL}>Healthcare Professional</option>
                </select>
              </div>
            </div>

            <div 
              className="border-2 border-dashed border-gray-200 rounded-md p-4 cursor-pointer hover:border-[#00a67d] transition-colors bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-sm text-gray-500">Upload your avatar here</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="acceptedTerms"
                id="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="w-4 h-4 text-[#00a67d] border-gray-200 rounded focus:ring-[#00a67d]"
              />
              <label htmlFor="acceptedTerms" className="text-xs text-gray-500">
                By creating an account you are agreeing to our{" "}
                <Link to="#" className="text-[#00a67d] hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-[#00a67d] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
              disabled={loading}
            >
              {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>
{/* 
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
              <div className="border-t border-gray-200 w-full"></div>
            </div> */}

            <button 
              type="button" 
              className="w-full flex gap-2 items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              onClick={handleGoogleSignup}
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-4 h-4" 
              />
              GOOGLE ACCOUNT
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">Already have an account? </span>
              <Link 
                to={ROUTE_PATH.LOGIN} 
                className="text-sm text-[#00a67d] hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block w-1/2">
        <img 
          src={man} 
          alt="Professional" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Signup;