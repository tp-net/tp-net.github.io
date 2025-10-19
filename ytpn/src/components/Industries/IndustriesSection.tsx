import IndustriesGraph from './IndustriesGraph';
import { useTheme } from 'next-themes';

export default function IndustriesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
            <IndustriesGraph isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}
