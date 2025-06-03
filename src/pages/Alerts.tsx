import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Pill,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Thermometer,
  Plus,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function Alerts() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    medication: true,
    measurements: true,
    appointments: true,
    emergency: true,
    sound: true,
  });

  const medicationReminders = [
    {
      id: "1",
      medication: "Losartana 50mg",
      time: "08:00",
      status: "pending",
      frequency: "Diariamente",
    },
    {
      id: "2",
      medication: "Metformina 850mg",
      time: "12:00",
      status: "taken",
      frequency: "2x ao dia",
    },
    {
      id: "3",
      medication: "Sinvastatina 20mg",
      time: "20:00",
      status: "pending",
      frequency: "Noturno",
    },
  ];

  const measurementReminders = [
    {
      id: "1",
      type: "Pressão Arterial",
      time: "07:00",
      status: "completed",
      frequency: "2x ao dia",
    },
    {
      id: "2",
      type: "Glicemia",
      time: "14:00",
      status: "pending",
      frequency: "Após almoço",
    },
    {
      id: "3",
      type: "Peso",
      time: "06:30",
      status: "completed",
      frequency: "Diariamente",
    },
  ];

  const systemAlerts = [
    {
      id: "1",
      type: "warning",
      title: "Pressão arterial elevada",
      message:
        "Sua última medição (140/90) está acima do normal. Considere entrar em contato com seu médico.",
      time: "2 horas atrás",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Consulta agendada",
      message: "Lembrete: consulta com Dr. João Silva amanhã às 14:00.",
      time: "1 dia atrás",
      read: true,
    },
    {
      id: "3",
      type: "success",
      title: "Meta alcançada",
      message: "Parabéns! Você completou todos os registros desta semana.",
      time: "2 dias atrás",
      read: true,
    },
  ];

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. João Silva",
      specialty: "Cardiologista",
      date: "Amanhã",
      time: "14:00",
      type: "Consulta de rotina",
    },
    {
      id: "2",
      doctor: "Dra. Ana Costa",
      specialty: "Clínica Geral",
      date: "15/01/2024",
      time: "10:30",
      type: "Retorno",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "taken":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "taken":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertBgColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "success":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const markAsTaken = (id: string) => {
    // In a real app, this would update the medication status
    console.log(`Marking medication ${id} as taken`);
  };

  const markAsCompleted = (id: string) => {
    // In a real app, this would update the measurement status
    console.log(`Marking measurement ${id} as completed`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-primary to-health-secondary pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Alertas e Lembretes
              </h1>
              <p className="text-sm text-gray-600">
                Gerencie suas notificações
              </p>
            </div>
          </div>
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

      <div className="p-4">
        <Tabs defaultValue="reminders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="reminders">Lembretes</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
          </TabsList>

          <TabsContent value="reminders" className="space-y-4">
            {/* Medication Reminders */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-600" />
                    Medicamentos
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/monitoring")}
                    className="text-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medicationReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 bg-medical-heartRate rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(reminder.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {reminder.medication}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {reminder.frequency} • {reminder.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(reminder.status)}>
                        {reminder.status === "taken" ? "Tomado" : "Pendente"}
                      </Badge>
                      {reminder.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => markAsTaken(reminder.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Marcar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Measurement Reminders */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-4 w-4 text-red-600" />
                  Medições
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {measurementReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 bg-medical-bloodPressure rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(reminder.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {reminder.type}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {reminder.frequency} • {reminder.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(reminder.status)}>
                        {reminder.status === "completed" ? "Feito" : "Pendente"}
                      </Badge>
                      {reminder.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => markAsCompleted(reminder.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Medir
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            {systemAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`${getAlertBgColor(alert.type)} ${!alert.read && "ring-2 ring-blue-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {alert.title}
                        </h3>
                        {!alert.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {alert.message}
                      </p>
                      <span className="text-xs text-gray-500">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-health-purple p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {appointment.doctor}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.specialty}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.time}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        Agendado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/chat")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agendar Nova Consulta
            </Button>
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="bg-white shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4" />
              Configurações de Notificação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Pill className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  Lembretes de medicamentos
                </span>
              </div>
              <Switch
                checked={notifications.medication}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, medication: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">
                  Lembretes de medições
                </span>
              </div>
              <Switch
                checked={notifications.measurements}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, measurements: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">
                  Lembretes de consultas
                </span>
              </div>
              <Switch
                checked={notifications.appointments}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, appointments: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notifications.sound ? (
                  <Volume2 className="h-4 w-4 text-green-600" />
                ) : (
                  <VolumeX className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-sm font-medium">
                  Som das notificações
                </span>
              </div>
              <Switch
                checked={notifications.sound}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, sound: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
}
