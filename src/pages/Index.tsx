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
    {/* Noise accents scattered across the page */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="noise-blob absolute -right-20 -top-20 h-[500px] w-[500px] opacity-[0.035]" />
      <div className="noise-blob absolute -left-32 top-[35%] h-[400px] w-[400px] opacity-[0.025]" />
      <div className="noise-blob absolute right-0 top-[55%] h-[450px] w-[450px] opacity-[0.03]" />
      <div className="noise-blob absolute -left-20 bottom-[10%] h-[350px] w-[350px] opacity-[0.02]" />
      <div className="noise-blob absolute -right-10 bottom-0 h-[500px] w-[500px] opacity-[0.04]" />
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
  </div>
);

export default Index;
