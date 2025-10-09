import {  type Sponsor } from "./sponsors";
import { events } from "../data/events";

export interface Event {
  id?: string;
  title: string;
  description: string;
  eventType: 'conference' | 'workshop' | 'meetup' | 'networking' | 'seminar' | 'hackathon' | 'panel' | 'keynote';
  date: Date;
  location: string;
  image?: string;
  link?: string;
  tags?: string[];
  sponsors?: Sponsor[];
  organizers?: string[];
  capacity?: number;
  price?: string;
  isVirtual?: boolean;
  slug: string;
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map(event => event.slug);
}

// Export events data as JSON for static generation
export { events as eventsData };

// Function to load events from JSON (useful for static generation)
export async function loadEventsFromJSON(): Promise<Event[]> {
  // In a real implementation, you might load from a JSON file
  // For now, we'll return the static data
  return events;
}
