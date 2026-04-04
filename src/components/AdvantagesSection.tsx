import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import { useCountUp } from "@/hooks/useCountUp";

const CountUpStat = ({ target, suffix, label }: { target: number; suffix: string; label: string }) => {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="glass-surface rounded-2xl p-8 text-center">
      <div className="font-display text-4xl font-bold text-gradient-red md:text-5xl">
        {value}{suffix}
      </div>
      <div className="mt-3 font-body text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const stats = [
  { target: 10, suffix: "+", label: "Лет опыта" },
  { target: 100, suffix: "%", label: "Гарантия на работы" },
  { target: 1, suffix: " день", label: "Срок большинства работ" },
  { target: 500, suffix: "+", label: "Довольных клиентов" },
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
            {s.isSymbol ? (
              <div className="glass-surface rounded-2xl p-8 text-center">
                <div className="font-display text-4xl font-bold text-gradient-red md:text-5xl">
                  ∞
                </div>
                <div className="mt-3 font-body text-sm text-muted-foreground">{s.label}</div>
              </div>
            ) : (
              <CountUpStat target={s.target} suffix={s.suffix} label={s.label} />
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
