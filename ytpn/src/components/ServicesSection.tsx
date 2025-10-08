'use client';

const services = [
  {
    id: 'register-membership',
    title: 'Register Membership',
    description: 'Join the network shaping the next generation of technical professionals — your seat at the table starts here.',
    icon: '🛠️'
  },
  {
    id: 'join-events',
    title: 'Join Events',
    description: 'Show up, speak up, and connect. Every event is a chance to grow your network and your impact.',
    icon: '⚙️'
  },
  {
    id: 'register-committees',
    title: 'Register Your Committee',
    description: 'Dont leave your committee behind — bring your team into the conversation and help drive YTPNs next big event.',
    icon: '📹'
  },
  {
    id: 'sponsor-ytpn',
    title: 'Become a Sponsor',
    description: 'Stand behind the future of industry talent — partner with YTPN to inspire, support, and connect emerging leaders.',
    icon: '💻'
  },
  {
    id: 'nominate-a-speaker',
    title: 'Nominate a Speaker',
    description: 'Know someone with a story worth sharing? Put them forward and shape the conversations that move us.',
    icon: '🎤'
  }, 
  {
    id: 'nominate-a-topic',
    title: 'Nominate a Topic or Paper',
    description: 'Have something interesting to share? Put it forward for us to share with the world.',
    icon: '🎤'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
            WHAT WOULD YOU LIKE TO DO?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How would you like to be part of {' '}
            <span className="text-primary">YTPN?</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
