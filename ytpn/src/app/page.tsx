import {
  HeroSection,
  ParticipateSection,
  AboutSection,
  PartnerSection,
  ProcessSection,
  FocusAreasSection,
  EventsSection,
  IndustriesSection,
} from '@/components';
export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <ProcessSection />
      <ParticipateSection />
      <IndustriesSection />
      <PartnerSection />
      <FocusAreasSection />
    </div>
  );
}
