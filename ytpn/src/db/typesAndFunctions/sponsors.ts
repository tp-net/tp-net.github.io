import { sponsors } from "../data/sponsors";

export interface Sponsor {
  name: string;
  role: string;
  link: string;
  headshot: string;
  slug: string;
}


export function getSponsorBySlug(slug: string): Sponsor | undefined {
  return sponsors.find(sponsor => sponsor.slug === slug);
}

export function getAllSponsorSlugs(): string[] {
  return sponsors.map(sponsor => sponsor.slug);
}

// Export sponsors data as JSON for static generation
export { sponsors as sponsorsData };

// Function to load sponsors from JSON (useful for static generation)
export async function loadSponsorsFromJSON(): Promise<Sponsor[]> {
  // In a real implementation, you might load from a JSON file
  // For now, we'll return the static data
  return sponsors;
}
