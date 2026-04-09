import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const floatingOrb = (
  x: string, y: string, size: string, opacity: string, delay: number
) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, hsl(0 78% 50% / ${opacity}), transparent 70%)`,
      filter: "blur(60px)",
    }}
    animate={{
      y: [0, -30, 0, 20, 0],
      scale: [1, 1.08, 1, 0.95, 1],
    }}
    transition={{
      duration: 18 + delay * 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="page-spotlights absolute inset-0" />
      <div className="page-grain absolute inset-0" />
      
      {/* Static noise blobs */}
      <div className="noise-blob absolute -right-16 top-[8%] h-[520px] w-[520px] opacity-[0.07]" />
      <div className="noise-blob absolute -left-24 top-[28%] h-[400px] w-[400px] opacity-[0.05]" />
      <div className="noise-blob absolute right-[10%] top-[48%] h-[350px] w-[350px] opacity-[0.04]" />
      <div className="noise-blob absolute left-[20%] top-[65%] h-[300px] w-[300px] opacity-[0.035]" />
      <div className="noise-blob absolute right-[5%] top-[78%] h-[450px] w-[450px] opacity-[0.06]" />
      <div className="noise-blob absolute -right-20 bottom-[-80px] h-[700px] w-[700px] opacity-[0.09]" />
      <div className="noise-blob absolute left-[40%] top-[15%] h-[280px] w-[280px] opacity-[0.03]" />
      
      {/* Floating animated orbs */}
      {floatingOrb("5%", "15%", "400px", "0.06", 0)}
      {floatingOrb("70%", "25%", "350px", "0.05", 3)}
      {floatingOrb("20%", "55%", "300px", "0.04", 6)}
      {floatingOrb("80%", "70%", "450px", "0.07", 2)}
      {floatingOrb("45%", "40%", "250px", "0.03", 8)}
    </div>

    <Header />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <AdvantagesSection />
    <ReviewsSection />
    <ContactsSection />
    <Footer />
  </div>
);

export default Index;
