'use client';

import { Users } from 'lucide-react';
import BaseEmbedableForm from './BaseEmbedableForm';
import { formLinks, type FormLinks } from '@/db';

/**
 * JoinForm Component
 * 
 * Functional Requirements:
 * - Display a simple form for membership registration
 * - Show title and description in the modal
 * - Maintain responsive design across all screen sizes
 * - Provide clean, minimal interface without complex layers
 */

export default function JoinForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <BaseEmbedableForm
        formUrl={formLinks.Membership}
        height={600}
        successMessage={{
          title: "Thank You!",
          description: "We'll be in touch soon."
        }}
        loadingMessage="Loading form..."
        headerContent={
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Join Our Network
            </h3>
            <p className="text-foreground-secondary text-sm">
              Join the Young Technical Professionals Network and become part of a community 
              of innovative thinkers and builders solving tomorrow's challenges today.
            </p>
          </div>
        }
      />
    </div>
  );
}