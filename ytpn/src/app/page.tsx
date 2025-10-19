import {
  HeroSection,
  ParticipateSection,
  AboutSection,
  SponsorSection,
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
      <SponsorSection />
      <FocusAreasSection />
    </div>
  );
}
