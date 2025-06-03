import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Thermometer,
  Weight,
  Droplets,
  Smile,
  Frown,
  Meh,
  Save,
  ArrowLeft,
} from "lucide-react";

export default function DailyMonitoring() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    temperature: "",
    weight: "",
    mood: 5,
    symptoms: "",
    notes: "",
    sleepHours: "",
    waterIntake: "",
    painLevel: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the data
    navigate("/dashboard");
  };

  const moodEmojis = [
    { value: 1, emoji: "😢", label: "Muito triste" },
    { value: 2, emoji: "😟", label: "Triste" },
    { value: 3, emoji: "😐", label: "Neutro" },
    { value: 4, emoji: "🙂", label: "Bem" },
    { value: 5, emoji: "😊", label: "Muito bem" },
  ];

  const getMoodEmoji = (value: number) => {
    const mood = moodEmojis.find((m) => m.value === value);
    return mood ? mood.emoji : "😐";
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
            <h1 className="text-xl font-bold text-gray-900">Registro Diário</h1>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Vital Signs */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="h-4 w-4 text-red-500" />
                Sinais Vitais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Freq. Cardíaca (bpm)</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    placeholder="72"
                    value={formData.heartRate}
                    onChange={(e) =>
                      setFormData({ ...formData, heartRate: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperatura (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="36.5"
                    value={formData.temperature}
                    onChange={(e) =>
                      setFormData({ ...formData, temperature: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pressão Arterial (mmHg)</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="120"
                    value={formData.bloodPressureSystolic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bloodPressureSystolic: e.target.value,
                      })
                    }
                    className="rounded-xl"
                  />
                  <span className="text-gray-500">/</span>
                  <Input
                    type="number"
                    placeholder="80"
                    value={formData.bloodPressureDiastolic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bloodPressureDiastolic: e.target.value,
                      })
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="68.5"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="rounded-xl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Mood and Wellbeing */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smile className="h-4 w-4 text-yellow-500" />
                Humor e Bem-estar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Como você está se sentindo hoje?</Label>
                <div className="flex justify-between items-center p-4 bg-health-primary rounded-xl">
                  <span className="text-2xl">
                    {getMoodEmoji(formData.mood)}
                  </span>
                  <Slider
                    value={[formData.mood]}
                    onValueChange={(value) =>
                      setFormData({ ...formData, mood: value[0] })
                    }
                    max={5}
                    min={1}
                    step={1}
                    className="flex-1 mx-4"
                  />
                  <span className="text-sm text-gray-600">
                    {moodEmojis.find((m) => m.value === formData.mood)?.label}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Nível de dor (0-10)</Label>
                <div className="flex items-center gap-3 p-4 bg-health-primary rounded-xl">
                  <span className="text-sm font-medium">0</span>
                  <Slider
                    value={[formData.painLevel]}
                    onValueChange={(value) =>
                      setFormData({ ...formData, painLevel: value[0] })
                    }
                    max={10}
                    min={0}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">10</span>
                </div>
                <p className="text-center text-lg font-semibold text-gray-700">
                  Nível: {formData.painLevel}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Horas de sono</Label>
                  <Input
                    id="sleepHours"
                    type="number"
                    step="0.5"
                    placeholder="8"
                    value={formData.sleepHours}
                    onChange={(e) =>
                      setFormData({ ...formData, sleepHours: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterIntake">Copos de água</Label>
                  <Input
                    id="waterIntake"
                    type="number"
                    placeholder="8"
                    value={formData.waterIntake}
                    onChange={(e) =>
                      setFormData({ ...formData, waterIntake: e.target.value })
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms and Notes */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                Sintomas e Observações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Sintomas (se houver)</Label>
                <Select
                  value={formData.symptoms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, symptoms: value })
                  }
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Selecione um sintoma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum sintoma</SelectItem>
                    <SelectItem value="headache">Dor de cabeça</SelectItem>
                    <SelectItem value="fatigue">Fadiga</SelectItem>
                    <SelectItem value="nausea">Náusea</SelectItem>
                    <SelectItem value="dizziness">Tontura</SelectItem>
                    <SelectItem value="shortness-breath">
                      Falta de ar
                    </SelectItem>
                    <SelectItem value="chest-pain">Dor no peito</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Descreva como você se sente, atividades realizadas, medicamentos tomados..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="rounded-xl min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Registro
            </Button>
          </div>
        </form>
      </div>

      <Navigation />
    </div>
  );
}
