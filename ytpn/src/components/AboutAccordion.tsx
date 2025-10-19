'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Users,
  Target,
  Lightbulb,
  UserCheck,
  Handshake,
  Zap,
  Mic,
} from 'lucide-react';
import { useState } from 'react';

interface AccordionItemData {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: {
    type: 'text' | 'programs' | 'list';
    text?: string;
    programs?: Array<{ title: string; description: string }>;
    list?: string[];
  };
}

const accordionData: AccordionItemData[] = [
  {
    id: 'our ask',
    title: 'Our Ask',
    icon: Mic,
    content: {
      type: 'text',
      text: `We are seeking speakers, collaborators, and partners willing to share expertise, promote cross-disciplinary engagement, and connect professionals with the wider technical community.`,
    },
  },
  {
    id: 'why-we-exist',
    title: 'Why We Exist',
    icon: Target,
    content: {
      type: 'text',
      text: `We exist to facilitate cross-disciplinary learning, collaboration, and knowledge-sharing among emerging technical talent. In a world where innovation happens at the intersection of disciplines, we believe that connecting diverse technical minds creates opportunities for breakthrough solutions and career growth.`,
    },
  },
  {
    id: 'what-we-do',
    title: 'What We Do',
    icon: Lightbulb,
    content: {
      type: 'programs',
      programs: [
        {
          title: 'Showcase Series',
          description:
            'Low-stakes informal talks on cross-domain projects, lessons, and innovations, followed by unstructured networking.',
        },
        {
          title: 'Social/Networking Events',
          description:
            'Community-building gatherings designed to foster meaningful connections among young technical professionals.',
        },
        {
          title: 'Expos',
          description:
            'Interactive demos and mini-presentations highlighting applied technical innovation and real-world applications.',
        },
      ],
    },
  },

  {
    id: 'who-we-are',
    title: 'Who We Are',
    icon: Users,
    content: {
      type: 'text',
      text: `We are an independent network connecting early-career technical professionals across engineering, science, technology, and related fields. We remain unaffiliated with any single company or institution, ensuring our community remains diverse, unbiased, and focused on genuine knowledge sharing.`,
    },
  },
  {
    id: 'our-audience',
    title: 'Our Audience',
    icon: UserCheck,
    content: {
      type: 'text',
      text: `We serve early-career engineers, scientists, developers, and analysts who are seeking growth beyond their immediate discipline. Our community consists of ambitious professionals who understand that the future belongs to those who can think across boundaries and collaborate effectively with diverse technical teams.`,
    },
  },
  {
    id: 'partnership-opportunities',
    title: 'Partnership Opportunities',
    icon: Handshake,
    content: {
      type: 'list',
      text: `We offer corporate partners visibility with engaged young technical professionals through strategic collaboration opportunities.`,
      list: [
        'Collaboration on events and programs',
        'Sponsorship of accessible, high-value learning experiences',
        'Direct access to emerging technical talent',
      ],
    },
  },

  {
    id: 'our-capabilities',
    title: 'Our Capabilities',
    icon: Zap,
    content: {
      type: 'list',
      text: `We have a team in place and platforms ready for event delivery, ensuring seamless execution of our programs.`,
      list: [
        'Integrated ticketing and event management infrastructure',
        'Well connected team with proven track record',
        'Professional website and digital presence',
      ],
    },
  },
];

export function AboutAccordion() {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? accordionData : accordionData.slice(0, 3);

  const renderContent = (content: AccordionItemData['content']) => {
    switch (content.type) {
      case 'text':
        return (
          <p className='text-muted-foreground leading-relaxed text-lg'>
            {content.text?.split('**').map((part, index) =>
              index % 2 === 1 ? (
                <strong key={index} className='text-primary'>
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      case 'programs':
        return (
          <div className='space-y-6'>
            <div className='grid gap-4'>
              {content.programs?.map((program, index) => (
                <div
                  key={index}
                  className='p-4 rounded-lg bg-background/50 border border-border/30'
                >
                  <h4 className='font-semibold text-foreground mb-2 flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    {program.title}
                  </h4>
                  <p className='text-muted-foreground'>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'list':
        return (
          <>
            {content.text && (
              <p className='text-muted-foreground leading-relaxed text-lg mb-4'>
                {content.text.split('**').map((part, index) =>
                  index % 2 === 1 ? (
                    <strong key={index} className='text-primary'>
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            )}
            {content.list && (
              <div className='grid gap-3'>
                {content.list.map((item, index) => (
                  <div key={index} className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-muted-foreground'>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-border/50 p-8'>
      <Accordion type='single' collapsible className='w-full space-y-4'>
        {visibleItems.map(item => {
          const IconComponent = item.icon;
          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className='border border-border/30 rounded-xl px-6 bg-muted/30'
            >
              <AccordionTrigger className=' flex items-center text-left hover:no-underline group'>
                <div className='flex items-center gap-4 '>
                  <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors'>
                    <IconComponent className='h-6 w-6 text-primary' />
                  </div>
                  <div className='flex items-center text-xl font-semibold text-foreground'>
                    {item.title}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pt-4'>
                <div className='pl-16'>{renderContent(item.content)}</div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Show more / less toggle */}
      <div className='mt-6 text-center'>
        <button
          onClick={() => setShowAll(!showAll)}
          className='text-primary font-medium hover:underline'
        >
          {showAll ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>
    </div>
  );
}
