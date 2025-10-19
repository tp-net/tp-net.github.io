import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { events } from '@/db/data/events';
import { formatEventDateTime } from '@/lib/date-utils';
import type { Event as EventType } from '@/db/typesAndFunctions/events';
import { getEventSlug } from '@/db/typesAndFunctions/eventUtils';

export default function EventsSection() {
  // Show only the first 3 events for homepage preview
  const previewEvents = events.slice(0, 3);

  return (
    <section className='py-16 bg-background-secondary'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
            <Calendar className='w-8 h-8 text-primary' />
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            Upcoming Events
          </h2>
          <p className='text-lg text-foreground-secondary max-w-2xl mx-auto'>
            Join our community of technical professionals at our upcoming
            events. From conferences to workshops, there's something for
            everyone.
          </p>
        </div>

        {/* Events Grid */}
        {previewEvents.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {previewEvents.map((event: EventType) => {
              const { date, time } = formatEventDateTime(event.date);
              return (
                <Link
                  key={event.slug}
                  href={`/events/${getEventSlug(event)}`}
                  className='bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-border group'
                >
                  {event.image && (
                    <div className='aspect-video relative overflow-hidden rounded-t-lg'>
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute top-4 left-4'>
                        <span className='bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium'>
                          {event.eventType}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors'>
                      {event.title}
                    </h3>

                    <p className='text-foreground-secondary mb-4 line-clamp-3'>
                      {event.description}
                    </p>

                    <div className='space-y-2 text-sm text-foreground-secondary'>
                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span>{date}</span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        <span>{time}</span>
                      </div>

                      <div className='flex items-center gap-2'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.tags && event.tags.length > 0 && (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='bg-background-secondary text-foreground-secondary px-2 py-1 rounded text-xs'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className='text-center py-12'>
            <Calendar className='w-16 h-16 text-foreground-tertiary mx-auto mb-4' />
            <h4 className='text-xl font-semibold text-foreground mb-2'>
              No events scheduled
            </h4>
            <p className='text-foreground-secondary'>
              Check back soon for upcoming events and networking opportunities.
            </p>
          </div>
        )}

        {/* View All Events CTA */}
        <div className='text-center'>
          <Link
            href='/events'
            className='inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg'
          >
            View All Events
            <ArrowRight className='w-5 h-5 ml-2' />
          </Link>
        </div>
      </div>
    </section>
  );
}
