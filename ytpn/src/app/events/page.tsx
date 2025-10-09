import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/db';
import { APP_CONSTS } from '@/db/app';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

export const metadata = {
  title: `Events - ${APP_CONSTS.APP_NAME}`,
  description: `Discover upcoming events, conferences, workshops, and networking opportunities for young technical professionals.`,
};

export default function EventsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Join us for exciting events designed to help you grow professionally, 
            learn new skills, and connect with fellow technical professionals.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No Events Scheduled
              </h2>
              <p className="text-foreground-secondary">
                Check back soon for upcoming events and networking opportunities.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border group"
                >
                  {event.image && (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {event.eventType}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-foreground-secondary mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-foreground-secondary">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    {event.tags && event.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-background-secondary text-foreground-secondary px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
