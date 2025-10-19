/**
 * EVENT PROPAGATION HANDLING:
 *
 * This page contains nested interactive elements (buttons, links) within clickable containers.
 * Proper event propagation handling is critical to prevent unintended navigation when users
 * interact with nested elements. Key principles:
 *
 * 1. Interactive elements (buttons, links) use e.stopPropagation() to prevent parent click handlers
 * 2. Modal triggers must prevent card/page navigation when opened
 * 3. External links should not trigger parent navigation
 * 4. Form submissions should not bubble up to parent containers
 *
 * This pattern ensures users can interact with specific elements without accidentally triggering
 * parent navigation or other unintended behaviors.
 */

import { notFound } from 'next/navigation';
import { getEventBySlug, getAllEventSlugs } from '@/db';
import { APP_CONSTS } from '@/db/app';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';
import EventPageClient from './EventPageClient';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const event = getEventBySlug((await params).slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} - ${APP_CONSTS.APP_NAME}`,
    description: event.description,
    openGraph: {
      title: `${event.title} - ${APP_CONSTS.APP_NAME}`,
      description: event.description,
      images: event.image
        ? [
            {
              url: event.image,
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : [],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = getEventBySlug((await params).slug);

  if (!event) {
    notFound();
  }

  // Generate the event URL for sharing
  const eventUrl = `${APP_CONSTS.APP_URL}/events/${(await params).slug}`;

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-20'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <MetadataBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Events', href: '/events' },
              { label: event.title },
            ]}
          />
        </div>

        <EventPageClient event={event} eventUrl={eventUrl} />
      </div>
    </div>
  );
}
