'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { Event } from '@/db/typesAndFunctions/events';
import { formatEventDateTime } from '@/lib/date-utils';
import { SingleEventICalButton } from '@/components/ICalDownloadButton';
import { ShareButton } from '@/components/ShareButton';
import TicketWidget from '@/components/HiEvents/TicketWidget';
import Modal from '@/components/ui/Modal';
import NominationForm from '@/components/forms/NominationForm';

interface EventPageClientProps {
  event: Event;
  eventUrl: string;
}

export default function EventPageClient({
  event,
  eventUrl,
}: EventPageClientProps) {
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);
  const { date, time } = formatEventDateTime(event.date);

  return (
    <>
      <div className='max-w-4xl mx-auto'>
        {/* Event Header */}
        <div className='bg-card rounded-lg shadow-lg border border-border overflow-hidden'>
          {event.image && (
            <div className='aspect-video relative'>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className='object-cover'
              />
              <div className='absolute top-6 left-6'>
                <span className='bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium'>
                  {event.eventType}
                </span>
              </div>
            </div>
          )}

          <div className='p-8'>
            <h1 className='text-4xl md:text-5xl font-bold text-card-foreground mb-6'>
              {event.title}
            </h1>

            <p className='text-xl text-foreground-secondary mb-8 leading-relaxed'>
              {event.description}
            </p>

            {/* Event Details Content */}
            {event.details && (
              <div className='mb-8'>
                <h2 className='text-2xl font-semibold text-card-foreground mb-4'>
                  Event Details
                </h2>
                <div className='prose prose-lg max-w-none text-foreground-secondary leading-relaxed'>
                  <p className='whitespace-pre-line'>{event.details}</p>
                </div>
              </div>
            )}

            {/* Event Information */}
            <div className='grid md:grid-cols-2 gap-6 mb-8'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-primary'
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
                  </div>
                  <div>
                    <p className='text-sm text-foreground-secondary'>Date</p>
                    <p className='font-semibold text-card-foreground'>{date}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-primary'
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
                  </div>
                  <div>
                    <p className='text-sm text-foreground-secondary'>Time</p>
                    <p className='font-semibold text-card-foreground'>{time}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-primary'
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
                  </div>
                  <div>
                    <p className='text-sm text-foreground-secondary'>
                      Location
                    </p>
                    <p className='font-semibold text-card-foreground'>
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {event.capacity && (
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-foreground-secondary'>
                        Capacity
                      </p>
                      <p className='font-semibold text-card-foreground'>
                        {event.capacity} attendees
                      </p>
                    </div>
                  </div>
                )}

                {event.price && (
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-foreground-secondary'>Price</p>
                      <p className='font-semibold text-card-foreground'>
                        {event.price}
                      </p>
                    </div>
                  </div>
                )}

                {event.isVirtual && (
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 text-primary'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-foreground-secondary'>
                        Format
                      </p>
                      <p className='font-semibold text-card-foreground'>
                        Virtual Event
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-card-foreground mb-3'>
                  Tags
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='bg-background-secondary text-foreground-secondary px-3 py-1 rounded-full text-sm'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {event.hiEventsId && (
              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-card-foreground mb-3'>
                  Tickets
                </h3>
                <div className='rounded-lg overflow-hidden'>
                  <TicketWidget eventId={event.hiEventsId} />
                </div>
              </div>
            )}

            {/* Organizers */}
            {event.organizers && event.organizers.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-card-foreground mb-3'>
                  Organizers
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {event.organizers.map((organizer, index) => (
                    <span
                      key={index}
                      className='bg-primary/10 text-primary px-3 py-1 rounded-full text-sm'
                    >
                      {organizer}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsors */}
            {event.sponsors && event.sponsors.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-lg font-semibold text-card-foreground mb-3'>
                  Event Sponsors
                </h3>
                <div className='flex flex-wrap gap-4'>
                  {event.sponsors.map((sponsor, index) => (
                    <Link
                      key={index}
                      href={`/partners/${sponsor.slug}`}
                      className='flex items-center gap-2 bg-background-secondary rounded-lg p-3 hover:bg-background-secondary/80 transition-colors'
                    >
                      <Image
                        src={sponsor.headshot}
                        alt={sponsor.name}
                        width={32}
                        height={32}
                        className='rounded-full'
                      />
                      <span className='text-sm font-medium text-foreground'>
                        {sponsor.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className='flex flex-col sm:flex-row gap-4'>
              {event.link && event.link !== '#' && (
                <Link
                  href={event.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'
                >
                  Register Now
                  <svg
                    className='ml-2 w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                </Link>
              )}

              <div className='flex items-center gap-3'>
                <SingleEventICalButton
                  event={event}
                  className='bg-background-secondary text-foreground border border-border hover:bg-background-tertiary'
                />

                <ShareButton
                  eventTitle={event.title}
                  eventUrl={eventUrl}
                  eventDate={date}
                  eventLocation={event.location}
                  size='md'
                />

                {/* Nomination Form Button */}
                {event.showNominationForm && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setIsNominationModalOpen(true);
                    }}
                    className='inline-flex items-center gap-2 bg-accent text-accent-foreground border border-accent hover:bg-accent/90 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md'
                    title='Nominate a speaker for this event'
                  >
                    <Award className='w-4 h-4' />
                    Nominate Speaker
                  </button>
                )}
              </div>

              <Link
                href='/events'
                className='inline-flex items-center justify-center px-6 py-2 border border-border text-foreground rounded-lg hover:bg-background-secondary transition-colors font-medium'
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nomination Form Modal */}
      {event.showNominationForm && (
        <Modal
          isOpen={isNominationModalOpen}
          onClose={() => setIsNominationModalOpen(false)}
          title='Nominate a Speaker'
        >
          <NominationForm />
        </Modal>
      )}
    </>
  );
}
