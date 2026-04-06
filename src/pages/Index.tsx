import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    {/* Noise blobs */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="noise-blob absolute -right-20 -top-20 h-[500px] w-[500px] opacity-[0.04]" />
      <div className="noise-blob absolute -left-32 top-[30%] h-[450px] w-[450px] opacity-[0.03]" />
      <div className="noise-blob absolute right-0 top-[50%] h-[500px] w-[500px] opacity-[0.035]" />
      <div className="noise-blob absolute -left-20 bottom-[15%] h-[400px] w-[400px] opacity-[0.025]" />
      <div className="noise-blob absolute -right-10 bottom-0 h-[550px] w-[550px] opacity-[0.045]" />
    </div>

    {/* Animated ambient orbs */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-[200px] top-[15%] h-[600px] w-[600px] rounded-full opacity-100"
        style={{ background: 'radial-gradient(circle, hsl(0 78% 50% / 0.07), transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -25, 15, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.05, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[150px] top-[40%] h-[700px] w-[700px] rounded-full opacity-100"
        style={{ background: 'radial-gradient(circle, hsl(0 78% 50% / 0.05), transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[20%] top-[65%] h-[500px] w-[500px] rounded-full opacity-100"
        style={{ background: 'radial-gradient(circle, hsl(0 78% 50% / 0.04), transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -15, 25, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[100px] bottom-[5%] h-[600px] w-[600px] rounded-full opacity-100"
        style={{ background: 'radial-gradient(circle, hsl(0 78% 50% / 0.06), transparent 70%)' }}
      />
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
