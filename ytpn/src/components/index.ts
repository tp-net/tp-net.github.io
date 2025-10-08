export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as HeroSection } from './HeroSection';
export { default as ServicesSection } from './ServicesSection';
export { default as AboutSection } from './AboutSection';
export { default as SponsorSection } from './SponsorSection';
export { default as RegisterInterestSection } from './forms/RegisterInterestSection';
export { default as BaseEmbedableForm } from './forms/BaseEmbedableForm';
export { default as BlogSection } from './BlogSection';
export { default as ProcessSection } from './ProcessSection';
export { default as FocusAreasSection } from './FocusAreasSection';
export { default as ClientsSection } from './ClientsSection';

// Theme components
export { ThemeProvider, useTheme } from './providers/ThemeProvider';
export { ClientThemeProvider } from './providers/ClientThemeProvider';
export { ThemeToggle } from './ui/ThemeToggle';
export { SimpleThemeToggle } from './ui/SimpleThemeToggle';

// MDX components are now handled by @next/mdx automatically via mdx-components.tsx

// Icon components
export { Icon, type IconProps } from './icons/Icon';
export { LinkedInIcon, type LinkedInIconProps } from './icons/LinkedInIcon';
export { FacebookIcon, type FacebookIconProps } from './icons/FacebookIcon';