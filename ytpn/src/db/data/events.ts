import { type Event } from '../typesAndFunctions/events';
import { EVENT_TYPES } from '../typesAndFunctions/events';
import { sponsors } from './sponsors';

export const events: Event[] = [
  {
    id: '1',
    title: "Young Technical Professional's Showcase: Process Engineering",
    description:
      "A networking evening where we showcase a young technical professional's project, research, stack or tool.",
    details:
      'Join us at a local pub for an informal networking event and presentation. With friends and colleagues. By and intended for early career professionals, but all are welcome.',
    eventType: EVENT_TYPES.NETWORKING,
    date: new Date('2025-11-14T17:15:00+10:00'),
    location: 'tbc',
    image: '/assets/images/networking1.webp',
    sponsors: [],
    hiEventsId: '1',
    hiEventsSlug: 'tpn-networking-evening-nov-25',
    link: '#',
    slug: 'ytpn-networking-meetup',
    tags: ['networking', 'social'],
    // capacity: 500,
    price: 'Free',
    isVirtual: false,
    // organizers: ["Wood", "Rio Tinto"]
  },
  {
    id: '2',
    title: 'YTPN Ball 2026',
    description: 'Annual YTPN Ball',
    details: "We're considering hosting an annual ball. Register your interest",
    eventType: EVENT_TYPES.SOCIAL,
    // date: new Date("2025-03-15T09:00:00+10:00"),
    location: 'Convention Center, Brisbane',
    image: '/assets/images/networking2.webp',
    link: '#',
    slug: 'ytpn-annual-conference-2025',
    tags: ['networking', 'keynote', 'workshop', 'conference'],
    capacity: 500,
    price: '$150',
    isVirtual: false,
  },
];
