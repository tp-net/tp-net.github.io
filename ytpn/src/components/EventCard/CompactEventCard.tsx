'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Compact event card for lists and grid layouts
 * - Minimal information display with essential details only
 * - Optimized for space efficiency while maintaining readability
 * - Support for event type badges and basic interaction
 * - Responsive design for mobile and desktop
 * - Adhere to theme system with proper contrast
 */

import { Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { EventCardProps, eventTypeConfig } from './index';
import { formatEventDateTime } from '@/lib/date-utils';
import { ShareButton } from '@/components/ShareButton';
import { getEventSlug } from '@/db/typesAndFunctions/eventUtils';
import { APP_CONSTS } from '@/db/app';

export function CompactEventCard({ event, className = '', onClick }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.eventType];
  const { date, time } = formatEventDateTime(event.date);
  
  // Generate the event URL for sharing
  const eventUrl = event.slug 
    ? `${APP_CONSTS.APP_URL}/events/${getEventSlug(event)}`
    : event.link || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Create the card content
  const cardContent = (
    <>
      {/* Event Type Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color} ${typeConfig.textColor}`}>
          <span className="mr-1 text-xs">{typeConfig.icon}</span>
          {typeConfig.label}
        </div>
        {event.isVirtual && (
          <div className="text-xs text-foreground-tertiary bg-background-tertiary px-2 py-1 rounded">
            Virtual
          </div>
        )}
      </div>

      {/* Event Title */}
      <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {event.title}
      </h3>

      {/* Event Description */}
      <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
        {event.description}
      </p>

      {/* Essential Event Details */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center text-xs text-foreground-tertiary">
          <Calendar className="w-3 h-3 mr-2 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-xs text-foreground-tertiary">
          <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-xs text-foreground-tertiary">
          <MapPin className="w-3 h-3 mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Price */}
      {event.price && (
        <div className="mb-2">
          <span className="text-sm font-semibold text-primary">
            {event.price}
          </span>
        </div>
      )}

      {/* Single Tag */}
      {event.tags && event.tags.length > 0 && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-background-tertiary text-foreground-tertiary">
            {event.tags[0]}
          </span>
          {event.tags.length > 1 && (
            <span className="text-xs text-foreground-tertiary ml-1">
              +{event.tags.length - 1}
            </span>
          )}
        </div>
      )}

      {/* Single Sponsor (minimal display) */}
      {event.sponsors && event.sponsors.length > 0 && (
        <div className="mb-2">
          <Link
            href={`/sponsors/${event.sponsors[0].slug}`}
            className="text-xs text-primary hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Sponsored by {event.sponsors[0].name}
          </Link>
          {event.sponsors.length > 1 && (
            <span className="text-xs text-foreground-tertiary ml-1">
              +{event.sponsors.length - 1} more
            </span>
          )}
        </div>
      )}

      {/* Share Button */}
      <div className="flex justify-end">
        <ShareButton
          eventTitle={event.title}
          eventUrl={eventUrl}
          eventDate={date}
          eventLocation={event.location}
          size="sm"
        />
      </div>
    </>
  );

  // If event has a slug, wrap the entire card in a Link
  if (event.slug) {
    return (
      <Link 
        href={`/events/${getEventSlug(event)}`} 
        className="block"
        onClick={(e) => {
          // Check if the click originated from an interactive element that should prevent navigation
          const target = e.target as HTMLElement;
          const isInteractiveElement = target.closest('[data-prevent-navigation]');
          if (isInteractiveElement) {
            e.preventDefault();
          }
        }}
      >
        <div 
          className={`
            bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md 
            transition-all duration-300 cursor-pointer group overflow-hidden
            max-w-sm w-full
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
        bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md 
        transition-all duration-300 cursor-pointer group overflow-hidden
        max-w-sm w-full
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
