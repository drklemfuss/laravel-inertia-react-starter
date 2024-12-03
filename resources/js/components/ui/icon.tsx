import { icons } from "lucide-react";

const Icon = ({
    name,
    color,
    size,
    className,
}: {
    name: keyof typeof icons;
    color: string;
    size: number;
    className?: string;
}) => {
    // Check if the icon exists, otherwise fall back to a default icon (like "circle" or "x")
    const LucideIcon = icons[name as keyof typeof icons] || icons["Circle"]; // Use a fallback icon

    return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
