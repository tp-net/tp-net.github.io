'use client';

import IndustriesSection from '@/components/Industries/IndustriesSection';

export default function IndustriesPage() {
  return (
    <div className='min-h-screen bg-background overflow-hidden position-relative'>
      <h1 className='text-4xl font-bold mb-8'>Industries Network</h1>
      <IndustriesSection />
    </div>
  );
}
