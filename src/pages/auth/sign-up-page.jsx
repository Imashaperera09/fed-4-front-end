import { SignUp } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-background p-4 animate-in fade-in duration-700">
            <Button
                variant="ghost"
                onClick={() => navigate('/sign-in')}
                className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Login
            </Button>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                    <p className="text-muted-foreground">
                        Join <span className="text-orange-500">Solar</span><span className="text-blue-600">Nova</span> and start managing your energy
                    </p>
                </div>
                <SignUp signInUrl="/sign-in" />
            </div>
        </main>
    );
};

export default SignUpPage;
