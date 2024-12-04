import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Dialog>
                <DialogTrigger>
                    <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogClose className="absolute top-4 right-4" />
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex flex-col w-full">
                                <form onSubmit={deleteUser} className="p-6">
                                    <div className="mt-6 w-full">
                                        <Label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Password
                                        </Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            ref={passwordInput}
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 w-3/4"
                                            autoFocus
                                            placeholder="Password"
                                        />

                                        {errors.password && (
                                            <Alert
                                                variant="destructive"
                                                className="mt-2"
                                            >
                                                {errors.password}
                                            </Alert>
                                        )}
                                    </div>
                                    <div className="mt-6 flex justify-start ">
                                        <Button
                                            onClick={closeModal}
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            className="ms-3"
                                            disabled={processing}
                                            variant="destructive"
                                        >
                                            Delete Account
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    );
}
