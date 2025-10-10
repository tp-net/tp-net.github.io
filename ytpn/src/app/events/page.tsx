'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Filter, Sparkles, Download } from 'lucide-react';
import { events } from '@/db/data/events';
import { EVENT_TYPES, Event as EventType } from '@/db/typesAndFunctions/events';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';
import { 
  FeaturedEventCard, 
  StandardEventCard,
  type EventData,

  eventTypeConfig 
} from '@/components/EventCard';
import { MultipleEventsICalButton } from '@/components/ICalDownloadButton';



// Use the actual events data from the data layer
const allEvents: EventData[] = events.map((event: EventType) => ({
  ...event,
  sponsors: event.sponsors || [] ,
  organizers: event.organizers || ['YTPN']
}));

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState<EventType['eventType'] | 'all'>('all');
  
  // Get featured events (first 2 events)
  const featuredEvents = allEvents.slice(0, 2);
  
  // Get upcoming events (remaining events)
  const upcomingEvents = allEvents.slice(2);
  
  // Filter events based on selected filter (filter all events, not just upcoming)
  const filteredEvents = selectedFilter === 'all' 
    ? allEvents 
    : allEvents.filter(event => event.eventType === selectedFilter);



  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <MetadataBreadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Events' }
            ]}
          />
        </div>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 mx-auto">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Join us for exciting events designed to help you grow professionally, 
            learn new skills, and connect with fellow technical professionals.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {allEvents.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No Events Scheduled
              </h2>
              <p className="text-foreground-secondary">
                Check back soon for upcoming events and networking opportunities.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Events */}
              {featuredEvents.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center mb-8">
                    <Sparkles className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">Featured Events</h2>
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
              )}

              {/* Filter and All Events */}
              <div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">
                      All Events
                    </h2>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {selectedFilter === 'all' 
                        ? `Showing ${filteredEvents.length} of ${allEvents.length} events`
                        : `Showing ${filteredEvents.length} ${eventTypeConfig[selectedFilter]?.label.toLowerCase()} event${filteredEvents.length !== 1 ? 's' : ''}`
                      }
                    </p>
                  </div>
                  
                  {/* Download All Events Button */}
                  {allEvents.length > 0 && (
                    <div className="flex items-center gap-4">
                      <MultipleEventsICalButton 
                        events={allEvents}
                        className="bg-background-secondary text-foreground border border-border hover:bg-background-tertiary"
                      >
                        <Download className="w-4 h-4" />
                        Download All Events
                      </MultipleEventsICalButton>
                    </div>
                  )}
                  
                  {/* Event Type Filter */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-foreground-tertiary" />
                      <span className="text-sm font-medium text-foreground-secondary">Filter by type:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* All Events Button */}
                      <button
                        onClick={() => setSelectedFilter('all')}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                          border border-transparent
                          ${selectedFilter === 'all'
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                            : 'bg-background-tertiary text-foreground-tertiary hover:bg-background-secondary hover:text-foreground-secondary border-border hover:border-border-strong'
                          }
                        `}
                      >
                        All Events
                      </button>
                      {/* Event Type Buttons */}
                      {Object.values(EVENT_TYPES).filter(type => type !== 'all').map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedFilter(type)}
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                            border border-transparent
                            ${selectedFilter === type
                              ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                              : 'bg-background-tertiary text-foreground-tertiary hover:bg-background-secondary hover:text-foreground-secondary border-border hover:border-border-strong'
                            }
                          `}
                        >
                          {eventTypeConfig[type].label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No events found
                    </h3>
                    <p className="text-foreground-secondary">
                      No events match your current filter. Try selecting a different event type.
                    </p>
                  </div>
                )}
              </div>

              {/* Event Statistics */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {allEvents.length}+
                  </div>
                  <div className="text-foreground-secondary">
                    Upcoming Events
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {allEvents.filter(e => e.isVirtual).length}
                  </div>
                  <div className="text-foreground-secondary">
                    Virtual Events
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {allEvents.reduce((sum, event) => sum + (event.capacity || 0), 0)}+
                  </div>
                  <div className="text-foreground-secondary">
                    Total Capacity
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
