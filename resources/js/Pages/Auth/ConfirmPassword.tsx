import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import AuthLayout from "@/layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />
            <div className="absolute top-2 z-0 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 bg-primary/50 rounded-full blur-3xl"></div>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label
                        htmlFor="password"
                        className="block text-sm text-gray-700 dark:text-gray-300"
                    >
                        Password
                    </Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoFocus
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    {errors.password && (
                        <Alert variant="destructive" className="mt-2">
                            {errors.password}
                        </Alert>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        className="ms-4 text-foreground font-bold bg-primary/50"
                        disabled={processing}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
