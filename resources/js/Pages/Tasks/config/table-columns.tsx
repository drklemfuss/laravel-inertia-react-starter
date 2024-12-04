"use client";

import { Badge } from "@/components/ui/badge";
import { Minus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { tagsColor } from "./tag-color";
import { format } from "date-fns";
import type { Task } from "@/types";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: "Name",
        enableHiding: false,
        cell: ({ row }) => <span>{row.getValue("name")}</span>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const value = row.getValue("description");
            return <div className="max-w-[300px] truncate">{`${value}`}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.getValue("status");
            return (
                <Badge variant="outline" className="capitalize">
                    {`${value}`}
                </Badge>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const value = row.getValue("priority");
            return (
                <Badge variant="outline" className="capitalize">
                    {`${value}`}
                </Badge>
            );
        },
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const value = row.getValue("tags") as string | string[];
            if (Array.isArray(value)) {
                return (
                    <div className="flex flex-wrap gap-1">
                        {value.map((tag) => (
                            <Badge key={tag} className={tagsColor[tag]?.badge}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                );
            }
            return null;
        },
    },
    {
        accessorKey: "due_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => {
            const value = row.getValue("due_date");
            return value ? (
                <div className="text-xs text-muted-foreground">
                    {format(new Date(`${value}`), "LLL dd, y HH:mm")}
                </div>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "estimated_hours",
        header: "Estimated Hours",
        cell: ({ row }) => {
            const value = row.getValue("estimated_hours");
            return value !== null ? (
                <span>{`${value} hrs`}</span>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "actual_hours",
        header: "Actual Hours",
        cell: ({ row }) => {
            const value = row.getValue("actual_hours");
            return value !== null ? (
                <span>{`${value} hrs`}</span>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "progress",
        header: "Progress",
        cell: ({ row }) => {
            const value = row.getValue("progress");
            return (
                <div className="text-muted-foreground">
                    <span>{`${value}%`}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "effort_score",
        header: "Effort Score",
        cell: ({ row }) => {
            const value = row.getValue("effort_score");
            return value !== null ? (
                <span>{`${value}`}</span>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "urgency_score",
        header: "Urgency Score",
        cell: ({ row }) => {
            const value = row.getValue("urgency_score");
            return value !== null ? (
                <span>{`${value}`}</span>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const value = row.getValue("created_at");
            return value ? (
                <div className="text-xs text-muted-foreground">
                    {format(new Date(`${value}`), "LLL dd, y HH:mm")}
                </div>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) => {
            const value = row.getValue("updated_at");
            return value ? (
                <div className="text-xs text-muted-foreground">
                    {format(new Date(`${value}`), "LLL dd, y HH:mm")}
                </div>
            ) : (
                <Minus className="h-4 w-4 text-muted-foreground/50" />
            );
        },
    },
];
