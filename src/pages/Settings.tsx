import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Globe,
  Palette,
  Accessibility,
  Shield,
  HelpCircle,
  LogOut,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Type,
  Contrast,
  Languages,
  Download,
  Trash2,
  Info,
  ExternalLink,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: false,
      sms: true,
      sound: true,
      vibration: true,
    },
    appearance: {
      theme: "system",
      fontSize: 16,
      highContrast: false,
      reducedMotion: false,
    },
    accessibility: {
      screenReader: false,
      largeButtons: false,
      colorBlind: false,
    },
    privacy: {
      shareData: false,
      analytics: true,
      location: true,
    },
    language: "pt-BR",
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleLogout = () => {
    // In a real app, this would handle logout
    navigate("/welcome");
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    if (
      confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      )
    ) {
      navigate("/welcome");
    }
  };

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
            <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
            <p className="text-sm text-gray-600">Personalize sua experiência</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Notifications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  Notificações push
                </div>
                <div className="text-sm text-gray-600">
                  Receber alertas no dispositivo
                </div>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", "push", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">E-mail</div>
                <div className="text-sm text-gray-600">
                  Lembretes por e-mail
                </div>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", "email", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">SMS</div>
                <div className="text-sm text-gray-600">
                  Mensagens de texto importantes
                </div>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", "sms", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.notifications.sound ? (
                  <Volume2 className="h-4 w-4 text-blue-600" />
                ) : (
                  <VolumeX className="h-4 w-4 text-gray-600" />
                )}
                <div>
                  <div className="font-medium text-gray-900">Som</div>
                  <div className="text-sm text-gray-600">
                    Toques para notificações
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.notifications.sound}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", "sound", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Vibração</div>
                <div className="text-sm text-gray-600">
                  Vibrar ao receber notificações
                </div>
              </div>
              <Switch
                checked={settings.notifications.vibration}
                onCheckedChange={(checked) =>
                  updateSetting("notifications", "vibration", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium text-gray-900">Tema</div>
              <Select
                value={settings.appearance.theme}
                onValueChange={(value) =>
                  updateSetting("appearance", "theme", value)
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Claro
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      Escuro
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Sistema
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="font-medium text-gray-900">Tamanho da fonte</div>
              <div className="flex items-center gap-3">
                <Type className="h-4 w-4 text-gray-600" />
                <Slider
                  value={[settings.appearance.fontSize]}
                  onValueChange={(value) =>
                    updateSetting("appearance", "fontSize", value[0])
                  }
                  max={24}
                  min={12}
                  step={2}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-8">
                  {settings.appearance.fontSize}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">
                    Alto contraste
                  </div>
                  <div className="text-sm text-gray-600">
                    Melhor visibilidade
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.appearance.highContrast}
                onCheckedChange={(checked) =>
                  updateSetting("appearance", "highContrast", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  Reduzir movimento
                </div>
                <div className="text-sm text-gray-600">Menos animações</div>
              </div>
              <Switch
                checked={settings.appearance.reducedMotion}
                onCheckedChange={(checked) =>
                  updateSetting("appearance", "reducedMotion", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Accessibility className="h-4 w-4" />
              Acessibilidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Leitor de tela</div>
                <div className="text-sm text-gray-600">
                  Compatibilidade melhorada
                </div>
              </div>
              <Switch
                checked={settings.accessibility.screenReader}
                onCheckedChange={(checked) =>
                  updateSetting("accessibility", "screenReader", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Botões grandes</div>
                <div className="text-sm text-gray-600">
                  Área de toque ampliada
                </div>
              </div>
              <Switch
                checked={settings.accessibility.largeButtons}
                onCheckedChange={(checked) =>
                  updateSetting("accessibility", "largeButtons", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Daltonismo</div>
                <div className="text-sm text-gray-600">
                  Ajustes para deficiência visual
                </div>
              </div>
              <Switch
                checked={settings.accessibility.colorBlind}
                onCheckedChange={(checked) =>
                  updateSetting("accessibility", "colorBlind", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Languages className="h-4 w-4" />
              Idioma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={settings.language}
              onValueChange={(value) =>
                setSettings({ ...settings, language: value })
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (United States)</SelectItem>
                <SelectItem value="es-ES">Español (España)</SelectItem>
                <SelectItem value="fr-FR">Français (France)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4" />
              Privacidade e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  Compartilhar dados
                </div>
                <div className="text-sm text-gray-600">
                  Para pesquisa médica (anônimo)
                </div>
              </div>
              <Switch
                checked={settings.privacy.shareData}
                onCheckedChange={(checked) =>
                  updateSetting("privacy", "shareData", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Analytics</div>
                <div className="text-sm text-gray-600">
                  Melhorar a experiência do app
                </div>
              </div>
              <Switch
                checked={settings.privacy.analytics}
                onCheckedChange={(checked) =>
                  updateSetting("privacy", "analytics", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Localização</div>
                <div className="text-sm text-gray-600">Para emergências</div>
              </div>
              <Switch
                checked={settings.privacy.location}
                onCheckedChange={(checked) =>
                  updateSetting("privacy", "location", checked)
                }
              />
            </div>

            <Separator />

            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => navigate("/profile")}
            >
              <Download className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Exportar dados</div>
                <div className="text-xs text-gray-500">
                  Baixar todos os seus dados
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-4 w-4" />
              Ajuda e Suporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-between h-12"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4" />
                <span>Central de Ajuda</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between h-12"
              onClick={() => navigate("/chat")}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4" />
                <span>Falar com suporte</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between h-12"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4" />
                <span>Sobre o MedConnect AI</span>
              </div>
              <span className="text-xs text-gray-500">v1.0.0</span>
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12 text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair da conta
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-red-600 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="h-4 w-4 mr-3" />
              Excluir conta
            </Button>
          </CardContent>
        </Card>

        {/* Legal */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>
            <a href="#" className="underline">
              Termos de Uso
            </a>{" "}
            •{" "}
            <a href="#" className="underline">
              Política de Privacidade
            </a>
          </p>
          <p>© 2024 MedConnect AI. Todos os direitos reservados.</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
