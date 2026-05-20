import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, ChevronLeft, Leaf, TrendingDown, Bell, BarChart3, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import logoImage from "../../../assets/logo.png";

const onboardingSteps = [
  {
    icon: Leaf,
    title: "Bem-vindo ao GreenFood",
    description:
      "Uma plataforma completa para reduzir desperdício de alimentos e otimizar o planejamento de refeições.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: TrendingDown,
    title: "Reduza Desperdício",
    description:
      "Controle validades, gerencie estoque e receba alertas inteligentes sobre alimentos próximos do vencimento.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description:
      "Notificações proativas sobre itens próximos ao vencimento, estoque baixo e oportunidades de economia.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description:
      "Acompanhe métricas de desperdício evitado, impacto ambiental e economia gerada em tempo real.",
    color: "bg-purple-100 text-purple-600",
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as completed
      localStorage.setItem('onboardingCompleted', 'true');
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate("/dashboard");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <img src={logoImage} alt="GreenFood" className="h-12" />
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700"
        >
          Pular
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-12">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2 text-center">
              {currentStep + 1} de {onboardingSteps.length}
            </p>
          </div>

          {/* Step Content */}
          <div className="text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center`}>
                <Icon className="h-12 w-12" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900">
              {step.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {step.description}
            </p>

            {/* Feature List (for first step) */}
            {currentStep === 0 && (
              <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                {[
                  "Gestão completa de estoque",
                  "Planejamento inteligente de cardápios",
                  "Redução de custos operacionais",
                  "Impacto ambiental positivo",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="text-gray-600"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Anterior
        </Button>

        <Button
          onClick={handleNext}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          size="lg"
        >
          {currentStep === onboardingSteps.length - 1 ? "Começar" : "Próximo"}
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
