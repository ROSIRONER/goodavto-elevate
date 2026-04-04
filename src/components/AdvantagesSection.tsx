import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import { useCountUp } from "@/hooks/useCountUp";
import { Shield, Clock, Wrench, Award } from "lucide-react";

const CountUpStat = ({ target, suffix, label, icon: Icon }: { target: number; suffix: string; label: string; icon: React.ElementType }) => {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="glass-surface rounded-2xl p-8 text-center">
      <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="font-display text-4xl font-bold text-gradient-red md:text-5xl">
        {value}{suffix}
      </div>
      <div className="mt-3 font-body text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const stats = [
  { target: 10, suffix: "+", label: "Лет опыта", icon: Award },
  { target: 100, suffix: "%", label: "Гарантия на все работы", icon: Shield },
  { target: 1, suffix: " день", label: "Большинство работ — за день", icon: Clock },
  { target: 0, suffix: "", label: "Подбираем и привозим запчасти сами", icon: Wrench, isText: true },
];

const AdvantagesSection = () => (
  <section id="advantages" className="relative py-28">
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Почему мы"
        title="Преимущества"
      />

      <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.12}>
            {s.isText ? (
              <div className="glass-surface rounded-2xl p-8 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-gradient-red md:text-3xl">
                  Под ключ
                </div>
                <div className="mt-3 font-body text-sm text-muted-foreground">{s.label}</div>
              </div>
            ) : (
              <CountUpStat target={s.target} suffix={s.suffix} label={s.label} icon={s.icon} />
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
