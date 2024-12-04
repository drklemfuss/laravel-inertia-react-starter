import { z } from "zod";
import { useEnums } from "@/hooks/use-enums";

export function useColumnSchema() {
    const enums = useEnums();

    return z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
        status: z.enum(enums.statuses as [string, ...string[]]),
        priority: z.enum(enums.priorities as [string, ...string[]]),
        tags: z.enum(enums.tags as [string, ...string[]]).array(),
        due_date: z.string().optional(), // Assuming ISO date string
        progress: z.number().optional(),
        effort_score: z.number().optional(),
        urgency_score: z.number().optional(),
        created_at: z.string().optional(),
        updated_at: z.string().optional(),
    });
}

export type ColumnSchema = z.infer<ReturnType<typeof useColumnSchema>>;
