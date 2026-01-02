import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-accent/20"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 text-indigo-600 animate-in zoom-in duration-300" />
            ) : (
                <Sun className="h-5 w-5 text-yellow-400 animate-in zoom-in duration-300" />
            )}
        </Button>
    );
}
