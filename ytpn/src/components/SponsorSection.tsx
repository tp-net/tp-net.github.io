'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sponsors, type Sponsor } from '@/db';

export default function SponsorSection() {
  return (
    <section id="team" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          Our Partners
        </h2>
        <div className={`grid md:grid-cols-${sponsors.length} gap-8 max-w-4xl mx-auto`}>
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.name}
              href={`/sponsors/${sponsor.slug}`}
              className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-center group border border-border max-w-100 w-full mx-auto"
            >
              <div className="w-32 h-32 bg-background-secondary rounded-full mx-auto mb-6 flex items-center justify-center border border-border overflow-hidden">
                <Image
                  src={sponsor.headshot}
                  alt={`${sponsor.name} logo`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {sponsor.name}
              </h3>
              <p className="text-foreground-secondary">
                {sponsor.role}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
