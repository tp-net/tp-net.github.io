import { type Event } from '../typesAndFunctions/events';
import { EVENT_TYPES } from '../typesAndFunctions/events';
import { formLinks } from './forms';
import { partners } from './partners';

export const events: Event[] = [
  {
    id: '1',
    title: "Young Technical Professional's Showcase",
    description:
      "A networking evening where we showcase a young technical professional's project, research, stack or tool.",
    details:
      'Join us at the Brisbane City Library for a few presentation on technical work, followed by a trip to the pub for some informal networking. With friends and colleagues. By and intended for early career professionals, but all are welcome.',
    eventType: EVENT_TYPES.NETWORKING,
    date: new Date('2025-11-20T17:15:00+10:00'),
    location: 'tbc',
    image: '/assets/images/networking1.webp',
    sponsors: [],
    hiEventsId: '1',
    hiEventsSlug: 'tpn-networking-evening-nov-25',
    showNominationForm: true,
    link: '#',
    slug: 'tpn-networking-evening-nov-25',
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
    showNominationForm: true,
    link: '#',
    slug: 'ytpn-annual-conference-2025',
    tags: ['social'],
    capacity: 500,
    price: 'TBC',
    isVirtual: false,
    // organizers: ["Wood", "Rio Tinto"]
  },
];
