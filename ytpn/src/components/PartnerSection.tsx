'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { partners, type Partner } from '@/db';
import Modal from './ui/Modal';
import SponsorshipForm from './forms/SponsorshipForm';
import RegisterCommitteeForm from './forms/RegisterCommitteeForm';

export default function SponsorSection() {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] =
    useState(false);

  const openSponsorModal = () => setIsSponsorModalOpen(true);
  const closeSponsorModal = () => setIsSponsorModalOpen(false);

  const openCollaborationModal = () => setIsCollaborationModalOpen(true);
  const closeCollaborationModal = () => setIsCollaborationModalOpen(false);

  return (
    <section id='team' className='py-20 bg-background-secondary'>
      <div className='container mx-auto px-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-foreground mb-16'>
          Our Partners
        </h2>
        <div
          className={`grid md:grid-cols-${partners.length + 1} gap-8 max-w-4xl mx-auto`}
        >
          {partners.map(sponsor => (
            <Link
              key={sponsor.name}
              href={`/partners/${sponsor.slug}`}
              className='bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-center group border border-border max-w-100 w-full mx-auto'
            >
              <div className='w-32 h-32 bg-background-secondary rounded-full mx-auto mb-6 flex items-center justify-center border border-border overflow-hidden'>
                <Image
                  src={sponsor.headshot}
                  alt={`${sponsor.name} logo`}
                  width={128}
                  height={128}
                  className='w-full h-full object-cover'
                />
              </div>
              <h3 className='text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors'>
                {sponsor.name}
              </h3>
              <p className='text-foreground-secondary'>{sponsor.role}</p>
            </Link>
          ))}

          <div className='bg-card/60 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all text-center border-2 border-dashed border-border hover:border-primary max-w-100 w-full mx-auto'>
            <div className='h-32 mx-auto mb-6 flex items-center justify-center gap-2'>
              <button
                onClick={openCollaborationModal}
                className='bg-background-secondary w-24 h-24 rounded-full flex flex-col items-center justify-center hover:bg-primary/80 transition-all border border-border hover:border-primary group hover:scale-110'
                title='Collaborate with Us'
              >
                <Plus className='w-4 h-4 text-foreground-secondary group-hover:text-primary-foreground transition-colors' />
                <span className='text-xs text-foreground-secondary group-hover:text-primary-foreground transition-colors font-medium'>
                  Collaborate
                </span>
              </button>
              <button
                onClick={openSponsorModal}
                className='bg-background-secondary w-24 h-24 rounded-full flex flex-col items-center justify-center hover:bg-primary/80 transition-all border border-border hover:border-primary group hover:scale-110'
                title='Become a Sponsor'
              >
                <Plus className='w-4 h-4 text-foreground-secondary group-hover:text-primary-foreground transition-colors' />
                <span className='text-xs text-foreground-secondary group-hover:text-primary-foreground transition-colors font-medium'>
                  Sponsor
                </span>
              </button>
            </div>
            <h3 className='text-xl font-bold text-card-foreground mb-2'>
              Get Involved
            </h3>
            <p className='text-foreground-secondary'>
              Collaborate with or sponsor the network
            </p>
          </div>
        </div>
      </div>

      {/* Sponsorship Form Modal */}
      <Modal
        isOpen={isSponsorModalOpen}
        onClose={closeSponsorModal}
        title='Become a Sponsor'
        className='max-w-6xl'
      >
        <SponsorshipForm />
      </Modal>

      {/* Collaboration Form Modal */}
      <Modal
        isOpen={isCollaborationModalOpen}
        onClose={closeCollaborationModal}
        title='Collaborate with Us'
        className='max-w-6xl'
      >
        <RegisterCommitteeForm />
      </Modal>
    </section>
  );
}
