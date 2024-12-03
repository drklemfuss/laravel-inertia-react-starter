import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageProps, Task } from "@/types";
import InputError from "@/components/ui/input-error";

export default function Edit({ task }: PageProps<{ task: Task }>) {
    const { data, setData, put, processing, errors } = useForm({
        name: task.name,
        description: task.description,
        completed: task.completed,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("tasks.update", task.id));
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name">Description</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="completed">Completed</Label>
                    <Input
                        id="completed"
                        type="checkbox"
                        checked={data.completed}
                        onChange={(e) => setData("completed", e.target.checked)}
                        className="mt-1"
                    />
                </div>

                <div className="mt-6">
                    <Button disabled={processing}>Update Task</Button>
                </div>
            </form>
        </div>
    );
}
