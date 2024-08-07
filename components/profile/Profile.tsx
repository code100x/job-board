"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getProfile } from "@/actions/profile";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "@/hooks/useSession";

const Profile = () => {
    const { toast } = useToast();
    const router = useRouter();
    const { session, isSessionLoading } = useSession();
    const [user, setUser] = useState<any>(null); // Define a proper type based on your user data
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isSessionLoading) return;

        const fetchProfile = async () => {
            if (session?.user?.id) {
                try {
                    const response = await getProfile(session.user.id);
                    if (response.status === "success") {
                        setUser(response.data);
                    } else {
                        toast({
                            title: response.message || "Error",
                            variant: "destructive",
                        });
                        router.push("/login");
                    }
                } catch (error) {
                    toast({
                        title: "Failed to fetch profile",
                        variant: "destructive",
                    });
                    router.push("/login");
                } finally {
                    setIsLoading(false);
                }
            } else {
                toast({
                    title: "User not authenticated",
                    variant: "destructive",
                });
                router.push("/login");
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [session, isSessionLoading, toast, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 size={40} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-fit p-4 bg-white flex flex-col items-start gap-8 rounded-md shadow-lg border-t border-gray-200">
            <h3 className="text-lg text-gray-700 tracking-tight">User Profile</h3>
            {user ? (
                <div className="flex flex-col items-start gap-4">
                    {user.image && (
                        <img
                            src={user.image}
                            alt="Profile Picture"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    )}
                    <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-600"><strong>Full Name:</strong> {user.name}</p>
                    <p className="text-gray-600"><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
                    <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
                    {/* Add more user details if needed */}
                    <Button onClick={() => router.push("/edit-profile")} className="mt-4">
                        Edit Profile
                    </Button>
                </div>
            ) : (
                <p className="text-gray-600">No user profile found.</p>
            )}
        </div>
    );
};

export default Profile;
