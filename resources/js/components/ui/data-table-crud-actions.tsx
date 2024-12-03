import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

interface DataTableCrudActionsProps {
    itemId: number;
    editRoute: string;
    deleteRoute: string;
}

const DataTableCrudActions: React.FC<DataTableCrudActionsProps> = ({
    itemId,
    editRoute,
    deleteRoute,
}) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Set up form for delete request
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "", // Include fields as necessary
    });

    // Handle delete logic (confirmation)
    const deleteItem = (e: React.FormEvent) => {
        e.preventDefault();
        // Perform the delete request
        destroy(route(deleteRoute, itemId), {
            preserveScroll: true,
            onSuccess: () => {
                // Close the dialog on success
                setIsDeleteDialogOpen(false);
            },
            onFinish: () => {
                // Reset any form state on finish
                reset();
            },
            onError: (error) => {
                console.error("Error deleting item", error);
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={route(editRoute, itemId)}>
                        <Button
                            variant="default"
                            className="w-[100px] text-white"
                        >
                            <Icon name="Pencil" color="white" size={16} />
                            Edit
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button
                        variant="destructive"
                        className="w-[100px] ml-2 mt-2"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Icon name="Trash" color="white" size={16} />
                        Delete
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={deleteItem}
                            disabled={processing}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
};

export default DataTableCrudActions;
