import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Country {
    id: number;
    capital: string;
    citizenship: string;
    country_code: string;
    currency: string;
    currency_code: string;
    currency_sub_unit: string;
    currency_decimals: number;
    full_name: string;
    iso_3166_2: string;
    iso_3166_3: string;
    name: string;
    region_code: string;
    sub_region_code: string;
    eea: boolean;
    calling_code: string;
    currency_symbol: string;
    flag: string;
}

const STATUS = ["pending", "in_progress", "completed"] as const;
const PRIORITY = ["low", "medium", "high"] as const;
const TAGS = [
    "development",
    "design",
    "research",
    "review",
    "deployment",
] as const;

export interface Task {
    id: number;
    name: string;
    description: string;
    user_id: number;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    tags: Array<
        "development" | "design" | "research" | "review" | "deployment"
    >;
    due_date: string;
    estimated_hours: number;
    actual_hours: number;
    progress: number;
    effort_score: number;
    urgency_score: number;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    enums: EnumValues;
};
