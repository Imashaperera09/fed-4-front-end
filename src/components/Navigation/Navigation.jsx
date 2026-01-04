import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import s from "./Navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className={"px-12 py-6 flex justify-between items-center " + s.nav}>
      <Link to="/" className={"flex items-center gap-4 group"}>
        <div className={"w-20 h-20 flex justify-center items-center overflow-hidden transition-transform duration-300 group-hover:scale-110"}>
          <img src="/assests/logo.png" alt="SolarNova Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-['Inter'] text-2xl font-extrabold tracking-tighter flex items-center">
          <span className="text-orange-500">Solar</span>
          <span className="text-blue-600">Nova</span>
        </span>
      </Link>

      <div className={"flex items-center gap-12"}>
        <Link to="/dashboard" className={"flex items-center gap-2 px-4 py-2"}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chart-column-icon lucide-chart-column logo w-4 h-4 block">
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span className="font-['Inter'] text-sm font-medium">Dashboard</span>
        </Link>

        <div className={"flex items-center gap-4"}>
          <ThemeToggle />
          <div className={"flex items-center gap-2"}>
            <SignedOut>
              <Button size="sm" onClick={() => navigate('/sign-in')}>
                Sign In
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
