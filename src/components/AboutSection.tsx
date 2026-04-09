import { motion } from "framer-motion";
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
    <div className="container mx-auto px-6">
      <SectionHeading
        label="О нас"
        title="Больше, чем просто сервис"
        subtitle="Мы делаем ремонт автомобилей качественно, быстро и по-честному. Уже более 10 лет клиенты доверяют нам свои машины."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <AnimatedSection key={v.title} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="glass-surface group relative rounded-2xl p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_hsl(0_78%_50%_/_0.15)]"
            >
              <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-5px_hsl(0_78%_50%_/_0.25)]">
                <v.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold">{v.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
