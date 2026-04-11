import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import CTAButtons from "./CTAButtons";
import {
  Settings, Cog, Thermometer, Droplets,
  ClipboardCheck, Disc, Wind, Snowflake,
  CircleDot, Zap,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setIsModalOpen(true)}
                className="glass-surface group relative flex h-full w-full flex-col items-center gap-4 rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_hsl(0_78%_50%_/_0.2)]"
              >
                <div className="rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-5px_hsl(0_78%_50%_/_0.3)]">
                  <s.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="font-body text-sm font-medium leading-tight">{s.name}</span>
              </motion.button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md border-border bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Рассчитаем точную стоимость</DialogTitle>
            <DialogDescription className="pt-2 font-body text-sm leading-relaxed text-muted-foreground">
              Стоимость работ зависит от марки автомобиля, состояния и объёма задачи.
              <br />
              Свяжитесь с нами — быстро рассчитаем точную цену и подскажем по срокам.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <CTAButtons />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
