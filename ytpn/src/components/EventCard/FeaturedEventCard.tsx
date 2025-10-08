'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Featured event card for hero sections and prominent displays
 * - Large, visually striking layout with emphasis on imagery
 * - Comprehensive information display with enhanced visual hierarchy
 * - Support for all event data including organizers and detailed content
 * - Premium styling with enhanced hover effects and animations
 * - Optimized for desktop viewing with responsive mobile adaptation
 * - Full theme system integration with enhanced visual appeal
 */

import { Calendar, MapPin, Clock, Users, ExternalLink, Tag, Building2, User } from 'lucide-react';
import { EventCardProps, eventTypeConfig } from './index';

export function FeaturedEventCard({ event, className = '', onClick }: EventCardProps) {
  const typeConfig = eventTypeConfig[event.eventType];
  
  return (
    <div 
      className={`
        bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl 
        transition-all duration-500 cursor-pointer group overflow-hidden
        max-w-lg w-full transform hover:-translate-y-1
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
      <div className="flex items-center justify-between mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${typeConfig.color} ${typeConfig.textColor}`}>
          <span className="mr-2 text-base">{typeConfig.icon}</span>
          {typeConfig.label}
        </div>
        {event.isVirtual && (
          <div className="text-sm text-foreground-tertiary bg-background-tertiary px-3 py-1 rounded-full">
            Virtual Event
          </div>
        )}
      </div>

      {/* Event Image */}
      {event.image && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* Event Title */}
      <h3 className="text-2xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Event Description */}
      <p className="text-lg text-foreground-secondary mb-6 line-clamp-4 leading-relaxed">
        {event.description}
      </p>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-foreground-tertiary">
          <Clock className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-medium">{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-foreground-tertiary sm:col-span-2">
          <MapPin className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="font-medium">{event.location}</span>
        </div>
        {event.capacity && (
          <div className="flex items-center text-sm text-foreground-tertiary sm:col-span-2">
            <Users className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium">Capacity: {event.capacity} attendees</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 4).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-background-tertiary text-foreground-tertiary border border-border"
              >
                <Tag className="w-4 h-4 mr-2" />
                {tag}
              </span>
            ))}
            {event.tags.length > 4 && (
              <span className="text-sm text-foreground-tertiary self-center">
                +{event.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sponsors */}
      {event.sponsors && event.sponsors.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center text-sm text-foreground-tertiary mb-3">
            <Building2 className="w-4 h-4 mr-2" />
            <span className="font-medium">Sponsored by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.sponsors.slice(0, 3).map((sponsor, index) => (
              <span 
                key={index}
                className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
              >
                {sponsor}
              </span>
            ))}
            {event.sponsors.length > 3 && (
              <span className="text-sm text-foreground-tertiary self-center">
                +{event.sponsors.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Organizers */}
      {event.organizers && event.organizers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center text-sm text-foreground-tertiary mb-3">
            <User className="w-4 h-4 mr-2" />
            <span className="font-medium">Organized by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.organizers.slice(0, 2).map((organizer, index) => (
              <span 
                key={index}
                className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
              >
                {organizer}
              </span>
            ))}
            {event.organizers.length > 2 && (
              <span className="text-sm text-foreground-tertiary self-center">
                +{event.organizers.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Price */}
      {event.price && (
        <div className="mb-6">
          <span className="text-2xl font-bold text-primary">
            {event.price}
          </span>
        </div>
      )}

      {/* Action Button */}
      {event.link && (
        <div className="flex items-center justify-between">
          <a 
            href={event.link}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>
      )}
    </div>
  );
}
