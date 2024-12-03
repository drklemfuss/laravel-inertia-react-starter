import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="current_password" className="sr-only">
                        Current Password
                    </Label>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    {errors.current_password && (
                        <Alert variant="destructive" className="mt-2">
                            {errors.current_password}
                        </Alert>
                    )}
                </div>

                <div>
                    <Label htmlFor="password" className="sr-only">
                        New Password
                    </Label>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    {errors.password && (
                        <Alert variant="destructive" className="mt-2">
                            {errors.password}
                        </Alert>
                    )}
                </div>

                <div>
                    <Label htmlFor="password_confirmation" className="sr-only">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    {errors.password_confirmation && (
                        <Alert variant="destructive" className="mt-2">
                            {errors.password_confirmation}
                        </Alert>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
