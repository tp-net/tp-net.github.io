'use client';

import { Users } from 'lucide-react';
import BaseEmbedableForm from './BaseEmbedableForm';
import { formLinks, type FormLinks } from '@/db';

/**
 * RegisterCommitteeForm Component
 *
 * Functional Requirements:
 * - Display a simple form for committee registration
 * - Show title and description in the modal
 * - Maintain responsive design across all screen sizes
 * - Provide clean, minimal interface without complex layers
 */

export default function RegisterCommitteeForm() {
  return (
    <div className='w-full max-w-4xl mx-auto'>
      <BaseEmbedableForm
        formUrl={formLinks.RegisterCommitee}
        height={600}
        loadingMessage='Loading committee registration form...'
      />
    </div>
  );
}
