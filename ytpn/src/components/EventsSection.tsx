'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Events section for homepage showcasing upcoming and featured events
 * - Display featured events prominently with large cards
 * - Show upcoming events in a grid layout
 * - Support filtering by event type
 * - Responsive design with mobile optimization
 * - Integration with existing event card components
 * - Theme system support with proper contrast
 * - Call-to-action for viewing all events
 */

import { useState } from 'react';
import { Calendar, Filter, ArrowRight, Sparkles } from 'lucide-react';
import { 
  FeaturedEventCard, 
  StandardEventCard, 
  CompactEventCard,
  type EventData,
  type EventType,
  eventTypeConfig 
} from './EventCard';
import { events } from '@/db';

// Use the actual events data from the data layer
const allEvents: EventData[] = events.map(event => ({
  ...event,
  sponsors: event.sponsors || [
    {
      name: 'TechCorp',
      role: 'Platinum Sponsor',
      link: 'https://techcorp.com',
      headshot: '/assets/sponsors/techcorp.png',
      slug: 'techcorp'
    }
  ],
  organizers: event.organizers || ['YTPN Committee']
}));

export default function EventsSection() {
  const [selectedFilter, setSelectedFilter] = useState<EventType | 'all'>('all');
  
  // Get featured events (first 2 events)
  const featuredEvents = allEvents.slice(0, 2);
  
  // Get upcoming events (remaining events)
  const upcomingEvents = allEvents.slice(2);
  
  // Filter events based on selected filter
  const filteredEvents = selectedFilter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.eventType === selectedFilter);

  const eventTypes: (EventType | 'all')[] = ['all', 'conference', 'workshop', 'meetup', 'networking', 'seminar', 'hackathon', 'panel', 'keynote'];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Join our community of technical professionals at our upcoming events. 
            From conferences to workshops, there's something for everyone.
          </p>
        </div>

        {/* Featured Events */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <Sparkles className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold text-foreground">Featured Events</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <FeaturedEventCard 
                key={event.id} 
                event={event}
                className="w-full"
              />
            ))}
          </div>
        </div>

        {/* Filter and Upcoming Events */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4 sm:mb-0">
              All Upcoming Events
            </h3>
            
            {/* Event Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-foreground-tertiary" />
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedFilter === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background-tertiary text-foreground-tertiary hover:bg-background-secondary hover:text-foreground-secondary'
                      }
                    `}
                  >
                    {type === 'all' ? 'All Events' : eventTypeConfig[type].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <StandardEventCard 
                  key={event.id} 
                  event={event}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-foreground-tertiary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">
                No events found
              </h4>
              <p className="text-foreground-secondary">
                No events match your current filter. Try selecting a different event type.
              </p>
            </div>
          )}

          {/* View All Events CTA */}
          <div className="text-center mt-12">
            <a
              href="/events"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
            >
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Event Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allEvents.length}+
            </div>
            <div className="text-foreground-secondary">
              Upcoming Events
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allEvents.filter(e => e.isVirtual).length}
            </div>
            <div className="text-foreground-secondary">
              Virtual Events
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allEvents.reduce((sum, event) => sum + (event.capacity || 0), 0)}+
            </div>
            <div className="text-foreground-secondary">
              Total Capacity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
