import {
  
  HeroSection,
  ServicesSection,
  AboutSection,
  SponsorSection,
  ProcessSection,
  FocusAreasSection,
  EventsSection,
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <EventsSection />
      <ServicesSection />
      <FocusAreasSection />
      <SponsorSection />      
      <AboutSection />
      <ProcessSection />

    </div>
  );
}
