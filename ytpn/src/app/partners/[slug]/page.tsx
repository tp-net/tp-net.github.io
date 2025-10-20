import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPartnerBySlug, getAllPartnerSlugs } from '@/db';
import { APP_CONSTS } from '@/db/app';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

interface SponsorPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPartnerSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: SponsorPageProps) {
  const partner = getPartnerBySlug(params.slug);

  if (!partner) {
    return {
      title: 'Sponsor Not Found',
    };
  }

  return {
    title: `${partner.name} - ${APP_CONSTS.APP_NAME}`,
    description: `${partner.name} is a ${partner.role} supporting ${APP_CONSTS.APP_NAME}. Learn more about our partnership.`,
    openGraph: {
      title: `${partner.name} - ${APP_CONSTS.APP_NAME}`,
      description: `${partner.name} is a ${partner.role} supporting ${APP_CONSTS.APP_NAME}. Learn more about our partnership.`,
      images: [
        {
          url: partner.headshot,
          width: 400,
          height: 400,
          alt: `${partner.name} logo`,
        },
      ],
    },
  };
}

export default function SponsorPage({ params }: SponsorPageProps) {
  const partner = getPartnerBySlug(params.slug);

  if (!partner) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-6 py-20'>
        {/* Breadcrumb */}
        <div className='mb-8'>
          <MetadataBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Partners', href: '/partners' },
              { label: partner.name },
            ]}
          />
        </div>

        {/* Sponsor Header */}
        <div className='max-w-4xl mx-auto'>
          <div className='bg-card rounded-lg p-8 shadow-lg border border-border'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
              <div className='w-48 h-48 bg-background-secondary rounded-full flex items-center justify-center border border-border overflow-hidden flex-shrink-0'>
                <Image
                  src={partner.headshot}
                  alt={`${partner.name} logo`}
                  width={192}
                  height={192}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex-1 text-center md:text-left'>
                <h1 className='text-4xl md:text-5xl font-bold text-card-foreground mb-4'>
                  {partner.name}
                </h1>
                <p className='text-xl text-foreground-secondary mb-6'>
                  {partner.role}
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                  <Link
                    href={partner.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'
                  >
                    Visit Website
                    <svg
                      className='ml-2 w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Partnership Information */}
          <div className='mt-12 bg-card rounded-lg p-8 shadow-lg border border-border'>
            <h2 className='text-2xl font-bold text-card-foreground mb-6'>
              Partnership with {APP_CONSTS.APP_NAME}
            </h2>
            <div className='prose prose-lg max-w-none text-foreground-secondary'>
              <p>
                We're proud to partner with {partner.name} as our{' '}
                {partner.role.toLowerCase()}. Their support helps us continue to
                provide valuable resources and networking opportunities for
                young technical professionals.
              </p>
              <p>
                Through this partnership, we work together to foster innovation,
                share knowledge, and build a stronger community of technical
                professionals.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className='mt-12 bg-primary/5 rounded-lg p-8 border border-primary/20'>
            <h3 className='text-xl font-bold text-card-foreground mb-4'>
              Interested in Partnering with Us?
            </h3>
            <p className='text-foreground-secondary mb-6'>
              We're always looking for organizations that share our vision of
              supporting young technical professionals. Get in touch to learn
              about partnership opportunities.
            </p>
            <Link
              href='/partners'
              className='inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'
            >
              View All Partners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
