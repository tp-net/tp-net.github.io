import {  type Sponsor } from "./sponsors";

export const EVENT_TYPES = {
  ALL: "all",
  CONFERENCE: "conference",
  WORKSHOP: "workshop",
  MEETUP: "meetup",
  NETWORKING: "networking",
  SEMINAR: "seminar",
  HACKATHON: "hackathon",
  PANEL: "panel",
  KEYNOTE: "keynote",
  SOCIAL: "social"
} as const;

export interface Event {
  id?: string;
  title: string;
  
  description?: string;
  details?: string;
  eventType: (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
  date?: Date;
  location: string;
  image?: string;
  link?: string;
  hiEventsId?: string;
  tags?: string[];
  sponsors?: Sponsor[];
  organizers?: string[];
  capacity?: number;
  price?: string;
  isVirtual?: boolean;
  slug: string;
}



// Event utility functions moved to separate file to avoid circular dependencies
