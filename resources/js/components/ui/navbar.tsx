import type { PageProps, User } from "@/types";
import { Crown, Github, Menu } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./sheet";
import { Separator } from "./separator";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./navigation-menu";
import { Button } from "./button";
import { Link, usePage } from "@inertiajs/react";
import { ModeToggle } from "../mode-toggle/mode-toggle";

interface RouteProps {
    href: string;
    label: string;
}

interface FeatureProps {
    title: string;
    description: string;
}

const routeList: RouteProps[] = [
    {
        href: "/#testimonials",
        label: "Testimonials",
    },
    {
        href: "/#team",
        label: "Team",
    },
    {
        href: "/#contact",
        label: "Contact",
    },
    {
        href: "/#faq",
        label: "FAQ",
    },
];

const featureList: FeatureProps[] = [
    {
        title: "Showcase Your Value ",
        description: "Highlight how your product solves user problems.",
    },
    {
        title: "Build Trust",
        description:
            "Leverages social proof elements to establish trust and credibility.",
    },
    {
        title: "Capture Leads",
        description:
            "Make your lead capture form visually appealing and strategically.",
    },
];

export function Navbar() {
    const { auth } = usePage().props;
    console.log(auth); // Delete
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
            <Link href="/" className="font-bold text-lg flex items-center">
                <Crown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                Shadcn Inertia
            </Link>
            {/* <!-- Mobile --> */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                    >
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Link
                                        href="/"
                                        className="flex items-center"
                                    >
                                        <Crown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                                        Shadcn Inertia
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2">
                                {auth && auth.user ? (
                                    <Button
                                        key={route("dashboard")}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="default"
                                        className="justify-start text-base"
                                    >
                                        <Link
                                            href={route("dashboard")}
                                            className="justify-start text-base"
                                        >
                                            Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        key={route("login")}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="default"
                                        className="justify-start text-base"
                                    >
                                        <Link
                                            href={route("login")}
                                            className="justify-start font-extrabold"
                                        >
                                            Log In
                                        </Link>
                                    </Button>
                                )}
                                {routeList.map(({ href, label }) => (
                                    <Button
                                        key={href}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="ghost"
                                        className="justify-start font-extrabold"
                                    >
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                            <Separator className="mb-2" />

                            <ModeToggle />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* <!-- Desktop --> */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-card text-base">
                            Features
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                                <img
                                    src="https://avatars.githubusercontent.com/u/75042455?v=4"
                                    alt="RadixLogo"
                                    className="h-full w-full rounded-md object-cover"
                                    width={600}
                                    height={600}
                                />
                                <ul className="flex flex-col gap-2">
                                    {featureList.map(
                                        ({ title, description }) => (
                                            <li
                                                key={title}
                                                className="rounded-md p-3 text-sm hover:bg-muted"
                                            >
                                                <p className="mb-1 font-semibold leading-none text-foreground">
                                                    {title}
                                                </p>
                                                <p className="line-clamp-2 text-muted-foreground">
                                                    {description}
                                                </p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link href={href} className="text-base px-2">
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex">
                <ModeToggle />

                <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    aria-label="View on GitHub"
                >
                    <Link
                        aria-label="View on GitHub"
                        href="https://github.com/nobruf/shadcn-landing-page.git"
                        target="_blank"
                    >
                        <Github className="size-5" />
                    </Link>
                </Button>
                {auth && auth.user ? (
                    <Button
                        key={route("dashboard")}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="justify-start text-base"
                    >
                        <Link
                            href={route("dashboard")}
                            className="justify-start text-base"
                        >
                            Dashboard
                        </Link>
                    </Button>
                ) : (
                    <Button
                        key={route("login")}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="justify-start text-base"
                    >
                        <Link
                            href={route("login")}
                            className="justify-start font-extrabold"
                        >
                            Log In
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
