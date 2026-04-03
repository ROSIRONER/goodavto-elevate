import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import CTAButtons from "./CTAButtons";
import { MapPin, Clock } from "lucide-react";

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>

    {/* Content */}
    <div className="container relative z-10 mx-auto px-6 py-32">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Автосервис · Новосибирск
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
        >
          Good<span className="text-gradient-red">Avto</span>
          <br />
          Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 mt-6 max-w-lg font-body text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Качественный ремонт вашего автомобиля. Без лишних слов —
          находим проблему, подбираем запчасти и делаем всё&nbsp;под&nbsp;ключ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <CTAButtons size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-6 font-body text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            ул. Мира 62В
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Ежедневно 10:00 – 20:00
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
