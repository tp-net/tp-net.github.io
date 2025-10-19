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
    <div className='w-full max-w-4xl mx-auto'>
      <BaseEmbedableForm
        formUrl={formLinks.Sponsorship}
        height={600}
        loadingMessage='Loading sponsorship form...'
      />
    </div>
  );
}
