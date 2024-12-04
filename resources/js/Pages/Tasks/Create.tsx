import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/input-error";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEnums } from "@/hooks/use-enums";
import { Checkbox } from "@/components/ui/checkbox";

export default function Create() {
    const enums = useEnums();

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        description: string;
        status: string;
        priority: string;
        tags: string[];
        due_date: string;
        estimated_hours: string;
        actual_hours: string;
        progress: number;
        effort_score: number;
        urgency_score: number;
    }>({
        name: "",
        description: "",
        status: enums.statuses[0], // Default status
        priority: enums.priorities[0], // Default priority
        tags: [], // Default tags as empty array
        due_date: "",
        estimated_hours: "",
        actual_hours: "",
        progress: 0,
        effort_score: 0,
        urgency_score: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("tasks.store"));
    };

    const statuses = enums.statuses as [string, ...string[]];
    const priorities = enums.priorities as [string, ...string[]];
    const tags = enums.tags as [string, ...string[]];

    const breadcrumbs = [
        { display: "Dashboard", href: route("dashboard") },
        { display: "Tasks", href: route("tasks.index") },
    ];

    return (
        <DashboardLayout
            breadcrumbs={breadcrumbs}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Task
                </h2>
            }
        >
            <div className="p-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    {/* Priority */}
                    <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={data.priority}
                            onValueChange={(value) =>
                                setData("priority", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {priorities.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError
                            message={errors.priority}
                            className="mt-2"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <Label htmlFor="tags">Tags</Label>
                        <div className="space-y-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={tag}
                                        checked={data.tags.includes(tag)}
                                        onCheckedChange={(checked) => {
                                            setData(
                                                "tags",
                                                checked
                                                    ? [...data.tags, tag]
                                                    : data.tags.filter(
                                                          (t) => t !== tag
                                                      )
                                            );
                                        }}
                                    />
                                    <Label htmlFor={tag}>{tag}</Label>
                                </div>
                            ))}
                        </div>
                        <InputError message={errors.tags} className="mt-2" />
                    </div>

                    {/* Due Date */}
                    <div>
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input
                            type="date"
                            id="due_date"
                            value={data.due_date}
                            onChange={(e) =>
                                setData("due_date", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.due_date}
                            className="mt-2"
                        />
                    </div>

                    {/* Estimated Hours */}
                    <div>
                        <Label htmlFor="estimated_hours">Estimated Hours</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="estimated_hours"
                            value={data.estimated_hours}
                            onChange={(e) =>
                                setData("estimated_hours", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.estimated_hours}
                            className="mt-2"
                        />
                    </div>

                    {/* Actual Hours */}
                    <div>
                        <Label htmlFor="actual_hours">Actual Hours</Label>
                        <Input
                            type="number"
                            step="0.1"
                            id="actual_hours"
                            value={data.actual_hours}
                            onChange={(e) =>
                                setData("actual_hours", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.actual_hours}
                            className="mt-2"
                        />
                    </div>

                    {/* Progress */}
                    <div>
                        <Label htmlFor="progress">Progress (%)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            id="progress"
                            value={data.progress}
                            onChange={(e) =>
                                setData("progress", Number(e.target.value))
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.progress}
                            className="mt-2"
                        />
                    </div>

                    {/* Effort Score */}
                    <div>
                        <Label htmlFor="effort_score">Effort Score</Label>
                        <Input
                            type="number"
                            id="effort_score"
                            value={data.effort_score}
                            onChange={(e) =>
                                setData("effort_score", Number(e.target.value))
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.effort_score}
                            className="mt-2"
                        />
                    </div>

                    {/* Urgency Score */}
                    <div>
                        <Label htmlFor="urgency_score">Urgency Score</Label>
                        <Input
                            type="number"
                            id="urgency_score"
                            value={data.urgency_score}
                            onChange={(e) =>
                                setData("urgency_score", Number(e.target.value))
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.urgency_score}
                            className="mt-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <Button disabled={processing}>Create Task</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
