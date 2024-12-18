import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/mode-toggle/theme-provider";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Moon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
            <Sun className="hidden h-5 w-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
