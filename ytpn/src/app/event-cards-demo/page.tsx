'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Demo page showcasing all event card scales and types
 * - Responsive grid layouts for different screen sizes
 * - Interactive examples with sample event data
 * - Theme system integration demonstration
 * - Accessibility testing and keyboard navigation
 * - Mobile-first responsive design validation
 */

import { 
  EventCard, 
  CompactEventCard, 
  StandardEventCard, 
  FeaturedEventCard,
  sampleEvents,
  type EventData,
  type EventCardScale
} from '@/components';
import { useState } from 'react';

export default function EventCardsDemoPage() {
  const [selectedScale, setSelectedScale] = useState<EventCardScale>('standard');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    console.log('Event clicked:', event);
  };

  const renderEventCards = () => {
    switch (selectedScale) {
      case 'compact':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sampleEvents.map((event) => (
              <CompactEventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        );
      case 'standard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <StandardEventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        );
      case 'featured':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sampleEvents.map((event) => (
              <FeaturedEventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                scale={selectedScale}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-secondary border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Event Cards Demo
          </h1>
          <p className="text-lg text-foreground-secondary mb-6">
            Showcasing different event card scales and types with responsive design
          </p>
          
          {/* Scale Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['compact', 'standard', 'featured'] as EventCardScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => setSelectedScale(scale)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedScale === scale
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background-tertiary text-foreground hover:bg-background-muted'
                }`}
              >
                {scale.charAt(0).toUpperCase() + scale.slice(1)}
              </button>
            ))}
          </div>

          {/* Event Type Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
            {[
              { type: 'conference', label: 'Conference', icon: '🎯' },
              { type: 'workshop', label: 'Workshop', icon: '🛠️' },
              { type: 'meetup', label: 'Meetup', icon: '👥' },
              { type: 'networking', label: 'Networking', icon: '🤝' },
              { type: 'seminar', label: 'Seminar', icon: '📚' },
              { type: 'hackathon', label: 'Hackathon', icon: '💻' },
              { type: 'panel', label: 'Panel', icon: '🎤' },
              { type: 'keynote', label: 'Keynote', icon: '⭐' }
            ].map(({ type, label, icon }) => (
              <div key={type} className="flex items-center p-2 bg-background-tertiary rounded">
                <span className="mr-1">{icon}</span>
                <span className="text-foreground-tertiary">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Responsive Design Info */}
        <div className="bg-background-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Responsive Design Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-foreground-secondary">
            <div>
              <h3 className="font-medium text-foreground mb-2">Mobile (320px+)</h3>
              <ul className="space-y-1">
                <li>• Single column layout</li>
                <li>• Optimized touch targets</li>
                <li>• Condensed information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Tablet (768px+)</h3>
              <ul className="space-y-1">
                <li>• 2-3 column grid</li>
                <li>• Enhanced spacing</li>
                <li>• Full information display</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Desktop (1024px+)</h3>
              <ul className="space-y-1">
                <li>• 3-4 column grid</li>
                <li>• Hover effects</li>
                <li>• Premium animations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Event Cards Display */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)} Scale Event Cards
          </h2>
          {renderEventCards()}
        </section>

        {/* Selected Event Info */}
        {selectedEvent && (
          <section className="mt-12">
            <div className="bg-background-secondary rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Selected Event Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-foreground">Title:</strong>
                  <p className="text-foreground-secondary">{selectedEvent.title}</p>
                </div>
                <div>
                  <strong className="text-foreground">Type:</strong>
                  <p className="text-foreground-secondary">{selectedEvent.eventType}</p>
                </div>
                <div>
                  <strong className="text-foreground">Date:</strong>
                  <p className="text-foreground-secondary">{selectedEvent.date}</p>
                </div>
                <div>
                  <strong className="text-foreground">Location:</strong>
                  <p className="text-foreground-secondary">{selectedEvent.location}</p>
                </div>
                <div className="md:col-span-2">
                  <strong className="text-foreground">Description:</strong>
                  <p className="text-foreground-secondary">{selectedEvent.description}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Theme System Integration */}
        <section className="mt-12">
          <div className="bg-background-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Theme System Integration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">Color System</h3>
                <ul className="text-sm text-foreground-secondary space-y-1">
                  <li>• Semantic color naming (primary, secondary, accent)</li>
                  <li>• Automatic dark/light mode adaptation</li>
                  <li>• WCAG 2.1 compliant contrast ratios</li>
                  <li>• Smooth theme transitions (300ms)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Accessibility</h3>
                <ul className="text-sm text-foreground-secondary space-y-1">
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader friendly</li>
                  <li>• Focus indicators</li>
                  <li>• ARIA labels and roles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
