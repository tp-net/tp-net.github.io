import { type Event } from "../typesAndFunctions/events";
import { sponsors } from "./sponsors";



export const events: Event[] = [
  {
    id: '1',
    title: "YTPN Networking Meetup",
    description: "",
    eventType: "conference",
    date: new Date("2025-11-15T09:00:00+10:00"),
    location: "tbc",
    image: "/assets/images/networking1.webp",
    sponsors: sponsors,
    link: "#",
    slug: "ytpn-networking-meetup",
    tags: ["networking", "social"],
    capacity: 500,
    price: "$150",
    isVirtual: false,
    organizers: ["Wood", "Rio Tinto"]
  },
  {
    id: '2',
    title: "YTPN Ball 2026",
    description: "",
    eventType: "conference",
    date: new Date("2025-03-15T09:00:00+10:00"),
    location: "Convention Center, Sydney",
    image: "/assets/images/networking2.webp",
    link: "#",
    slug: "ytpn-annual-conference-2025",
    tags: ["networking", "keynote", "workshop", "conference"],
    capacity: 500,
    price: "$150",
    isVirtual: false
  },

];

