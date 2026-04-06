import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Shield, Wrench, Heart } from "lucide-react";

const values = [
  { icon: Shield, title: "Честный подход", desc: "Не навязываем лишнего. Делаем только то, что действительно нужно." },
  { icon: Wrench, title: "Запчасти под ключ", desc: "Вам не нужно искать детали — мы подберём и установим всё сами." },
  { icon: Heart, title: "Забота о клиенте", desc: "Объясняем каждый шаг и согласовываем стоимость заранее." },
];

const AboutSection = () => (
  <section id="about" className="relative py-28 overflow-hidden">
    <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 600px 450px at 5% 70%, hsl(0 78% 50% / 0.06), transparent), radial-gradient(ellipse 400px 300px at 90% 20%, hsl(0 0% 100% / 0.02), transparent)' }} />
    <div className="container mx-auto px-6">
      <SectionHeading
        label="О нас"
        title="Больше, чем просто сервис"
        subtitle="Мы делаем ремонт автомобилей качественно, быстро и по-честному. Уже более 10 лет клиенты доверяют нам свои машины."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <AnimatedSection key={v.title} delay={i * 0.15}>
            <div className="glass-surface group relative rounded-2xl p-8 transition-all duration-300 hover:border-primary/20">
              <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold">{v.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
