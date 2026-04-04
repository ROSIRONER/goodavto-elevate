import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import { useCountUp } from "@/hooks/useCountUp";
import { Shield, Zap, Wrench, Award } from "lucide-react";

const CountUpStat = ({ target, suffix, label, icon: Icon }: { target: number; suffix: string; label: string; icon: React.ElementType }) => {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="glass-surface flex h-full flex-col items-center justify-center rounded-2xl p-8 text-center">
      <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="font-display text-4xl font-bold text-gradient-red md:text-5xl">
        {value}{suffix}
      </div>
      <div className="mt-3 font-body text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const TextStat = ({ label, text, icon: Icon }: { label: string; text: string; icon: React.ElementType }) => (
  <div className="glass-surface flex h-full flex-col items-center justify-center rounded-2xl p-8 text-center">
    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div className="font-display text-2xl font-bold text-gradient-red md:text-3xl">
      {text}
    </div>
    <div className="mt-3 font-body text-sm text-muted-foreground">{label}</div>
  </div>
);

const stats = [
  { target: 10, suffix: "+", label: "Лет опыта", icon: Award },
  { target: 100, suffix: "%", label: "Гарантия на все работы", icon: Shield },
  { text: "Быстро", label: "Высокая скорость благодаря опыту", icon: Zap },
  { text: "Под ключ", label: "Запчасти подберём и привезём сами", icon: Wrench },
];

const AdvantagesSection = () => (
  <section id="advantages" className="relative py-28 overflow-hidden">
    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 600px 400px at 90% 30%, hsl(0 78% 50% / 0.05), transparent)' }} />
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Почему мы"
        title="Преимущества"
      />

      <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.12}>
            {'target' in s ? (
              <CountUpStat target={s.target!} suffix={s.suffix!} label={s.label} icon={s.icon} />
            ) : (
              <TextStat text={s.text!} label={s.label} icon={s.icon} />
            )}
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="text-center">
        <div className="mx-auto inline-flex flex-col items-center gap-4 rounded-2xl glass-surface p-10">
          <p className="mb-2 max-w-md font-body text-lg text-muted-foreground">
            Готовы доверить нам свой автомобиль?
          </p>
          <CTAButtons />
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default AdvantagesSection;
