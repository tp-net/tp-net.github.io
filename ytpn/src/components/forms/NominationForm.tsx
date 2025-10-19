'use client';

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
    <div className='w-full max-w-4xl mx-auto'>
      <BaseEmbedableForm
        formUrl={formLinks.Nomination}
        height={600}
        loadingMessage='Loading nomination form...'
      />
    </div>
  );
}
