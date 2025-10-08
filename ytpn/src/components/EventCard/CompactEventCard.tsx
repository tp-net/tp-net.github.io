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
import { EventCardProps, eventTypeConfig } from './index';

export function CompactEventCard({ event, className = '', onClick }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.eventType];
  
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
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-xs text-foreground-tertiary">
          <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
          <span>{event.time}</span>
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
    </div>
  );
}
