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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="page-spotlights absolute inset-0" />
      <div className="page-grain absolute inset-0" />
      <div className="noise-blob absolute -right-16 top-[8%] h-[520px] w-[520px] opacity-[0.06]" />
      <div className="noise-blob absolute -left-24 top-[28%] h-[400px] w-[400px] opacity-[0.04]" />
      <div className="noise-blob absolute right-[10%] top-[48%] h-[350px] w-[350px] opacity-[0.035]" />
      <div className="noise-blob absolute left-[20%] top-[65%] h-[300px] w-[300px] opacity-[0.03]" />
      <div className="noise-blob absolute right-[5%] top-[78%] h-[450px] w-[450px] opacity-[0.05]" />
      <div className="noise-blob absolute -right-20 bottom-[-80px] h-[700px] w-[700px] opacity-[0.08]" />
      <div className="noise-blob absolute left-[40%] top-[15%] h-[280px] w-[280px] opacity-[0.025]" />
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
