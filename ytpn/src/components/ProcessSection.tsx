'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Display process steps in equal-width grid layout
 * - Ensure responsive design across all screen sizes
 * - Maintain visual hierarchy with numbered circles
 * - Center content and maintain consistent spacing
 * - Support mobile-first responsive breakpoints
 */

const processSteps = [
  {
    title: 'Connect',
    description:
      'Bring technical professionals together to share goals, ideas, and opportunities.',
  },
  {
    title: 'Organise',
    description:
      'Coordinate venues, logistics, and communication to make each event seamless.',
  },
  {
    title: 'Engage',
    description:
      'Deliver events, workshops, and meetups that inspire collaboration and growth.',
  },
];

export default function ProcessSection() {
  return (
    <section id='process' className='py-20 bg-background-secondary'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <p className='text-primary font-semibold text-sm uppercase tracking-wide mb-4'>
            Our process
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto'>
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className='flex flex-col items-center text-center'
            >
              <div className='w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6'>
                <span className='text-primary-foreground font-bold text-lg'>
                  {index + 1}
                </span>
              </div>
              <h3 className='text-xl font-bold text-foreground mb-3'>
                {step.title}
              </h3>
              <p className='text-foreground-secondary text-sm leading-relaxed'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
