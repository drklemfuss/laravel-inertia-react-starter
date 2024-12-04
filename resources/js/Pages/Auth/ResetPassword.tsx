import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/ui/input-error";
import AuthLayout from "@/layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthLayout>
            <Head title="Reset Password" />
            <div className="absolute top-2 z-0 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 bg-primary/50 rounded-full blur-3xl"></div>

            <form onSubmit={submit}>
                <div>
                    <Label
                        htmlFor="email"
                        className="text-sm text-muted-foreground"
                    >
                        Email*
                    </Label>

                    <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="myemail@example.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoFocus
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label
                        htmlFor="password"
                        className="text-sm text-muted-foreground"
                    >
                        Password*
                    </Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="********"
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoFocus
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label
                        htmlFor="password_confirmation"
                        className="text-sm text-muted-foreground"
                    >
                        Confirm Password*
                    </Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="********"
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoFocus
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        className="ms-4 text-foreground font-bold bg-primary/50"
                        disabled={processing}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
