import { z } from "zod";
import { useEnums } from "@/hooks/use-enums";

export const useColumnFilterSchema = () => {
    const enums = useEnums();

    return z.object({
        status: z.enum(enums.statuses as [string, ...string[]]).optional(),
        priority: z.enum(enums.priorities as [string, ...string[]]).optional(),
        tags: z.enum(enums.tags as [string, ...string[]]).optional(),
    });
};

export type ColumnFilterSchema = z.infer<
    ReturnType<typeof useColumnFilterSchema>
>;

export type ColumnFilterSchemaZod = ReturnType<typeof useColumnFilterSchema>;
