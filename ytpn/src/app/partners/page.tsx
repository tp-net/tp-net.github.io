'use client';
import { PartnerSection } from '@/components';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

export default function PartnersPage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-20'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <MetadataBreadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Sponsors' }]}
          />
        </div>

        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
            Our Partners
          </h1>
          <p className='text-xl text-foreground-secondary max-w-3xl mx-auto'>
            We're grateful for the support of our partners who help us create
            valuable opportunities for young technical professionals to grow,
            learn, and connect.
          </p>
        </div>
        <PartnerSection />
      </div>
    </div>
  );
}
