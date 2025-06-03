import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Pill,
  AlertTriangle,
  Plus,
  Trash2,
  Camera,
  Shield,
  Download,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Maria Silva Santos",
    email: "maria.santos@email.com",
    phone: "(11) 99999-9999",
    birthDate: "1965-03-15",
    address: "Rua das Flores, 123 - São Paulo, SP",
    bloodType: "O+",
    height: "165",
    weight: "68.5",
  });

  const chronicConditions = [
    {
      id: "1",
      name: "Hipertensão arterial",
      severity: "Controlada",
      color: "green",
    },
    { id: "2", name: "Diabetes tipo 2", severity: "Moderada", color: "yellow" },
    { id: "3", name: "Colesterol alto", severity: "Leve", color: "blue" },
  ];

  const medications = [
    { id: "1", name: "Losartana 50mg", dosage: "1x ao dia", schedule: "Manhã" },
    {
      id: "2",
      name: "Metformina 850mg",
      dosage: "2x ao dia",
      schedule: "Café e Jantar",
    },
    {
      id: "3",
      name: "Sinvastatina 20mg",
      dosage: "1x ao dia",
      schedule: "Noite",
    },
  ];

  const emergencyContacts = [
    {
      id: "1",
      name: "João Santos (Esposo)",
      phone: "(11) 98888-7777",
      relationship: "Cônjuge",
    },
    {
      id: "2",
      name: "Ana Paula (Filha)",
      phone: "(11) 97777-6666",
      relationship: "Filha",
    },
    {
      id: "3",
      name: "Dr. João Silva",
      phone: "(11) 3333-4444",
      relationship: "Médico",
    },
  ];

  const getSeverityColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
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
              <h1 className="text-xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-sm text-gray-600">
                Informações pessoais e médicas
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-full"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/api/placeholder/80/80" />
                  <AvatarFallback className="text-xl font-semibold">
                    MS
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {profileData.name}
                </h2>
                <p className="text-gray-600">
                  {calculateAge(profileData.birthDate)} anos
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {profileData.bloodType}
                  </span>
                  <span>
                    {profileData.height}cm • {profileData.weight}kg
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        birthDate: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Tipo sanguíneo</Label>
                  <Input
                    id="bloodType"
                    value={profileData.bloodType}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        bloodType: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    value={profileData.height}
                    onChange={(e) =>
                      setProfileData({ ...profileData, height: e.target.value })
                    }
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    value={profileData.weight}
                    onChange={(e) =>
                      setProfileData({ ...profileData, weight: e.target.value })
                    }
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Salvar Alterações
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chronic Conditions */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                Condições Crônicas
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {chronicConditions.map((condition) => (
              <div
                key={condition.id}
                className="flex items-center justify-between p-3 bg-health-primary rounded-xl"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {condition.name}
                  </h3>
                  <Badge className={getSeverityColor(condition.color)}>
                    {condition.severity}
                  </Badge>
                </div>
                {isEditing && (
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Medications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-blue-600" />
                Medicamentos Atuais
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {medications.map((medication) => (
              <div
                key={medication.id}
                className="flex items-center justify-between p-3 bg-medical-heartRate rounded-xl"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {medication.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {medication.dosage} • {medication.schedule}
                  </p>
                </div>
                {isEditing && (
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-600" />
                Contatos de Emergência
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-health-error rounded-xl"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {contact.relationship}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`tel:${contact.phone}`)}
                  >
                    Ligar
                  </Button>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-green-600" />
              Seus Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12 text-left"
              onClick={() => {}}
            >
              <Download className="h-4 w-4 mr-3" />
              <div>
                <div className="font-semibold">Exportar dados de saúde</div>
                <div className="text-xs text-gray-500">
                  Baixe todos os seus registros em PDF
                </div>
              </div>
            </Button>

            <Separator />

            <div className="text-xs text-gray-500 text-center p-4">
              Seus dados são protegidos pela Lei Geral de Proteção de Dados
              (LGPD). Você tem o direito de acessar, corrigir ou excluir suas
              informações a qualquer momento.
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
}
