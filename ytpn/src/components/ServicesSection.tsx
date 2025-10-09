'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JoinForm from './forms/JoinForm';
import RegisterCommitteeForm from './forms/RegisterCommitteeForm';
import SponsorshipForm from './forms/SponsorshipForm';
import NominationForm from './forms/NominationForm';
import Modal from './ui/Modal';


const services = [
  {
    id: 'register-membership',
    title: 'Register Membership',
    description: 'Join the network shaping the next generation of technical professionals — your seat at the table starts here.',
    icon: '🛠️',
    form: <JoinForm />  
  },
  {
    id: 'join-events',
    title: 'Join Events',
    description: 'Show up, speak up, and connect. Every event is a chance to grow your network and your impact.',
    icon: '⚙️',
    link:'/events'
  },
  {
    id: 'register-committees',
    title: 'Register Your Committee',
    description: 'Dont leave your committee behind — bring your team into the conversation and help drive YTPNs next big event.',
    icon: '📹',
    form: <RegisterCommitteeForm />
  },
  {
    id: 'sponsor-ytpn',
    title: 'Become a Sponsor',
    description: 'Stand behind the future of industry talent — partner with YTPN to inspire, support, and connect emerging leaders.',
    icon: '💻',
    form: <SponsorshipForm />
  },
  {
    id: 'nominate-a-speaker',
    title: 'Nominate a Speaker, Topic, Paper or Award',
    description: 'Know someone with a story worth sharing? Put them forward and shape the conversations that move us.',
    icon: '🎤',
    form: <NominationForm />
  }, 
  
];

export default function ServicesSection() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleCardClick = (service: typeof services[0]) => {
    if (service.form) {
      // Open modal with form
      setModalContent(service.form);
      setModalTitle(service.title);
      setModalOpen(true);
    } else if (service.link) {
      // Navigate to link
      router.push(service.link);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setModalTitle('');
  };

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
            <div 
              key={service.id} 
              className={`
                bg-card rounded-lg p-8 shadow-lg border border-border
                transition-all duration-200 cursor-pointer
                hover:shadow-xl hover:scale-[1.02] hover:border-primary/20
                active:scale-[0.98] active:shadow-lg
                ${service.form || service.link ? 'hover:bg-card/80' : ''}
              `}
              onClick={() => handleCardClick(service)}
              role={service.form || service.link ? "button" : undefined}
              tabIndex={service.form || service.link ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && (service.form || service.link)) {
                  e.preventDefault();
                  handleCardClick(service);
                }
              }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                {service.description}
              </p>
              {(service.form || service.link) && (
                <div className="mt-4 text-sm text-primary font-medium">
                  {service.form ? 'Click to open form →' : 'Click to explore →'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for forms */}
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal}
        title={modalTitle}
        className="max-w-5xl"
      >
        {modalContent}
      </Modal>
    </section>
  );
}
