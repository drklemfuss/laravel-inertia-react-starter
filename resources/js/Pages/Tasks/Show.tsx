// resources/js/Pages/Tasks/Show.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import { type Task } from "@/types";

export default function Show({ task }: { task: Task }) {
    return (
        <div>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.due_date || "None"}</p>
            <p>Progress: {task.progress}%</p>
            <Link href="/tasks" className="btn btn-primary">
                Back to Tasks
            </Link>
        </div>
    );
}
