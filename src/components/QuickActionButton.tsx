import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  variant?: "default" | "emergency";
  size?: "default" | "large";
}

export function QuickActionButton({
  title,
  description,
  icon: Icon,
  onClick,
  className,
  variant = "default",
  size = "default",
}: QuickActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "emergency":
        return "bg-red-100 hover:bg-red-200 border-red-200 text-red-800";
      default:
        return "bg-health-primary hover:bg-blue-100 border-blue-200 text-blue-800";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "large":
        return "h-24 p-6";
      default:
        return "h-16 p-4";
    }
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-full rounded-2xl border-2 transition-all duration-200",
        getVariantStyles(),
        getSizeStyles(),
        className,
      )}
    >
      <Icon className={cn("h-6 w-6", size === "large" && "h-8 w-8")} />
      <div className="text-center">
        <div
          className={cn(
            "font-semibold",
            size === "large" ? "text-base" : "text-sm",
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-xs opacity-75 mt-1">{description}</div>
        )}
      </div>
    </Button>
  );
}
