'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Standard event card for main content areas and event listings
 * - Comprehensive information display with all available details
 * - Balanced layout with good visual hierarchy
 * - Support for images, tags, sponsors, and organizers
 * - Interactive elements with hover states
 * - Responsive design optimized for desktop and tablet
 * - Full theme system integration
 */

import { Calendar, MapPin, Clock, Users, ExternalLink, Tag, Building2 } from 'lucide-react';
import Link from 'next/link';
import { EventCardProps, eventTypeConfig } from './index';
import { formatEventDateTime } from '@/lib/date-utils';

export function StandardEventCard({ event, className = '', onClick }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.eventType];
  const { date, time } = formatEventDateTime(event.date);
  
  // Create the card content
  const cardContent = (
    <>
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
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Event Title */}
      <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Event Description */}
      <p className="text-base text-foreground-secondary mb-4 line-clamp-3">
        {event.description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{time}</span>
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

      {/* Sponsors */}
      {event.sponsors && event.sponsors.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-xs text-foreground-tertiary mb-2">
            <Building2 className="w-3 h-3 mr-1" />
            <span>Sponsored by:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {event.sponsors.slice(0, 2).map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {sponsor.name}
              </a>
            ))}
            {event.sponsors.length > 2 && (
              <span className="text-xs text-foreground-tertiary">
                +{event.sponsors.length - 2} more
              </span>
            )}
          </div>
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

      {/* Action Button - only show for external links when no slug */}
      {event.link && !event.slug && (
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
    </>
  );

  // If event has a slug, wrap the entire card in a Link
  if (event.slug) {
    return (
      <Link href={`/events/${event.slug}`} className="block">
        <div 
          className={`
            bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md 
            transition-all duration-300 cursor-pointer group overflow-hidden
            max-w-md w-full
            ${className}
          `}
          role="button"
          tabIndex={0}
        >
          {cardContent}
        </div>
      </Link>
    );
  }

  // Fallback for events without slugs - use onClick handler
  return (
    <div 
      className={`
        bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md 
        transition-all duration-300 cursor-pointer group overflow-hidden
        max-w-md w-full
        ${className}
      `}
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
      {cardContent}
    </div>
  );
}
