'use client';

const focusAreas = [
  {
    category: 'SOCIAL',
    title: 'Social Events',
    description: 'Step out from behind the desk — build real friendships, share ideas, and celebrate wins together.',
    icon: '🌐'
  },
  {
    category: 'NETWORKING',
    title: 'Industry Connections',
    description: 'Don’t leave your committee behind — connect across teams, companies, and industries to move forward together.',
    icon: '🔗'
  },
  {
    category: 'DEVELOPMENT',
    title: 'Professional Growth',
    description: 'Back yourself. Build the skills, confidence, and perspective to lead the next generation of technical professionals.',
    icon: '📊'
  }
];



export default function FocusAreasSection() {
  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Areas of Focus
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {focusAreas.map((area) => (
            <div key={area.title} className="bg-background-secondary rounded-lg p-8 hover:shadow-lg transition-shadow border border-border">
              <div className="text-4xl mb-4">{area.icon}</div>
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {area.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {area.title}
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
