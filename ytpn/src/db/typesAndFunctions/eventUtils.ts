import { type Event } from "./events";
import { events } from "../data/events";
import { APP_CONSTS } from "../app";

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => (event.slug === slug.slice(0, event.slug.length)));
}

export function getAllEventSlugs(): string[] {
  return events.map(event => `${event.slug}-${event.id}`);
}

export function getEventSlug(event: Event): string {
  return `${event.slug}-${event.id}`;
}

// Export events data as JSON for static generation
export { events as eventsData };

// Function to load events from JSON (useful for static generation)
export async function loadEventsFromJSON(): Promise<Event[]> {
  // In a real implementation, you might load from a JSON file
  // For now, we'll return the static data
  return events;
}

/**
 * Generates an iCal (.ics) file content for a single event
 * @param event - The event to convert to iCal format
 * @returns iCal formatted string
 */
export function generateEventICalContent(event: Event): string {
  // If event has no date, return a placeholder iCal with TBC information
  if (!event.date) {
    const escapeICalText = (text: string): string => {
      return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '');
    };

    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `ytpn-${event.slug}-tbc@ytpn.org.au`;
    
    let icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//YTPN//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${timestamp}`,
      `SUMMARY:${escapeICalText(event.title)}`,
      `DESCRIPTION:${escapeICalText(event.description || 'YTPN Event - Date TBC')}`,
      `LOCATION:${escapeICalText(event.location)}`,
      `STATUS:TENTATIVE`,
      `TRANSP:OPAQUE`,
      `CATEGORIES:${escapeICalText(event.eventType.toUpperCase())}`,
    ];

    // Add URL if available
    if (event.link && event.link !== '#') {
      icalContent.push(`URL:${event.link}`);
    }

    // Add organizer information
    if (event.organizers && event.organizers.length > 0) {
      const organizer = event.organizers.join(', ');
      icalContent.push(`ORGANIZER:${escapeICalText(organizer)}`);
    }

    // Add tags as categories
    if (event.tags && event.tags.length > 0) {
      const tags = event.tags.join(',');
      icalContent.push(`CATEGORIES:${escapeICalText(tags)}`);
    }

    icalContent.push('END:VEVENT');
    icalContent.push('END:VCALENDAR');

    return icalContent.join('\r\n');
  }

  const formatDateForICal = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeICalText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
  };

  const eventStart = formatDateForICal(event.date);
  const eventEnd = formatDateForICal(new Date(event.date.getTime() + 2 * 60 * 60 * 1000)); // Default 2 hours duration
  
  const uid = `ytpn-${event.slug}-${event.date.getTime()}@ytpn.org.au`;
  const timestamp = formatDateForICal(new Date());
  
  let icalContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YTPN//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART:${eventStart}`,
    `DTEND:${eventEnd}`,
    `SUMMARY:${escapeICalText(event.title)}`,
    `DESCRIPTION:${escapeICalText(event.description || 'YTPN Event')}`,
    `LOCATION:${escapeICalText(event.location)}`,
    `STATUS:CONFIRMED`,
    `TRANSP:OPAQUE`,
    `CATEGORIES:${escapeICalText(event.eventType.toUpperCase())}`,
  ];

  // Add URL if available
  if (event.link && event.link !== '#') {
    icalContent.push(`URL:${event.link}`);
  }

  // Add organizer information
  if (event.organizers && event.organizers.length > 0) {
    const organizer = event.organizers.join(', ');
    icalContent.push(`ORGANIZER:${escapeICalText(organizer)}`);
  }

  // Add tags as categories
  if (event.tags && event.tags.length > 0) {
    const tags = event.tags.join(',');
    icalContent.push(`CATEGORIES:${escapeICalText(tags)}`);
  }

  icalContent.push('END:VEVENT');
  icalContent.push('END:VCALENDAR');

  return icalContent.join('\r\n');
}

/**
 * Generates an iCal (.ics) file content for multiple events
 * @param events - Array of events to convert to iCal format
 * @returns iCal formatted string
 */
export function generateMultipleEventsICalContent(events: Event[]): string {
  const formatDateForICal = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const escapeICalText = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '');
  };

  const timestamp = formatDateForICal(new Date());
  
  let icalContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YTPN//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach(event => {
    const uid = `ytpn-${event.slug}@${APP_CONSTS.APP_URL}`;
    
    icalContent.push('BEGIN:VEVENT');
    icalContent.push(`UID:${uid}`);
    icalContent.push(`DTSTAMP:${timestamp}`);
    
    // Handle events with missing dates
    if (event.date) {
      const eventStart = formatDateForICal(event.date);
      const eventEnd = formatDateForICal(new Date(event.date.getTime() + 2 * 60 * 60 * 1000)); // Default 2 hours duration
      icalContent.push(`DTSTART:${eventStart}`);
      icalContent.push(`DTEND:${eventEnd}`);
      icalContent.push(`STATUS:CONFIRMED`);
    } else {
      // For events without dates, mark as tentative
      icalContent.push(`STATUS:TENTATIVE`);
    }
    
    icalContent.push(`SUMMARY:${escapeICalText(event.title)}`);
    icalContent.push(`DESCRIPTION:${escapeICalText(event.description || (event.date ? 'YTPN Event' : 'YTPN Event - Date TBC'))}`);
    icalContent.push(`LOCATION:${escapeICalText(event.location)}`);
    icalContent.push(`TRANSP:OPAQUE`);
    icalContent.push(`CATEGORIES:${escapeICalText(event.eventType.toUpperCase())}`);

    // Add URL if available
    if (event.link && event.link !== '#') {
      icalContent.push(`URL:${event.link}`);
    }

    icalContent.push(`ORGANIZER:${escapeICalText(APP_CONSTS.APP_CONTACT_EMAIL)}`);
    // Add organizer information
    if (event.organizers && event.organizers.length > 0) {
      const organizer = event.organizers.join(', ');
    }

    // Add tags as categories
    if (event.tags && event.tags.length > 0) {
      const tags = event.tags.join(',');
      icalContent.push(`CATEGORIES:${escapeICalText(tags)}`);
    }

    icalContent.push('END:VEVENT');
  });

  icalContent.push('END:VCALENDAR');

  return icalContent.join('\r\n');
}

/**
 * Downloads an iCal file for a single event
 * @param event - The event to download as iCal
 * @param filename - Optional custom filename (defaults to event slug)
 */
export function downloadEventICalFile(event: Event, filename?: string): void {
  const icalContent = generateEventICalContent(event);
  const defaultFilename = `${event.slug}.ics`;
  const finalFilename = filename || defaultFilename;
  
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads an iCal file for multiple events
 * @param events - Array of events to download as iCal
 * @param filename - Optional custom filename (defaults to 'ytpn-events.ics')
 */
export function downloadMultipleEventsICalFile(events: Event[], filename?: string): void {
  const icalContent = generateMultipleEventsICalContent(events);
  const defaultFilename = 'ytpn-events.ics';
  const finalFilename = filename || defaultFilename;
  
  const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}