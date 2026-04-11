import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import { useCountUp } from "@/hooks/useCountUp";
import { Shield, Zap, Wrench, Award } from "lucide-react";

const CountUpStat = ({ target, suffix, label, icon: Icon }: { target: number; suffix: string; label: string; icon: React.ElementType }) => {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="glass-surface flex h-full min-h-[220px] flex-col items-center rounded-2xl p-6 pt-8 text-center">
      <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex min-h-[42px] items-center">
        <div className="font-display text-2xl font-bold text-gradient-red md:text-3xl">
          {value}{suffix}
        </div>
      </div>
      <div className="mt-auto flex min-h-[40px] items-center pt-3 font-body text-xs leading-snug text-muted-foreground md:text-sm">{label}</div>
    </div>
  );
};

const TextStat = ({ label, text, icon: Icon }: { label: string; text: string; icon: React.ElementType }) => (
  <div className="glass-surface flex h-full min-h-[220px] flex-col items-center rounded-2xl p-6 pt-8 text-center">
    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div className="flex min-h-[42px] items-center">
      <div className="font-display text-2xl font-bold text-gradient-red md:text-3xl">
        {text}
      </div>
    </div>
    <div className="mt-auto flex min-h-[40px] items-center pt-3 font-body text-xs leading-snug text-muted-foreground md:text-sm">{label}</div>
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
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Почему мы"
        title="Преимущества"
      />

      <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="h-full"
            >
              {'target' in s ? (
                <CountUpStat target={s.target!} suffix={s.suffix!} label={s.label} icon={s.icon} />
              ) : (
                <TextStat text={s.text!} label={s.label} icon={s.icon} />
              )}
            </motion.div>
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
