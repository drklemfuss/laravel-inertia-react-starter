import { Home, Inbox } from "lucide-react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "../ui/application-logo";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: route("dashboard"),
        icon: Home,
    },
    {
        title: "Tasks",
        url: route("tasks.index"), // "/Tasks",
        icon: Inbox,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                    <div className="flex">
                        <div className="flex shrink-0 items-center flex-row gap-2">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-primary text-foreground" />
                            </Link>
                            <span className="font-bold text-primary text-xl">
                                Inertia-Shadcn
                            </span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key="Onboarding">
                                <SidebarMenuButton asChild>
                                    <Link href={route("dashboard")}>
                                        <span>Onboarding</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
