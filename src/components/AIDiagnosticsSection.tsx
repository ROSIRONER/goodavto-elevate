import { FormEvent, ReactNode, useMemo, useState } from "react";
import { AlertTriangle, BrainCircuit, CheckCircle2, Gauge, Loader2, Sparkles, Wrench } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import CTAButtons from "./CTAButtons";
import SectionHeading from "./SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DiagnosticResult, analyzeVehicleSymptoms } from "@/lib/diagnostics";

const carBrands = ["Toyota", "Nissan", "Hyundai", "Kia", "Volkswagen", "Skoda", "Renault", "Lada", "BMW", "Mercedes-Benz"];

const dangerStyles: Record<DiagnosticResult["dangerLevel"], string> = {
  Низкий: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Средний: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  Высокий: "border-primary/40 bg-primary/10 text-primary",
};

const exampleSymptoms = "Стук при повороте руля и вибрация при разгоне";

const AIDiagnosticsSection = () => {
  const [symptoms, setSymptoms] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const symptomsLength = symptoms.trim().length;
  const canSubmit = symptomsLength >= 12 && !isLoading;

  const selectedVehicle = useMemo(
    () => [brand.trim(), model.trim()].filter(Boolean).join(" "),
    [brand, model],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (symptomsLength < 12) {
      setError("Опишите симптомы подробнее — минимум 12 символов.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const diagnosticResult = await analyzeVehicleSymptoms({ symptoms, brand, model });
      setResult(diagnosticResult);
    } catch {
      setError("Не удалось выполнить анализ. Попробуйте ещё раз или свяжитесь с нами напрямую.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillExample = () => {
    setSymptoms(exampleSymptoms);
    setBrand("Toyota");
    setModel("Camry");
    setError("");
  };

  return (
    <section id="ai-diagnostics" className="relative overflow-hidden py-28">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="AI Diagnostics"
          title="Интеллектуальная диагностика"
          subtitle="Опишите симптомы автомобиля обычными словами — модуль предварительно определит вероятную проблему, уровень риска и подходящее направление сервиса. Итог не заменяет осмотр мастера, но помогает быстрее понять, с чего начать."
        />

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-surface rounded-2xl p-6 md:p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">Опишите проблему</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    Например: стук при повороте, вибрация при разгоне, перегрев, скрип тормозов или плавающие обороты.
                  </p>
                </div>
              </div>

              <label className="font-body text-sm font-semibold" htmlFor="symptoms">
                Симптомы автомобиля
              </label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(event) => setSymptoms(event.target.value)}
                placeholder="Например: стук при повороте руля и вибрация при разгоне"
                className="mt-2 min-h-[150px] resize-none border-border bg-background/70 font-body text-sm"
              />
              <div className="mt-2 flex items-center justify-between gap-3 font-body text-xs text-muted-foreground">
                <span>Минимум 12 символов</span>
                <span>{symptomsLength}/500</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-body text-sm font-semibold" htmlFor="brand">
                    Марка (опционально)
                  </label>
                  <Input
                    id="brand"
                    list="car-brands"
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                    placeholder="Toyota"
                    className="mt-2 border-border bg-background/70"
                  />
                  <datalist id="car-brands">
                    {carBrands.map((item) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="font-body text-sm font-semibold" htmlFor="model">
                    Модель (опционально)
                  </label>
                  <Input
                    id="model"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    placeholder="Camry"
                    className="mt-2 border-border bg-background/70"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 font-body text-sm text-primary">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" disabled={!canSubmit} className="btn-glow h-12 flex-1 font-body font-semibold">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Анализируем
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Запустить AI диагностику
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 border-border bg-background/40 font-body"
                  onClick={fillExample}
                >
                  Пример
                </Button>
              </div>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="glass-surface relative min-h-full rounded-2xl p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="font-label text-xs font-medium uppercase tracking-[0.2em] text-primary">Результат анализа</div>
                  <h3 className="mt-2 font-display text-2xl font-bold">Предварительное заключение</h3>
                </div>
                <Gauge className="h-8 w-8 text-primary" />
              </div>

              {isLoading && (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-primary/10 p-5">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  </div>
                  <p className="mt-5 font-body text-sm text-muted-foreground">
                    AI-модуль сопоставляет симптомы с типовыми неисправностями и категориями работ...
                  </p>
                </div>
              )}

              {!isLoading && !result && (
                <div className="flex min-h-[420px] flex-col justify-center rounded-2xl border border-dashed border-border p-6 text-center">
                  <BrainCircuit className="mx-auto h-12 w-12 text-primary" />
                  <p className="mt-5 font-body text-base leading-relaxed text-muted-foreground">
                    Заполните симптомы слева, и здесь появятся вероятная неисправность, причины, уровень опасности и рекомендации.
                  </p>
                  <div className="mt-5 grid gap-3 text-left font-body text-sm text-muted-foreground sm:grid-cols-2">
                    <div className="rounded-xl bg-secondary/50 p-4">Безопасная архитектура: реальный OpenAI API должен вызываться через backend/serverless.</div>
                    <div className="rounded-xl bg-secondary/50 p-4">История диагностик может храниться только с согласием клиента.</div>
                  </div>
                </div>
              )}

              {!isLoading && result && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <Badge className={dangerStyles[result.dangerLevel]}>Опасность: {result.dangerLevel}</Badge>
                      <Badge variant="outline" className="border-border text-muted-foreground">
                        Уверенность: {result.confidence}%
                      </Badge>
                      {selectedVehicle && (
                        <Badge variant="outline" className="border-border text-muted-foreground">
                          {selectedVehicle}
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-display text-2xl font-bold text-foreground">{result.probableIssue}</h4>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ResultCard title="Возможные причины" icon={<AlertTriangle className="h-5 w-5" />} items={result.possibleCauses} />
                    <ResultCard title="Рекомендации" icon={<CheckCircle2 className="h-5 w-5" />} items={result.recommendations} />
                  </div>

                  <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-label text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          Рекомендуемая категория сервиса
                        </div>
                        <div className="mt-2 font-display text-xl font-bold">{result.suggestedServiceCategory}</div>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                          Для точной оценки мастер проверит автомобиль на месте и согласует стоимость до начала работ.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/30 p-5">
                    <p className="mb-4 font-body text-sm text-muted-foreground">
                      Хотите уточнить цену и сроки по результату диагностики?
                    </p>
                    <CTAButtons />
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const ResultCard = ({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) => (
  <div className="rounded-2xl border border-border bg-secondary/30 p-5">
    <div className="mb-4 flex items-center gap-3 font-display text-lg font-bold">
      <span className="text-primary">{icon}</span>
      {title}
    </div>
    <ul className="space-y-3 font-body text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default AIDiagnosticsSection;
