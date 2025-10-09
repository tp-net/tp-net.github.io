import { type Event } from "../typesAndFunctions/events";
import { sponsors } from "./sponsors";

export const events: Event[] = [
  {
    id: '1',
    title: "YTPN Annual Conference 2024",
    description: "Join us for the biggest technical professional networking event of the year. Featuring keynote speakers, workshops, and networking opportunities.",
    eventType: "conference",
    date: new Date("2024-03-15T09:00:00+10:00"),
    location: "Convention Center, Sydney",
    image: "/assets/images/networking1.webp",
    sponsors: sponsors,
    link: "#",
    slug: "ytpn-annual-conference-2024",
    tags: ["networking", "keynote", "workshop", "conference"],
    capacity: 500,
    price: "$150",
    isVirtual: false
  },
  {
    id: '2',
    title: "YTPN Annual Conference 2025",
    description: "Join us for the biggest technical professional networking event of the year. Featuring keynote speakers, workshops, and networking opportunities.",
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
  {
    id: '3',
    title: "React Workshop: Advanced Patterns",
    description: "Deep dive into advanced React patterns and best practices for building scalable applications. Perfect for senior developers looking to level up their skills.",
    eventType: "workshop",
    date: new Date("2024-02-28T14:00:00+10:00"),
    location: "Online",
    image: "/assets/images/hero.webp",
    link: "#",
    slug: "react-workshop-advanced-patterns",
    tags: ["react", "javascript", "frontend", "advanced"],
    capacity: 50,
    price: "Free",
    isVirtual: true
  },
  {
    id: '4',
    title: "Monthly Networking Meetup",
    description: "Casual networking event for technical professionals to connect and share experiences. Great for building your professional network.",
    eventType: "meetup",
    date: new Date("2024-02-20T18:00:00+10:00"),
    location: "The Hub, Melbourne",
    image: "/assets/images/networking3.webp",
    slug: "monthly-networking-meetup",
    tags: ["networking", "casual", "community"],
    capacity: 100,
    price: "Free"
  },
  {
    id: '5',
    title: "AI & Machine Learning Panel",
    description: "Expert panel discussion on the latest trends and challenges in AI and machine learning. Featuring industry leaders and researchers.",
    eventType: "panel",
    date: new Date("2024-03-05T19:00:00+10:00"),
    location: "Tech Hub, Brisbane",
    image: "/assets/images/networking4.webp",
    link: "#",
    slug: "ai-ml-panel-discussion",
    tags: ["ai", "ml", "panel", "expert"],
    capacity: 200,
    price: "$25"
  },
  {
    id: '6',
    title: "Startup Pitch Night",
    description: "Watch innovative startups pitch their ideas to a panel of investors and industry experts. Great for entrepreneurs and investors alike.",
    eventType: "keynote",
    date: new Date("2024-03-12T18:30:00+10:00"),
    location: "Innovation Center, Sydney",
    image: "/assets/images/party1.webp",
    slug: "startup-pitch-night",
    tags: ["startup", "pitch", "investment", "entrepreneurship"],
    capacity: 150,
    price: "$35"
  },
  {
    id: '7',
    title: "DevOps Best Practices Seminar",
    description: "Learn the latest DevOps practices and tools from industry experts. Covering CI/CD, infrastructure as code, and monitoring.",
    eventType: "seminar",
    date: new Date("2024-03-18T10:00:00+10:00"),
    location: "Online",
    image: "/assets/images/networking5.webp",
    slug: "devops-best-practices-seminar",
    tags: ["devops", "ci-cd", "infrastructure", "monitoring"],
    capacity: 75,
    price: "Free",
    isVirtual: true
  },
  {
    id: '8',
    title: "24-Hour Hackathon Challenge",
    description: "Join us for an intense 24-hour coding challenge. Build innovative solutions, win prizes, and network with fellow developers.",
    eventType: "hackathon",
    date: new Date("2024-03-25T09:00:00+10:00"),
    location: "Tech Campus, Perth",
    image: "/assets/images/networking6.webp",
    slug: "24-hour-hackathon-challenge",
    tags: ["hackathon", "coding", "challenge", "innovation"],
    capacity: 100,
    price: "$20"
  }
];

