import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { Card, CardContent } from '../../../components/ui/card';
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./../../../store/store";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { updateUser } from "./../../../store/userSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle edit mode
  const [fullName, setFullName] = useState(user.fullName);
  // const [newEmail, setNewEmail] = useState(""); // State for new email input
  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    // password: "Your Password",
    description: user.description,
  });

  // const handleAddEmail = () => {
  //   if (newEmail) {
  //     setEmail(newEmail); // Update the email with the new value
  //     setNewEmail(""); // Clear the new email input
  //   }
  // };

  // Update user profile
  const handleSave = async () => {
    const userRef = doc(FIREBASE_FIRESTORE, `account/${user.email}`);

    try {
      await updateDoc(userRef, profileData);
      dispatch(updateUser({
        fullName: profileData.fullName,
        description: profileData.description,
      }));
      setFullName(profileData.fullName);
      toast.success("Profile Updated Successfully!");
      setIsEditMode(false);
    }
    catch (error: any) {
      toast.success("Fail To Update Profile!");
    }
  };

  const handleDiscard = () => {
    setProfileData({
      fullName: user.fullName,
      // password: "Your Password",
      description: user.description,
    })
    // setNewEmail(""); // Clear the new email input
    setIsEditMode(false); // Exit edit mode
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">Welcome, User</h1>
          <p className="text-sm text-gray-500">Tue, 07 June 2022</p>
        </div>
        <div className="flex items-center gap-4">

          <Bell className="w-5 h-5 text-gray-500" />
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt="Profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-16 min-h-screen bg-gray-100 flex flex-col items-center py-6 space-y-6">
          <div className="p-2 rounded-lg bg-teal-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          </div>
          <div className="p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatarUrl} alt="Alexa Rawles" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{fullName}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              {isEditMode ? (
                <div className="flex gap-4">
                  <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600">Save</Button>
                  <Button onClick={handleDiscard} variant="outline">Discard</Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditMode(true)} className="bg-teal-500 hover:bg-teal-600">Edit</Button>
              )}
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium mb-2">Full Name</h3>
                <Input
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className={`bg-gray-50 ${isEditMode ? "bg-white" : ""}`}
                  readOnly={!isEditMode}
                  required
                />
              </div>
              <div>
                <h3 className="font-medium mb-2">Password</h3>
                <Input
                  value={"Your Password"}
                  type="password"
                  className={`bg-gray-50 ${isEditMode ? "bg-white" : ""}`}
                  readOnly
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Description</h3>
              <TextArea
                value={profileData.description}
                onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                className={`bg-gray-50 min-h-[120px] ${isEditMode ? "bg-white" : ""}`}
                readOnly={!isEditMode}
              />
            </div>

            {/* Email Address */}
            <div>
              <h3 className="font-medium mb-4">Email Address</h3>
              <div className="mb-4">
                <Card className="border rounded-md">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* {isEditMode && (
                <div className="flex items-center gap-2">
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email"
                    className="text-sm"
                  />
                  <Button 
                    onClick={handleAddEmail} 
                    className="bg-teal-500 hover:bg-teal-600 text-xs"
                  >
                    Add
                  </Button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;