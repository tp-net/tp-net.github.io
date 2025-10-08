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

import { Calendar, MapPin, Clock, Users, ExternalLink, Tag } from 'lucide-react';
import { ReactNode } from 'react';
import { CompactEventCard } from './CompactEventCard';
import { StandardEventCard } from './StandardEventCard';
import { FeaturedEventCard } from './FeaturedEventCard';

// Event type definitions
export type EventType = 
  | 'conference' 
  | 'workshop' 
  | 'meetup' 
  | 'networking' 
  | 'seminar' 
  | 'hackathon' 
  | 'panel' 
  | 'keynote';

export type EventCardScale = 'compact' | 'standard' | 'featured';

export interface EventData {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  date: string;
  time: string;
  location: string;
  image?: string;
  link?: string;
  content?: ReactNode;
  sponsors?: string[];
  tags?: string[];
  organizers?: string[];
  capacity?: number;
  price?: string;
  isVirtual?: boolean;
}

export interface EventCardProps {
  event: EventData;
  scale?: EventCardScale;
  className?: string;
  onClick?: () => void;
}

// Event type styling configuration
export const eventTypeConfig = {
  conference: {
    color: 'bg-primary',
    textColor: 'text-primary-foreground',
    icon: '🎯',
    label: 'Conference'
  },
  workshop: {
    color: 'bg-accent',
    textColor: 'text-accent-foreground',
    icon: '🛠️',
    label: 'Workshop'
  },
  meetup: {
    color: 'bg-success',
    textColor: 'text-success-foreground',
    icon: '👥',
    label: 'Meetup'
  },
  networking: {
    color: 'bg-info',
    textColor: 'text-info-foreground',
    icon: '🤝',
    label: 'Networking'
  },
  seminar: {
    color: 'bg-warning',
    textColor: 'text-warning-foreground',
    icon: '📚',
    label: 'Seminar'
  },
  hackathon: {
    color: 'bg-destructive',
    textColor: 'text-destructive-foreground',
    icon: '💻',
    label: 'Hackathon'
  },
  panel: {
    color: 'bg-primary-600',
    textColor: 'text-primary-foreground',
    icon: '🎤',
    label: 'Panel'
  },
  keynote: {
    color: 'bg-primary-800',
    textColor: 'text-primary-foreground',
    icon: '⭐',
    label: 'Keynote'
  }
};

// Base EventCard component
export function EventCard({ event, scale = 'standard', className = '', onClick }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.eventType];
  
  const baseClasses = `
    bg-card border border-border rounded-lg shadow-sm hover:shadow-md 
    transition-all duration-300 cursor-pointer group overflow-hidden
    ${className}
  `;

  const scaleClasses = {
    compact: 'p-4 max-w-sm',
    standard: 'p-6 max-w-md',
    featured: 'p-8 max-w-lg'
  };

  const titleSizes = {
    compact: 'text-lg font-semibold',
    standard: 'text-xl font-bold',
    featured: 'text-2xl font-bold'
  };

  const descriptionSizes = {
    compact: 'text-sm',
    standard: 'text-base',
    featured: 'text-lg'
  };

  return (
    <div 
      className={`${baseClasses} ${scaleClasses[scale]}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Event Type Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeConfig.color} ${typeConfig.textColor}`}>
          <span className="mr-2">{typeConfig.icon}</span>
          {typeConfig.label}
        </div>
        {event.isVirtual && (
          <div className="text-xs text-foreground-tertiary bg-background-tertiary px-2 py-1 rounded">
            Virtual
          </div>
        )}
      </div>

      {/* Event Image */}
      {event.image && (
        <div className="mb-4 rounded-md overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Event Title */}
      <h3 className={`${titleSizes[scale]} text-card-foreground mb-3 group-hover:text-primary transition-colors`}>
        {event.title}
      </h3>

      {/* Event Description */}
      <p className={`${descriptionSizes[scale]} text-foreground-secondary mb-4 line-clamp-3`}>
        {event.description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-foreground-tertiary">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        {event.capacity && (
          <div className="flex items-center text-sm text-foreground-tertiary">
            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Capacity: {event.capacity}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-background-tertiary text-foreground-tertiary"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs text-foreground-tertiary">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Price */}
      {event.price && (
        <div className="mb-4">
          <span className="text-lg font-semibold text-primary">
            {event.price}
          </span>
        </div>
      )}

      {/* Action Button */}
      {event.link && (
        <div className="flex items-center justify-between">
          <a 
            href={event.link}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}

// Export specialized event card components
export { CompactEventCard } from './CompactEventCard';
export { StandardEventCard } from './StandardEventCard';
export { FeaturedEventCard } from './FeaturedEventCard';

// Export a factory function for creating event cards by scale
export function createEventCard(scale: EventCardScale) {
  switch (scale) {
    case 'compact':
      return CompactEventCard;
    case 'standard':
      return StandardEventCard;
    case 'featured':
      return FeaturedEventCard;
    default:
      return EventCard;
  }
}

// Export sample event data for testing and development
export const sampleEvents: EventData[] = [
  {
    id: '1',
    title: 'YTPN Annual Conference 2024',
    description: 'Join us for the biggest technical professional networking event of the year. Featuring keynote speakers, workshops, and networking opportunities.',
    eventType: 'conference',
    date: 'March 15, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Convention Center, Sydney',
    image: '/assets/images/hero.png',
    link: '#',
    tags: ['networking', 'keynote', 'workshop'],
    sponsors: ['TechCorp', 'InnovateLab'],
    organizers: ['YTPN Committee'],
    capacity: 500,
    price: '$150',
    isVirtual: false
  },
  {
    id: '2',
    title: 'React Workshop: Advanced Patterns',
    description: 'Deep dive into advanced React patterns and best practices for building scalable applications.',
    eventType: 'workshop',
    date: 'February 28, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Online',
    link: '#',
    tags: ['react', 'javascript', 'frontend'],
    capacity: 50,
    price: 'Free',
    isVirtual: true
  },
  {
    id: '3',
    title: 'Monthly Networking Meetup',
    description: 'Casual networking event for technical professionals to connect and share experiences.',
    eventType: 'meetup',
    date: 'February 20, 2024',
    time: '6:00 PM - 8:00 PM',
    location: 'The Hub, Melbourne',
    tags: ['networking', 'casual'],
    capacity: 100,
    price: 'Free'
  },
  {
    id: '4',
    title: 'AI & Machine Learning Panel',
    description: 'Expert panel discussion on the latest trends and challenges in AI and machine learning.',
    eventType: 'panel',
    date: 'March 5, 2024',
    time: '7:00 PM - 9:00 PM',
    location: 'Tech Hub, Brisbane',
    image: '/assets/images/team.png',
    link: '#',
    tags: ['ai', 'ml', 'panel'],
    sponsors: ['AI Solutions Inc'],
    capacity: 200,
    price: '$25'
  }
];