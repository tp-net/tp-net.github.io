'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JoinForm from './forms/JoinForm';
import RegisterCommitteeForm from './forms/RegisterCommitteeForm';
import SponsorshipForm from './forms/SponsorshipForm';
import NominationForm from './forms/NominationForm';
import Modal from './ui/Modal';
import { APP_CONSTS } from '@/data/app';


const services = [
  {
    id: 'register-membership',
    title: 'Join YTPN Today',
    description: 'Become part of the network shaping the next generation of technical professionals. Your journey to leadership starts with a single click.',
    icon: '🛠️',
    ctaText: 'Start Your Application',
    ctaType: 'form' as const,
    form: <JoinForm />  
  },
  {
    id: 'join-events',
    title: 'Discover Upcoming Events',
    description: 'Connect with peers, learn from industry leaders, and expand your professional network. Every event is an opportunity to grow.',
    icon: '⚙️',
    ctaText: 'Browse Events',
    ctaType: 'navigation' as const,
    link:'/events'
  },
  {
    id: 'register-committees',
    title: 'Register Your Organization',
    description: 'Bring your committee, group, club, or association into the YTPN ecosystem. Help shape our next major industry event.',
    icon: '📹',
    ctaText: 'Register Organization',
    ctaType: 'form' as const,
    form: <RegisterCommitteeForm />
  },
  {
    id: 'sponsor-ytpn',
    title: 'Partner With Us',
    description: 'Support the future of technical leadership. Partner with YTPN to inspire, mentor, and connect the next generation of industry talent.',
    icon: '💻',
    ctaText: 'Explore Partnership',
    ctaType: 'form' as const,
    form: <SponsorshipForm />
  },
  {
    id: 'nominate-a-speaker',
    title: 'Share Your Voice',
    description: 'Know someone with insights worth sharing? Nominate speakers, suggest topics, or recommend award recipients to shape our community conversations.',
    icon: '🎤',
    ctaText: 'Make a Nomination',
    ctaType: 'form' as const,
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
            TAKE ACTION TODAY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Path to Impact with {' '}
            <span className="text-primary">{APP_CONSTS.APP_NAME}</span>
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Whether you're looking to join our community, partner with us, or share your expertise, 
            there's a way for you to make a difference in the technical professional landscape.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="relative group cursor-pointer"
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
              {/* Animated border background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border inner ring */}
              <div className="absolute inset-[1px] rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 bg-[length:200%_200%] animate-gradient-shift-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main card content */}
              <div 
                className={`
                  relative bg-card rounded-lg p-8 shadow-lg border border-border
                  transition-all duration-300
                  hover:shadow-xl hover:scale-[1.02] hover:border-primary/30
                  active:scale-[0.98] active:shadow-lg
                  ${service.form || service.link ? 'hover:bg-card/95' : ''}
                  overflow-hidden
                `}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-105 align-left transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-foreground-tertiary text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {(service.form || service.link) && (
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                        {service.ctaText}
                      </span>
                      <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                        {service.ctaType === 'form' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
