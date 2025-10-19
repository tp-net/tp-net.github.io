'use client';

import { AboutAccordion } from './AboutAccordion';

export default function AboutSection() {
  return (
    <section id='about' className='py-20 bg-background'>
      {/* title */}

      <div className='text-center mb-16'>
        <p className='text-primary font-semibold text-sm uppercase tracking-wide mb-4'>
          About Us
        </p>
      </div>
      <div className='max-w-4xl mx-auto'>
        <AboutAccordion />
      </div>
    </section>
  );
}
// <section className='py-20 bg-background'>
//   <div className='container mx-auto px-6'>
//     <div className='grid lg:grid-cols-2 gap-12 items-center'>
//       <div className='order-2 lg:order-1'>
//         <div className='bg-background-secondary rounded-lg p-8 aspect-video flex items-center justify-center border border-border overflow-hidden'>
//           <Image
//             src='assets/images/team.png'
//             alt='Team'
//             width={500}
//             height={281}
//             className='w-full h-full object-cover rounded-lg'
//           />
//         </div>
//       </div>
//       <div className='order-1 lg:order-2 space-y-6'>
//         <p className='text-primary font-semibold text-sm uppercase tracking-wide'>
//           What we are
//         </p>
//         <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
//           A network of thinkers and builders
//         </h2>
//         <p className='text-lg text-foreground-secondary leading-relaxed'>
//           A nexus for events, networking and collaboration.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
