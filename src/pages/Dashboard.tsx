import { Navigation } from "@/components/Navigation";
import { HealthCard } from "@/components/HealthCard";
import { QuickActionButton } from "@/components/QuickActionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Thermometer,
  Weight,
  Droplets,
  Plus,
  MessageCircle,
  Phone,
  AlertTriangle,
  Calendar,
  Pill,
  User,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = "Maria Silva";

  const healthMetrics = [
    {
      title: "Frequência Cardíaca",
      value: 72,
      unit: "bpm",
      icon: Heart,
      trend: "stable" as const,
      backgroundColor: "bg-medical-heartRate",
    },
    {
      title: "Pressão Arterial",
      value: "120/80",
      unit: "mmHg",
      icon: Droplets,
      trend: "stable" as const,
      backgroundColor: "bg-medical-bloodPressure",
    },
    {
      title: "Temperatura",
      value: 36.5,
      unit: "°C",
      icon: Thermometer,
      trend: "stable" as const,
      backgroundColor: "bg-medical-temperature",
    },
    {
      title: "Peso",
      value: 68.5,
      unit: "kg",
      icon: Weight,
      trend: "down" as const,
      backgroundColor: "bg-medical-weight",
    },
  ];

  const quickActions = [
    {
      title: "Registrar Dados",
      description: "Adicionar medições diárias",
      icon: Plus,
      onClick: () => navigate("/monitoring"),
    },
    {
      title: "Chat Médico",
      description: "Falar com profissional",
      icon: MessageCircle,
      onClick: () => navigate("/chat"),
    },
    {
      title: "Emergência",
      description: "Contato de emergência",
      icon: Phone,
      onClick: () => {},
      variant: "emergency" as const,
    },
    {
      title: "Medicamentos",
      description: "Ver próximas doses",
      icon: Pill,
      onClick: () => navigate("/alerts"),
    },
  ];

  const todayAlerts = [
    { time: "09:00", message: "Tomar Losartana 50mg", type: "medication" },
    { time: "14:00", message: "Medir pressão arterial", type: "measurement" },
    { time: "18:00", message: "Consulta Dr. João", type: "appointment" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-primary to-health-secondary pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Olá, {userName}!
            </h1>
            <p className="text-sm text-gray-600">
              Como você está se sentindo hoje?
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Health Status Overview */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Seus Dados de Hoje
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {healthMetrics.map((metric, index) => (
              <HealthCard
                key={index}
                {...metric}
                onClick={() => navigate("/history")}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} {...action} />
            ))}
          </div>
        </section>

        {/* Today's Schedule */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Agenda de Hoje
          </h2>
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Lembretes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAlerts.map((alert, index) => {
                const getAlertColor = (type: string) => {
                  switch (type) {
                    case "medication":
                      return "bg-blue-100 text-blue-800";
                    case "measurement":
                      return "bg-green-100 text-green-800";
                    case "appointment":
                      return "bg-purple-100 text-purple-800";
                    default:
                      return "bg-gray-100 text-gray-800";
                  }
                };

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs font-medium">
                        {alert.time}
                      </Badge>
                      <span className="text-sm text-gray-900">
                        {alert.message}
                      </span>
                    </div>
                    <Badge className={getAlertColor(alert.type)}>
                      {alert.type === "medication" && "Med"}
                      {alert.type === "measurement" && "Medição"}
                      {alert.type === "appointment" && "Consulta"}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        {/* Health Tip */}
        <Card className="bg-health-accent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Dica de Saúde
                </h3>
                <p className="text-sm text-gray-700">
                  Beba pelo menos 8 copos de água por dia para manter-se
                  hidratado e ajudar na regulação da pressão arterial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
}
