'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Support multiple event card scales (compact, standard, featured)
 * - Accept comprehensive event data including time, location, title, description
 * - Support optional image, link, content, sponsors, tags, and organizers
 * - Adhere to theme system with proper dark/light mode support
 * - Maintain responsive design across all screen sizes
 * - Use semantic color naming and proper contrast ratios
 * - Support hover states and interactive elements
 * - Follow KISS principle with clean, maintainable code
 */

import { ReactNode } from 'react';
import { StandardEventCard } from './StandardEventCard';
import { FeaturedEventCard } from './FeaturedEventCard';
import { Event } from '../../db';

export type EventCardScale = 'standard' | 'featured';

// Extend the Event interface to include content property for React components
export interface EventData extends Event {
  content?: ReactNode;
}

export interface EventCardProps {
  event: EventData;
  scale?: EventCardScale;
  className?: string;
  onClick?: () => void;
}

// Event type styling configuration
export const eventTypeConfig: Record<
  Event['eventType'],
  {
    color: string;
    textColor: string;
    icon: string;
    label: string;
  }
> = {
  all: {
    color: 'bg-background-tertiary',
    textColor: 'text-foreground-tertiary',
    icon: '📅',
    label: 'All Events',
  },
  conference: {
    color: 'bg-primary',
    textColor: 'text-primary-foreground',
    icon: '🎯',
    label: 'Conference',
  },
  workshop: {
    color: 'bg-accent',
    textColor: 'text-accent-foreground',
    icon: '🛠️',
    label: 'Workshop',
  },
  meetup: {
    color: 'bg-success',
    textColor: 'text-success-foreground',
    icon: '👥',
    label: 'Meetup',
  },
  networking: {
    color: 'bg-info',
    textColor: 'text-info-foreground',
    icon: '🤝',
    label: 'Networking',
  },
  seminar: {
    color: 'bg-warning',
    textColor: 'text-warning-foreground',
    icon: '📚',
    label: 'Seminar',
  },
  hackathon: {
    color: 'bg-destructive',
    textColor: 'text-destructive-foreground',
    icon: '💻',
    label: 'Hackathon',
  },
  panel: {
    color: 'bg-primary-600',
    textColor: 'text-primary-foreground',
    icon: '🎤',
    label: 'Panel',
  },
  keynote: {
    color: 'bg-primary-800',
    textColor: 'text-primary-foreground',
    icon: '⭐',
    label: 'Keynote',
  },
  social: {
    color: 'bg-background-tertiary',
    textColor: 'text-foreground-tertiary',
    icon: '🎉',
    label: 'Social',
  },
};

// Export specialized event card components
export { StandardEventCard } from './StandardEventCard';
export { FeaturedEventCard } from './FeaturedEventCard';
