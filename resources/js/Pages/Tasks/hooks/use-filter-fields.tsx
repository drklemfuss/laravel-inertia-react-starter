import { useEnums } from "@/hooks/use-enums";
import type {
    DataTableFilterField,
    Option,
} from "@/components/data-table/types";
import { type ColumnSchema } from "./use-column-schema";

// Filter Fields Hook
export const useFilterFields = (): DataTableFilterField<ColumnSchema>[] => {
    const enums = useEnums();

    const statuses = enums.statuses as [string, ...string[]];
    const priorities = enums.priorities as [string, ...string[]];
    const tags = enums.tags as [string, ...string[]];

    return [
        {
            label: "Status",
            value: "status",
            type: "checkbox",
            defaultOpen: true,
            component: (props: Option) => {
                if (typeof props.value === "boolean") return null;
                if (typeof props.value === "undefined") return null;
                return (
                    <div className="flex w-full items-center justify-between gap-2">
                        <span className="truncate font-normal">
                            {props.value}
                        </span>
                    </div>
                );
            },
            options: statuses.map((status) => ({
                label: status,
                value: status,
            })),
        },
        {
            label: "Priority",
            value: "priority",
            type: "checkbox",
            defaultOpen: true,
            component: (props: Option) => {
                if (typeof props.value === "boolean") return null;
                if (typeof props.value === "undefined") return null;
                return (
                    <div className="flex w-full items-center justify-between gap-2">
                        <span className="truncate font-normal">
                            {props.value}
                        </span>
                    </div>
                );
            },
            options: priorities.map((priority) => ({
                label: priority,
                value: priority,
            })),
        },
        {
            label: "Tags",
            value: "tags",
            type: "checkbox",
            defaultOpen: true,
            component: (props: Option) => {
                if (typeof props.value === "boolean") return null;
                if (typeof props.value === "undefined") return null;
                return (
                    <div className="flex w-full items-center justify-between gap-2">
                        <span className="truncate font-normal">
                            {props.value}
                        </span>
                    </div>
                );
            },
            options: tags.map((tag) => ({
                label: tag,
                value: tag,
            })),
        },
    ];
};
