import { SignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, User as UserIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SignInPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear bypass on mount to ensure fresh state
        localStorage.removeItem('admin_bypass');
    }, []);

    const handleAdminBypass = () => {
        localStorage.setItem('admin_bypass', 'true');
        navigate('/dashboard/admin');
    };

    if (selectedRole) {
        return (
            <main className="flex flex-col justify-center items-center min-h-screen bg-background p-4 animate-in fade-in duration-500">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedRole(null)}
                    className="mb-8 self-center flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Role Selection
                </Button>

                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">
                            {selectedRole === 'admin' ? 'Administrator Login' : 'User Login'}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Please sign in to access your {selectedRole === 'admin' ? 'Admin Portal' : 'Dashboard'}
                        </p>
                    </div>
                    <SignIn
                        afterSignInUrl={selectedRole === 'admin' ? '/dashboard/admin' : '/dashboard'}
                        signUpUrl="/sign-up"
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-background p-4 animate-in fade-in duration-700">
            <div className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                    Welcome to <span className="text-orange-500">Solar</span><span className="text-blue-600">Nova</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    Choose your access level to continue to the platform
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Admin Card */}
                <Card
                    className="group cursor-pointer border-2 border-transparent hover:border-orange-500 transition-all duration-300 hover:shadow-2xl bg-card/50 backdrop-blur-sm"
                    onClick={handleAdminBypass}
                >
                    <CardHeader className="text-center pt-8">
                        <div className="mx-auto w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck size={40} className="text-orange-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Administrator</CardTitle>
                        <CardDescription className="text-base">
                            Manage solar units, users, and system analytics
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8 text-center">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 rounded-xl">
                            Login as Admin
                        </Button>
                    </CardContent>
                </Card>

                {/* User Card */}
                <Card
                    className="group cursor-pointer border-2 border-transparent hover:border-blue-600 transition-all duration-300 hover:shadow-2xl bg-card/50 backdrop-blur-sm"
                    onClick={() => setSelectedRole('user')}
                >
                    <CardHeader className="text-center pt-8">
                        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <UserIcon size={40} className="text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Standard User</CardTitle>
                        <CardDescription className="text-base">
                            View your solar production and manage your units
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8 text-center">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                            Login as User
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <p className="mt-12 text-muted-foreground text-sm">
                Don't have an account? <a href="/sign-up" className="text-primary font-bold hover:underline">Sign up here</a>
            </p>
        </main>
    );
};

export default SignInPage;