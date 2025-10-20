import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import JoinForm from '@/components/forms/JoinForm';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

/**
 * JoinPage Component
 *
 * Functional Requirements:
 * - Display an elegant page wrapper for the membership join form
 * - Include proper page header with title, description, and breadcrumb navigation
 * - Maintain responsive design across all screen sizes
 * - Provide clear visual hierarchy and forest theme consistency
 * - Include additional context and call-to-action elements
 */

export default function JoinPage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-20'>
        {/* Breadcrumb Navigation */}
        <div className='mb-8'>
          <MetadataBreadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Join' }]}
          />
        </div>

        {/* Page Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 mx-auto'>
            <Users className='w-10 h-10 text-primary' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
            Join The Network
          </h1>
        </div>

        {/* Join Form Section */}
        <div className='max-w-4xl mx-auto'>
          <JoinForm />
        </div>

        {/* Additional Information Section */}
        <div className='max-w-4xl mx-auto mt-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* What You Get */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-foreground mb-6'>
                Why Should You Join?
              </h2>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                  <div>
                    <div className='font-medium text-foreground'>
                      Exclusive Networking Events
                    </div>
                    <div className='text-sm text-foreground-secondary'>
                      Connect with industry leaders and peers
                    </div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                  <div>
                    <div className='font-medium text-foreground'>
                      Professional Development
                    </div>
                    <div className='text-sm text-foreground-secondary'>
                      Workshops, talks, and skill-building sessions
                    </div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                  <div>
                    <div className='font-medium text-foreground'>Community</div>
                    <div className='text-sm text-foreground-secondary'>
                      Meet and make friends with like-minded people.
                    </div>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                  <div>
                    <div className='font-medium text-foreground'>
                      Career Opportunities
                    </div>
                    <div className='text-sm text-foreground-secondary'>
                      Access to job postings and mentorship programs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className='space-y-6'>
              <h2 className='text-2xl font-bold text-foreground mb-6'>
                Learn More
              </h2>
              <div className='space-y-4'>
                <Link
                  href='/events'
                  className='flex items-center justify-between p-4 bg-background-secondary rounded-xl border border-border hover:bg-background-tertiary transition-colors group'
                >
                  <div>
                    <div className='font-medium text-foreground group-hover:text-primary transition-colors'>
                      Upcoming Events
                    </div>
                    <div className='text-sm text-foreground-secondary'>
                      See what's happening in our community
                    </div>
                  </div>
                  <ArrowRight className='w-5 h-5 text-foreground-tertiary group-hover:text-primary transition-colors' />
                </Link>

                <Link
                  href='/partners'
                  className='flex items-center justify-between p-4 bg-background-secondary rounded-xl border border-border hover:bg-background-tertiary transition-colors group'
                >
                  <div>
                    <div className='font-medium text-foreground group-hover:text-primary transition-colors'>
                      Our Partners
                    </div>
                    <div className='text-sm text-foreground-secondary'>
                      Meet the companies supporting our mission
                    </div>
                  </div>
                  <ArrowRight className='w-5 h-5 text-foreground-tertiary group-hover:text-primary transition-colors' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
