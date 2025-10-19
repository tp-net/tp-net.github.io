'use client';

import { useState, ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * BaseEmbedableForm Component
 *
 * Functional Requirements:
 * - Embed external forms (Google Forms, Typeform, etc.) in a consistent UI wrapper
 * - Provide basic loading state
 * - Handle form submission success states
 * - Support custom form heights and styling
 * - Maintain responsive design across all screen sizes
 */

interface BaseEmbedableFormProps {
  /** The URL of the form to embed */
  formUrl: string;
  /** Height of the embedded form in pixels */
  height?: number;

  /** Custom loading message to display while form loads */
  loadingMessage?: string;

  /** Custom CSS classes for the iframe */
  iframeClassName?: string;
}

export default function BaseEmbedableForm({
  formUrl,
  height = 800,
  loadingMessage = 'Loading form...',
  iframeClassName = '',
}: BaseEmbedableFormProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loading State */}
      {!isLoaded && (
        <div className='flex items-center justify-center lg:p-8 p-0 bg-muted/50 rounded-lg'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Form Embed */}

      <div
        className={`transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <iframe
          src={formUrl}
          width='100%'
          height={height}
          frameBorder='0'
          marginHeight={0}
          marginWidth={0}
          className={`w-full bg-background rounded-lg border ${iframeClassName}`}
          style={{
            height: `${height}px`,
            minHeight: '400px',
          }}
          onLoad={() => setIsLoaded(true)}
          title='Embedded Form'
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}
