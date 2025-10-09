import {
  
  HeroSection,
  ServicesSection,
  AboutSection,
  SponsorSection,
  ProcessSection,
  FocusAreasSection,
  EventsSection,
  JoinForm,
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <EventsSection />
      <SponsorSection />      
      <ProcessSection />
      <FocusAreasSection />
      <JoinForm />  

    </div>
  );
}
