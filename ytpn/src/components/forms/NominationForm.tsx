'use client';

import { Award } from 'lucide-react';
import BaseEmbedableForm from './BaseEmbedableForm';
import { formLinks, type FormLinks } from '@/db';

/**
 * NominationForm Component
 * 
 * Functional Requirements:
 * - Display a simple form for nominating outstanding professionals
 * - Show title and description in the modal
 * - Maintain responsive design across all screen sizes
 * - Provide clean, minimal interface without complex layers
 */

export default function NominationForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <BaseEmbedableForm
        formUrl={formLinks.Nomination}
        height={600}
        successMessage={{
          title: "Thank You!",
          description: "Your nomination has been submitted successfully."
        }}
        loadingMessage="Loading nomination form..."
        headerContent={
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Nominate Excellence
            </h3>
            <p className="text-foreground-secondary text-sm">
              Help us recognize outstanding technical professionals in our community by nominating 
              individuals who have made significant contributions to the field.
            </p>
          </div>
        }
      />
    </div>
  );
}
