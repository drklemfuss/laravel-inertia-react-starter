import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/input-error";
import AuthLayout from "@/layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleCheckboxChange = (checked: boolean) => {
        setData("remember", checked);
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />
            <div className="absolute top-2 z-0 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 bg-primary/50 rounded-full blur-3xl"></div>

            <form onSubmit={submit}>
                <div className="text-2xl font-semibold p-2">Sign In</div>
                <div className="text-lg p-2">
                    Welcome Back! Please Sign In to your account.
                </div>
                <div className="p-2">
                    <Label
                        htmlFor="email"
                        className="text-sm text-muted-foreground "
                    >
                        Email
                    </Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="myemail@examle.com"
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4 p-2">
                    <Label
                        htmlFor="password"
                        className="text-sm text-muted-foreground"
                    >
                        Password
                    </Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={data.password}
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-4 block p-2">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            id="remember"
                            onCheckedChange={handleCheckboxChange}
                        />
                        <span className="ms-2 text-sm text-muted-foreground">
                            Remember me
                        </span>
                    </label>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-muted-foreground underline hover:text-foreground focus:ring-2 focus:ring-primary "
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button
                        className="ms-4 text-foreground font-bold bg-primary/50"
                        disabled={processing}
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
