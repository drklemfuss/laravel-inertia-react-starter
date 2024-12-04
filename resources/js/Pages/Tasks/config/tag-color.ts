export const tagsColor = {
    development: {
        badge: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10",
        dot: "bg-[#10b981]",
    },
    design: {
        badge: "text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10",
        dot: "bg-[#0ea5e9]",
    },
    research: {
        badge: "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10",
        dot: "bg-[#ec4899]",
    },
    review: {
        badge: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10",
        dot: "bg-[#f97316]",
    },
    deployment: {
        badge: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20 hover:bg-[#a855f7]/10",
        dot: "bg-[#a855f7]",
    },
} as Record<string, Record<"badge" | "dot", string>>;
