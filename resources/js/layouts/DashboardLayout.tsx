import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/components/ui/application-logo";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ThemeProvider } from "@/components/mode-toggle/theme-provider";
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface BreadcrumbItemProps {
    display: string;
    href?: string;
}

interface DashboardLayoutProps extends PropsWithChildren {
    header?: ReactNode;
    breadcrumbs?: BreadcrumbItemProps[];
}

export default function DashboardLayout({
    header,
    children,
    breadcrumbs = [],
}: DashboardLayoutProps) {
    const user = usePage().props.auth.user;

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar />

                <div className="min-h-screen bg-background w-full">
                    <nav className="border-b border-primary/50 bg-gradient-to-r from-transparent via-primary/50 to-primary/80">
                        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-end">
                                <div className="hidden sm:ms-6 sm:flex sm:items-center gap-2">
                                    <ModeToggle />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="font-bold"
                                            >
                                                {user.name}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    method="post"
                                                    href={route("logout")}
                                                >
                                                    Log Out
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <header className="bg-muted">
                        {header && (
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        )}
                        {breadcrumbs.length > 0 && (
                            <div className="bg-muted py-2">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            {breadcrumbs.map(
                                                (breadcrumb, index) => (
                                                    <BreadcrumbItem key={index}>
                                                        {breadcrumb.href ? (
                                                            <Link
                                                                href={
                                                                    breadcrumb.href
                                                                }
                                                            >
                                                                {
                                                                    breadcrumb.display
                                                                }
                                                            </Link>
                                                        ) : (
                                                            <BreadcrumbPage>
                                                                {
                                                                    breadcrumb.display
                                                                }
                                                            </BreadcrumbPage>
                                                        )}
                                                        {index <
                                                            breadcrumbs.length -
                                                                1 && (
                                                            <BreadcrumbSeparator />
                                                        )}
                                                    </BreadcrumbItem>
                                                )
                                            )}
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>
                        )}
                    </header>

                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
}
