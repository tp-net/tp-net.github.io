import { partners } from '../data/partners';

export interface Partner {
  name: string;
  role: string;
  link: string;
  headshot: string;
  slug: string;
}

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find(sponsor => sponsor.slug === slug);
}

export function getAllPartnerSlugs(): string[] {
  return partners.map(sponsor => sponsor.slug);
}

// Export sponsors data as JSON for static generation
export { partners as partnersData };

// Function to load sponsors from JSON (useful for static generation)
export async function loadPartnersFromJSON(): Promise<Partner[]> {
  // In a real implementation, you might load from a JSON file
  // For now, we'll return the static data
  return partners;
}
