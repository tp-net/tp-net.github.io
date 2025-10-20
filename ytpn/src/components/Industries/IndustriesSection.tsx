import dynamic from 'next/dynamic';

// Dynamically import IndustriesGraph to prevent SSR issues
const IndustriesGraph = dynamic(() => import('./IndustriesGraph'), {
  ssr: false,
  loading: () => (
    <div className='h-full w-full flex items-center justify-center bg-background'>
      <div className='text-foreground'>Loading industries graph...</div>
    </div>
  ),
});

export default function IndustriesSection() {
  return (
    <section id='industries' className='py-20 bg-background'>
      <div className='container mx-auto px-6'>
        <div className='w-full'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Industries We Connect
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto mb-6'>
              Explore the diverse industries represented in the Technology
              Professionals Network. Drag nodes to rearrange, hover to see
              connections, and double-click to pin nodes.
            </p>
          </div>

          <div className='relative w-full bg-card rounded-lg border border-border overflow-hidden shadow-lg h-[600px]'>
            <IndustriesGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
