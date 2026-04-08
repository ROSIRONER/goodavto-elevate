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
      <div className="noise-blob absolute -right-16 top-[8%] h-[420px] w-[420px] opacity-[0.05]" />
      <div className="noise-blob absolute -left-24 top-[32%] h-[340px] w-[340px] opacity-[0.032]" />
      <div className="noise-blob absolute right-[12%] top-[58%] h-[260px] w-[260px] opacity-[0.028]" />
      <div className="noise-blob absolute left-[18%] bottom-[18%] h-[300px] w-[300px] opacity-[0.026]" />
      <div className="noise-blob absolute -right-20 bottom-[-80px] h-[620px] w-[620px] opacity-[0.065]" />
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
