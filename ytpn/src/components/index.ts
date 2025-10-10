export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as HeroSection } from './HeroSection';
export { default as ServicesSection } from './ServicesSection';
export { default as AboutSection } from './AboutSection';
export { default as SponsorSection } from './SponsorSection';
export { default as JoinForm } from './forms/JoinForm';
export { default as BaseEmbedableForm } from './forms/BaseEmbedableForm';
export { default as BlogSection } from './BlogSection';
export { default as ProcessSection } from './ProcessSection';
export { default as FocusAreasSection } from './FocusAreasSection';
export { default as ClientsSection } from './ClientsSection';
export { default as EventsSection } from './EventsSection';
export { default as TypewriterAnimation } from './TypewriterAnimation';

// Theme components
export { ThemeProvider, useTheme } from './providers/ThemeProvider';
export { ClientThemeProvider } from './providers/ClientThemeProvider';
export { ThemeToggle } from './ui/ThemeToggle';
export { SimpleThemeToggle } from './ui/SimpleThemeToggle';

// UI components
export { MetadataBreadcrumb, useBreadcrumbs } from './ui/metadata-breadcrumb';
export { StructuredBreadcrumb } from './ui/structured-breadcrumb';

// MDX components are now handled by @next/mdx automatically via mdx-components.tsx

// Icon components
export { Icon, type IconProps } from './icons/Icon';
export { LinkedInIcon, type LinkedInIconProps } from './icons/LinkedInIcon';
export { FacebookIcon, type FacebookIconProps } from './icons/FacebookIcon';

// Event Card components
export { 
  EventCard, 
  CompactEventCard, 
  StandardEventCard, 
  FeaturedEventCard,
  createEventCard,
  sampleEvents,
  type EventData,
  type EventCardProps,
  type EventType,
  type EventCardScale
} from './EventCard';