import { cn } from "@/lib/utils";
import {
  Home,
  Activity,
  History,
  MessageCircle,
  Bell,
  User,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Início", path: "/dashboard" },
  { icon: Activity, label: "Monitor", path: "/monitoring" },
  { icon: History, label: "Histórico", path: "/history" },
  { icon: MessageCircle, label: "Chat", path: "/chat" },
  { icon: Bell, label: "Alertas", path: "/alerts" },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-health-primary text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
