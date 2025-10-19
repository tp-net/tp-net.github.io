import {
  HeroSection,
  ParticipateSection,
  AboutSection,
  SponsorSection,
  ProcessSection,
  FocusAreasSection,
  EventsSection,
} from '@/components';
export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <ProcessSection />
      <ParticipateSection />
      <SponsorSection />
      <FocusAreasSection />
    </div>
  );
}
