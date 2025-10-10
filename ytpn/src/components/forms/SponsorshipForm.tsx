'use client';

import { DollarSign } from 'lucide-react';
import BaseEmbedableForm from './BaseEmbedableForm';
import { formLinks, type FormLinks } from '@/db';

/**
 * SponsorshipForm Component
 * 
 * Functional Requirements:
 * - Display a simple form for sponsorship inquiries
 * - Show title and description in the modal
 * - Maintain responsive design across all screen sizes
 * - Provide clean, minimal interface without complex layers
 */

export default function SponsorshipForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <BaseEmbedableForm
        formUrl={formLinks.Sponsorship}
        height={600}
        successMessage={{
          title: "Thank You!",
          description: "We'll review your sponsorship inquiry and get back to you soon."
        }}
        loadingMessage="Loading sponsorship form..."
        headerContent={
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Become a Sponsor
            </h3>
            <p className="text-foreground-secondary text-sm">
              Partner with the Young Technical Professionals Network and support the next generation 
              of technical leaders while gaining valuable exposure to our community.
            </p>
          </div>
        }
      />
    </div>
  );
}
