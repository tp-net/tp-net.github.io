'use client';

import { 
  Users, 
  Calendar, 
  Award, 
  Network, 
  Handshake, 
  Lightbulb, 
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Heart
} from 'lucide-react';
import RegisterCommitteeForm from '@/components/forms/RegisterCommitteeForm';
import { APP_CONSTS } from '@/data/app';

/**
 * Reps Page Component
 * 
 * Functional Requirements:
 * - Display comprehensive information about becoming an organizational YTPN representative
 * - Target HR professionals, graduate committees, and professional associations
 * - Include process section explaining how organizations can become reps
 * - Show benefits for organizational collaboration (member development, networking, partnership)
 * - List responsibilities (collaborative event organization, member nominations, etc.)
 * - Provide organizational rep sign-up form using existing form infrastructure
 * - Include cost information (free for now)
 * - Maintain responsive design across all screen sizes
 * - Use forest theme system consistently
 * - Follow K.I.S.S. principles with clear, actionable content
 */

const processSteps = [
  {
    title: 'Apply',
    description: 'Submit your organization\'s application through our form. Tell us about your organization, member base, and collaboration goals.',
    icon: <Users className="w-6 h-6" />
  },
  {
    title: 'Review',
    description: 'Our team reviews applications and may reach out to discuss partnership opportunities and mutual benefits.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    title: 'Partnership',
    description: 'Once approved, we\'ll establish a formal partnership agreement and provide access to our collaboration resources.',
    icon: <Handshake className="w-6 h-6" />
  },
  {
    title: 'Collaborate',
    description: 'Start collaborating on events, nominating your members for opportunities, and building stronger professional networks.',
    icon: <Target className="w-6 h-6" />
  }
];

const benefits = [
  {
    title: 'Member Development',
    description: 'Provide your members with exclusive access to professional development opportunities, workshops, and industry insights.',
    icon: <Award className="w-8 h-8" />,
    color: 'text-primary'
  },
  {
    title: 'Expanded Networks',
    description: 'Connect your organization with other professional associations, industry leaders, and technical communities.',
    icon: <Network className="w-8 h-8" />,
    color: 'text-info'
  },
  {
    title: 'Collaborative Events',
    description: 'Co-host events, workshops, and networking sessions that benefit both your members and the broader technical community.',
    icon: <Heart className="w-8 h-8" />,
    color: 'text-destructive'
  },
  {
    title: 'Recognition & Visibility',
    description: 'Gain recognition as a forward-thinking organization committed to developing the next generation of technical professionals.',
    icon: <Star className="w-8 h-8" />,
    color: 'text-warning'
  }
];

const responsibilities = [
  {
    title: 'Event Collaboration',
    description: 'Partner with YTPN to co-organize events, workshops, and conferences that benefit your members and the broader community.',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: 'Member Nominations',
    description: 'Nominate your qualified members for speaking opportunities, awards, and leadership positions within the network.',
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    title: 'Network Expansion',
    description: 'Help expand both networks by promoting YTPN events to your members and introducing your organization to our community.',
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: 'Strategic Input',
    description: 'Provide organizational perspective and feedback to help shape YTPN\'s programs and ensure they meet industry needs.',
    icon: <Target className="w-6 h-6" />
  }
];

export default function RepsPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background-secondary to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Become an Organizational <span className="text-primary">{APP_CONSTS.APP_SHORTNAME}</span> Representative
            </h1>
            <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
              Partner with us to provide your members with exclusive professional development opportunities. 
              Perfect for HR departments, graduate committees, and professional associations looking to expand their networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
              >
                Apply for Your Organization
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
              What's in it for you
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Partner with {APP_CONSTS.APP_SHORTNAME}?
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Partnering with {APP_CONSTS.APP_SHORTNAME} offers your organization unique opportunities to 
              enhance member value, expand networks, and strengthen your professional community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="bg-card rounded-lg p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-background-secondary rounded-xl mb-6 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-foreground-tertiary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Partnership Process
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              Establishing a partnership with {APP_CONSTS.APP_SHORTNAME} is straightforward. 
              Here's what your organization can expect from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 text-primary-foreground">
                  {step.icon}
                </div>
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-4">
              Your role
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partnership Responsibilities
            </h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              As a partner organization, you'll play a key role in building and maintaining our community. 
              Here's what we expect from our organizational representatives.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {responsibilities.map((responsibility) => (
              <div 
                key={responsibility.title}
                className="bg-card rounded-lg p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {responsibility.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-3">
                      {responsibility.title}
                    </h3>
                    <p className="text-foreground-tertiary leading-relaxed">
                      {responsibility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Completely Free Partnership
            </h2>
            <p className="text-xl text-foreground-secondary mb-8 leading-relaxed">
              There's no cost to become a {APP_CONSTS.APP_SHORTNAME} partner organization. We believe in 
              building partnerships based on mutual benefit and community impact, not financial barriers.
            </p>
            <div className="bg-success/5 border border-success/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-success mb-4">
                What You Get for Free
              </h3>
              <ul className="text-left text-foreground-secondary space-y-2 max-w-2xl mx-auto">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                  Full access to our partner organization resources and collaboration tools
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                  Exclusive professional development opportunities for your members
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                  Co-hosting opportunities and access to industry leaders
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                  Dedicated support and partnership guidance from our team
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Partner with Us?
              </h2>
              <p className="text-lg text-foreground-secondary">
                Join our network of partner organizations and help shape the future of technical professional development.
              </p>
            </div>
            
            <RegisterCommitteeForm />
          </div>
        </div>
      </section>
    </div>
  );
}
