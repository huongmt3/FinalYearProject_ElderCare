import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../../routes/route-path";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FIREBASE_AUTH } from "../../../utils/firebaseConfig";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "./../../../store/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      //Fetch user data from Firestore
      const userDocRef = doc(FIREBASE_FIRESTORE, "account", formData.email);
      await signInWithEmailAndPassword(FIREBASE_AUTH, formData.email, formData.password);

      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Set user info to redux store
        dispatch(setUser({
          email: userData.email,
          role: userData.role,
          fullName: userData.fullName,
          description: userData.description,
          pricing: userData.pricing,
          availableTimes: userData.availableTimes,
          avatarUrl: userData.avatarUrl,
        }));
        toast.success("Logged In Successfully!");
        navigate(userData.role === "admin" ? ROUTE_PATH.ADMIN : ROUTE_PATH.HOME);
      } else {
        toast.error("User data not found in Firestore!");
      }
    } catch (error: any) {
      toast.error("Failed to log in!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(FIREBASE_AUTH, provider);
      toast.success("Logged In Successfully!");
      navigate(ROUTE_PATH.HOME);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#00a67d]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-6 space-y-6 relative">
        <div>
          <h1 className="text-2xl font-bold text-center">Welcome Back to Eldercare</h1>
          {/* <p className="text-center text-gray-500 mt-1">Book and manage healthcare appointments for seniors effortlessly</p> */}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border p-3 rounded-md border-gray-300">
            <input
              type="email"
              name="email"
              placeholder="email@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="relative flex items-center border p-3 rounded-md border-gray-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 my-4">
            Or continue with
          </div>

          <button
            type="button"
            className="w-full flex gap-2 items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            Google Account
          </button>

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-[#00a67d] hover:bg-[#00a67d]/90 text-white rounded-md font-medium"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 mr-1">Don't have an account?</span>
            <Link
              to={ROUTE_PATH.SIGNUP}
              className="text-sm text-[#00a67d] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;