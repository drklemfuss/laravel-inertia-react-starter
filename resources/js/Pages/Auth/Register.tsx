import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/ui/input-error";
import AuthLayout from "@/layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        accept_terms: false,
    });

    const handleCheckboxChange = (checked: boolean) => {
        setData("accept_terms", checked);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("register"), {
            onFinish: () =>
                reset("password", "password_confirmation", "accept_terms"),
        });
    };

    return (
        <AuthLayout>
            <Head title="Register" />
            <div className="absolute top-2 z-0 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 bg-primary/50 rounded-full blur-3xl"></div>

            <form onSubmit={submit}>
                <div className="text-2xl font-semibold p-2">Create Account</div>
                <div className="text-lg p-2">
                    Welcome! Enter your information below to create your
                    account.
                </div>
                <div>
                    <Label
                        htmlFor="name"
                        className="text-sm text-muted-foreground"
                    >
                        User Name*
                    </Label>

                    <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Username123"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full bg-muted-foreground/10 border-primary/50 "
                        autoFocus
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
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
                <div className="mt-4 block p-2">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.accept_terms}
                            id="accept_terms"
                            onCheckedChange={handleCheckboxChange}
                        />
                        <span className="ms-2 text-sm text-muted-foreground">
                            I accept the terms and conditions and privacy policy
                        </span>
                    </label>
                    <InputError
                        message={errors.accept_terms}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="text-sm text-muted-foreground underline hover:text-foreground focus:ring-2 focus:ring-primary "
                    >
                        Already registered?
                    </Link>

                    <Button
                        className="ms-4 text-foreground font-bold bg-primary/50"
                        disabled={processing}
                    >
                        Register
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
