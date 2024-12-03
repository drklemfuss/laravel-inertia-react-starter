import { usePage, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { PageProps, Task } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DataTableCrudActions from "@/components/ui/data-table-crud-actions";

// Define Columns for table:
export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
    },
    {
        accessorKey: "completed",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Completed" />
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const task = row.original; // get the row data (task)

            return (
                <DataTableCrudActions
                    itemId={task.id}
                    editRoute={"tasks.edit"}
                    deleteRoute={"tasks.destroy"}
                />
            );
        },
    },
];

const Index = ({ tasks }: PageProps<{ tasks: Task[] }>) => {
    return (
        <DashboardLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <div className="p-12">
                <h1 className="text-2xl font-semibold mb-4">All Tasks</h1>

                <div className="mb-4">
                    <Link href={route("tasks.create")}>
                        <Button variant="default" className="text-white">
                            <Icon name="Plus" color="white" size={16} />
                            Create New Task
                        </Button>
                    </Link>
                </div>

                <div className="container mx-auto py-10">
                    <DataTable
                        columns={columns}
                        data={tasks}
                        filterableColumns={["name", "description"]}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Index;
