import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  AlertTriangle,
  Clock,
  CheckCircle,
  MessageSquare,
  Stethoscope,
  Shield,
  Calendar,
} from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const healthcareProfessionals = [
    {
      id: "dr-silva",
      name: "Dr. João Silva",
      specialty: "Cardiologista",
      status: "online",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Como está se sentindo hoje?",
      lastTime: "10:30",
      unread: 2,
    },
    {
      id: "nurse-maria",
      name: "Enf. Maria Santos",
      specialty: "Enfermeira",
      status: "online",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Lembre-se de tomar o medicamento",
      lastTime: "09:15",
      unread: 0,
    },
    {
      id: "dr-costa",
      name: "Dr. Ana Costa",
      specialty: "Clínica Geral",
      status: "away",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Vamos agendar sua consulta",
      lastTime: "Ontem",
      unread: 1,
    },
  ];

  const emergencyContacts = [
    { name: "SAMU", number: "192", icon: "🚨" },
    { name: "Bombeiros", number: "193", icon: "🚒" },
    { name: "Hospital São João", number: "(11) 3333-4444", icon: "🏥" },
  ];

  const messages = [
    {
      id: "1",
      sender: "dr-silva",
      content:
        "Olá! Como você está se sentindo hoje? Vi que você registrou alguns dados pela manhã.",
      time: "10:30",
      isMe: false,
    },
    {
      id: "2",
      sender: "me",
      content:
        "Olá, doutor! Estou me sentindo bem melhor. A pressão está mais controlada.",
      time: "10:32",
      isMe: true,
    },
    {
      id: "3",
      sender: "dr-silva",
      content:
        "Que bom! Vejo que você tem mantido uma rotina de exercícios. Continue assim. Alguma dúvida sobre os medicamentos?",
      time: "10:33",
      isMe: false,
    },
    {
      id: "4",
      sender: "me",
      content:
        "Sim, posso tomar o remédio da pressão junto com o café da manhã?",
      time: "10:35",
      isMe: true,
    },
    {
      id: "5",
      sender: "dr-silva",
      content:
        "Pode sim! Na verdade, é melhor tomar com alimentos para evitar irritação no estômago.",
      time: "10:36",
      isMe: false,
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (selectedChat) {
    const professional = healthcareProfessionals.find(
      (p) => p.id === selectedChat,
    );

    return (
      <div className="min-h-screen bg-white pb-20">
        {/* Chat Header */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedChat(null)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={professional?.avatar} />
              <AvatarFallback>
                {professional?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="font-semibold text-gray-900">
                {professional?.name}
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(professional?.status || "")}`}
                />
                <span className="text-sm text-gray-600">
                  {professional?.specialty}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea
          className="flex-1 p-4"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${msg.isMe ? "order-2" : "order-1"}`}
                >
                  {!msg.isMe && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={professional?.avatar} />
                        <AvatarFallback className="text-xs">
                          {professional?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">
                        {professional?.name}
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.isMe
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-health-primary text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${msg.isMe ? "text-right" : "text-left"}`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 rounded-full"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-primary to-health-secondary pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
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
            <h1 className="text-xl font-bold text-gray-900">Chat Médico</h1>
            <p className="text-sm text-gray-600">
              Converse com profissionais de saúde
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Emergency Section */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800 text-base">
              <AlertTriangle className="h-4 w-4" />
              Emergência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 mb-3">
              Em caso de emergência médica, ligue imediatamente:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {emergencyContacts.map((contact, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-between h-12 border-red-200 hover:bg-red-100 text-red-800"
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{contact.icon}</span>
                    <span className="font-semibold">{contact.name}</span>
                  </div>
                  <span className="text-sm font-mono">{contact.number}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex-col gap-1 bg-health-secondary border-green-200 text-green-800"
            onClick={() => navigate("/monitoring")}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Agendar Consulta</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col gap-1 bg-health-accent border-orange-200 text-orange-800"
            onClick={() => navigate("/alerts")}
          >
            <Stethoscope className="h-5 w-5" />
            <span className="text-sm">Relatório Médico</span>
          </Button>
        </div>

        {/* Healthcare Professionals */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Profissionais de Saúde
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {healthcareProfessionals.map((professional) => (
              <button
                key={professional.id}
                onClick={() => setSelectedChat(professional.id)}
                className="w-full p-3 rounded-xl bg-health-primary hover:bg-blue-100 transition-colors duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={professional.avatar} />
                      <AvatarFallback>
                        {professional.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(professional.status)}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {professional.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {professional.lastTime}
                        </span>
                        {professional.unread > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-5 flex items-center justify-center">
                            {professional.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-blue-600 mb-1">
                      {professional.specialty}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {professional.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="bg-health-purple">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Conversas Seguras
                </h3>
                <p className="text-sm text-gray-700">
                  Todas as suas conversas são criptografadas e protegidas pela
                  Lei Geral de Proteção de Dados (LGPD).
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
