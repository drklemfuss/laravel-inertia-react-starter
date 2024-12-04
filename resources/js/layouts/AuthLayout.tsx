import ApplicationLogo from "@/components/ui/application-logo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/mode-toggle/theme-provider";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center bg-background pt-6 w-full justify-center sm:pt-0">
                <div className="w-full flex justify-center">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-foreground" />
                    </Link>
                </div>

                <div className="mt-6 justify-center overflow-hidden bg-muted p-6 shadow-lg sm:rounded-lg shadow-primary/50">
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
}
