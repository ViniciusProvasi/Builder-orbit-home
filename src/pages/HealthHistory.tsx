import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Heart,
  Droplets,
  Thermometer,
  Weight,
  BarChart3,
  List,
} from "lucide-react";

export default function HealthHistory() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const mockData = [
    {
      date: "2024-01-15",
      heartRate: 72,
      bloodPressure: "120/80",
      temperature: 36.5,
      weight: 68.5,
      mood: 4,
      symptoms: "none",
    },
    {
      date: "2024-01-14",
      heartRate: 75,
      bloodPressure: "125/82",
      temperature: 36.7,
      weight: 68.7,
      mood: 3,
      symptoms: "headache",
    },
    {
      date: "2024-01-13",
      heartRate: 70,
      bloodPressure: "118/78",
      temperature: 36.4,
      weight: 68.3,
      mood: 5,
      symptoms: "none",
    },
    {
      date: "2024-01-12",
      heartRate: 73,
      bloodPressure: "122/79",
      temperature: 36.6,
      weight: 68.6,
      mood: 4,
      symptoms: "fatigue",
    },
    {
      date: "2024-01-11",
      heartRate: 74,
      bloodPressure: "121/81",
      temperature: 36.5,
      weight: 68.8,
      mood: 3,
      symptoms: "none",
    },
  ];

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "stable";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "heartRate":
        return "bg-medical-heartRate";
      case "bloodPressure":
        return "bg-medical-bloodPressure";
      case "temperature":
        return "bg-medical-temperature";
      case "weight":
        return "bg-medical-weight";
      default:
        return "bg-health-primary";
    }
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ["😢", "😟", "😐", "🙂", "😊"];
    return emojis[mood - 1] || "😐";
  };

  const summary = {
    avgHeartRate: Math.round(
      mockData.reduce((sum, d) => sum + d.heartRate, 0) / mockData.length,
    ),
    avgWeight: (
      mockData.reduce((sum, d) => sum + d.weight, 0) / mockData.length
    ).toFixed(1),
    avgMood: Math.round(
      mockData.reduce((sum, d) => sum + d.mood, 0) / mockData.length,
    ),
    symptomsCount: mockData.filter((d) => d.symptoms !== "none").length,
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
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">
              Histórico de Saúde
            </h1>
            <p className="text-sm text-gray-600">Acompanhe sua evolução</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[130px] rounded-xl bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 dias</SelectItem>
              <SelectItem value="30days">30 dias</SelectItem>
              <SelectItem value="90days">3 meses</SelectItem>
              <SelectItem value="1year">1 ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="flex-1 rounded-xl bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os dados</SelectItem>
              <SelectItem value="heartRate">Freq. Cardíaca</SelectItem>
              <SelectItem value="bloodPressure">Pressão Arterial</SelectItem>
              <SelectItem value="temperature">Temperatura</SelectItem>
              <SelectItem value="weight">Peso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-medical-heartRate">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">
                  Média FC
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {summary.avgHeartRate} bpm
              </div>
            </CardContent>
          </Card>

          <Card className="bg-medical-weight">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Weight className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Peso Atual
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {summary.avgWeight} kg
              </div>
            </CardContent>
          </Card>

          <Card className="bg-medical-mood">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{getMoodEmoji(summary.avgMood)}</span>
                <span className="text-sm font-medium text-gray-700">
                  Humor Médio
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {summary.avgMood}/5
              </div>
            </CardContent>
          </Card>

          <Card className="bg-health-warning">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Sintomas
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {summary.symptomsCount} dias
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data View Toggle */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Gráfico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-3">
            {mockData.map((entry, index) => {
              const prevEntry = mockData[index + 1];

              return (
                <Card key={entry.date} className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">
                        {new Date(entry.date).toLocaleDateString("pt-BR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getMoodEmoji(entry.mood)}
                        </span>
                        {entry.symptoms !== "none" && (
                          <Badge variant="outline" className="text-xs">
                            {entry.symptoms}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-2 bg-medical-heartRate rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="h-3 w-3 text-red-600" />
                        <span className="text-xs text-gray-600">FC</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {entry.heartRate} bpm
                        </span>
                        {prevEntry &&
                          getTrendIcon(
                            getTrend(entry.heartRate, prevEntry.heartRate),
                          )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-medical-bloodPressure rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-3 w-3 text-blue-600" />
                        <span className="text-xs text-gray-600">PA</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {entry.bloodPressure}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-medical-temperature rounded-lg">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-3 w-3 text-orange-600" />
                        <span className="text-xs text-gray-600">Temp</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {entry.temperature}°C
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-medical-weight rounded-lg">
                      <div className="flex items-center gap-2">
                        <Weight className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-gray-600">Peso</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {entry.weight} kg
                        </span>
                        {prevEntry &&
                          getTrendIcon(
                            getTrend(entry.weight, prevEntry.weight),
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="chart">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3" />
                  <p className="text-sm">Gráfico de tendências</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Visualização de dados em desenvolvimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </div>
  );
}
