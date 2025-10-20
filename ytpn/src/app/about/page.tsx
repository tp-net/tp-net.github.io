import { AboutAccordion } from '@/components/AboutAccordion';

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-muted/20 to-background'>
      <div className='container mx-auto px-4 py-16 max-w-4xl'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
            Technical Professionals Network
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Connecting early-career technical professionals across engineering,
            science, technology, and related fields to foster cross-disciplinary
            learning and innovation.
          </p>
        </div>

        {/* Main Accordion */}
        <AboutAccordion />

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <div className='bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-border/30'>
            <h2 className='text-2xl font-bold text-foreground mb-4'>
              Ready to Connect?
            </h2>
            <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
              Whether you're a technical professional looking to expand your
              network or a corporate partner interested in collaboration, we'd
              love to hear from you.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href='/join'
                className='px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors'
              >
                Join Our Network
              </a>
              <a
                href='/partners'
                className='px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors'
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
