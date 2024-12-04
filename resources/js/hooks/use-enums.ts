import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

interface Enums {
    statuses: string[];
    priorities: string[];
    tags: string[];
}

export function useEnums() {
    const { enums } = usePage().props as PageProps<{ enums: Enums }>;
    return enums;
}
