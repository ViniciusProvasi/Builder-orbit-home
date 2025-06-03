import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Users, Smartphone } from "lucide-react";

export default function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Heart,
      title: "Monitoramento Contínuo",
      description: "Acompanhe seus sinais vitais diariamente",
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Seus dados de saúde protegidos com criptografia",
    },
    {
      icon: Users,
      title: "Suporte Profissional",
      description: "Conecte-se com profissionais de saúde",
    },
    {
      icon: Smartphone,
      title: "Fácil de Usar",
      description: "Interface simples e intuitiva",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-primary via-health-secondary to-health-accent p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg flex items-center justify-center">
            <Heart className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MedConnect AI
          </h1>
          <p className="text-gray-600">Sua saúde, nossa prioridade</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-sm"
            >
              <CardContent className="p-3 text-center">
                <feature.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Login/Register Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLogin ? "Bem-vindo de volta" : "Criar conta"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Entre na sua conta para continuar"
                : "Cadastre-se para começar a cuidar da sua saúde"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (opcional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border-gray-200 h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {isLogin ? "Entrar" : "Cadastrar"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                </span>
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-semibold ml-1 p-0"
                >
                  {isLogin ? "Cadastre-se" : "Faça login"}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-blue-200 text-blue-600"
                onClick={() => navigate("/dashboard")}
              >
                Acesso com SMS
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="text-blue-600 underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-blue-600 underline">
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}
