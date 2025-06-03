import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
}

export function HealthCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  backgroundColor = "bg-health-primary",
  onClick,
  className,
}: HealthCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer",
        backgroundColor,
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-600">{unit}</span>}
          {trend && (
            <span className={cn("text-sm ml-2", getTrendColor())}>
              {getTrendIcon()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
