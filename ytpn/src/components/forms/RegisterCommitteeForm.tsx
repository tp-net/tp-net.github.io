'use client';

import { Users, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import BaseEmbedableForm from './BaseEmbedableForm';
import { formLinks, type FormLinks } from '@/db';

export default function RegisterCommitteeForm() {

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Leadership Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Our Committee
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              Take an active role in shaping the Young Technical Professionals Network by joining 
              one of our committees and helping drive our mission forward.
            </p>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            
            {/* Main Form Card */}
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
              <BaseEmbedableForm
                formUrl={formLinks.RegisterCommitee}
                height={800}
                successMessage={{
                  title: "Thank You!",
                  description: "We'll review your committee application and be in touch soon."
                }}
                loadingMessage="Loading committee registration form..."
                headerContent={
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Committee Registration
                    </h3>
                    <p className="text-foreground-secondary">
                      Apply to join one of our committees and help shape our community
                    </p>
                  </div>
                }
                footerContent={
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-foreground-secondary text-sm">
                      <span>Questions about committees? Reach out to us</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background-secondary/50 rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Leadership</h4>
              <p className="text-sm text-foreground-secondary">
                Develop leadership skills and make a real impact
              </p>
            </div>
            
            <div className="text-center p-6 bg-background-secondary/50 rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Networking</h4>
              <p className="text-sm text-foreground-secondary">
                Connect with other committee members and industry leaders
              </p>
            </div>
            
            <div className="text-center p-6 bg-background-secondary/50 rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Growth</h4>
              <p className="text-sm text-foreground-secondary">
                Gain valuable experience in community building and event planning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
