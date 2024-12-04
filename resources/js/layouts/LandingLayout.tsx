import { PropsWithChildren } from "react";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/mode-toggle/theme-provider";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex min-h-screen flex-col items-center bg-background pt-6 px-6 w-full justify-center sm:pt-0 overflow-hidden ">
                <Navbar />
                {children}
            </div>
        </ThemeProvider>
    );
}
