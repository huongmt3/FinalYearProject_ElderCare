// import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/Avatar";
import { Input } from "../../../components/ui/Input";
import { TextArea } from "../../../components/ui/TextArea";
import { Card, CardContent } from "../../../components/ui/card";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FIREBASE_FIRESTORE } from "../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function ProfessionalUserProfile() {
    const location = useLocation();
    const userEmail = location.state;
    const [user, setUser] = useState<any>({});
    console.log(userEmail);

    useEffect(() => { getUserInfo(); }, []);

    const getUserInfo = async () => {
        try {
            const userRef = doc(FIREBASE_FIRESTORE, `account/${userEmail}`);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setUser(userDoc.data());
            }
        }
        catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-background">
                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Profile Header */}
                        <div className="flex items-center gap-6 mb-8">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={user?.avatarUrl} alt="Alexa Rawles" />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="font-medium mb-2">Full Name</h3>
                                <Input
                                    value={user.fullName}
                                    className={"bg-gray-50"}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="font-medium mb-2">Description</h3>
                            <TextArea
                                value={user.description}
                                className={"bg-gray-50 min-h-[120px]"}
                                readOnly
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
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ProfessionalUserProfile;