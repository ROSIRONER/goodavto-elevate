import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import {
  Settings, Cog, Thermometer, Droplets,
  ClipboardCheck, Disc, Wind, Snowflake,
  CircleDot, Zap,
} from "lucide-react";

const services = [
  { icon: Settings, name: "Ремонт ходовой части" },
  { icon: Cog, name: "Ремонт ДВС" },
  { icon: Thermometer, name: "Ремонт системы охлаждения" },
  { icon: Droplets, name: "Замена масла" },
  { icon: ClipboardCheck, name: "Техническое обслуживание" },
  { icon: Disc, name: "Ремонт тормозной системы" },
  { icon: Wind, name: "Ремонт автокондиционеров" },
  { icon: Snowflake, name: "Заправка автокондиционеров" },
  { icon: CircleDot, name: "Токарные работы" },
  { icon: Zap, name: "Сварка аргоном" },
];

const ServicesSection = () => (
  <section id="services" className="relative py-28 overflow-hidden">
    <div className="container mx-auto px-6">
      <SectionHeading
        label="Услуги"
        title="Что мы делаем"
        subtitle="Работаем со всеми видами легкового транспорта, а также обслуживаем легкий коммерческий транспорт"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s, i) => (
          <AnimatedSection key={s.name} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="glass-surface group relative flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(0_78%_50%_/_0.2)]"
            >
              <div className="rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-5px_hsl(0_78%_50%_/_0.3)]">
                <s.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="font-body text-sm font-medium leading-tight">{s.name}</span>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
