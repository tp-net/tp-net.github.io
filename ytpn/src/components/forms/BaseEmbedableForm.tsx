'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * BaseEmbedableForm Component
 * 
 * Functional Requirements:
 * - Embed external forms (Google Forms, Typeform, etc.) in a consistent UI wrapper
 * - Provide loading states with smooth transitions
 * - Handle form submission success states
 * - Support custom form heights and styling
 * - Maintain responsive design across all screen sizes
 * - Provide customizable success message display
 * - Support custom overlay gradients for better visual integration
 */

interface BaseEmbedableFormProps {
  /** The URL of the form to embed */
  formUrl: string;
  /** Height of the embedded form in pixels */
  height?: number;
  /** Custom success message to display after form submission */
  successMessage?: {
    title: string;
    description: string;
  };
  /** Custom loading message */
  loadingMessage?: string;
  /** Whether to show the success overlay (default: true) */
  showSuccessOverlay?: boolean;
  /** Custom CSS classes for the form container */
  containerClassName?: string;
  /** Custom CSS classes for the iframe */
  iframeClassName?: string;
  /** Callback function when form loads */
  onFormLoad?: () => void;
  /** Callback function when form is submitted */
  onFormSubmit?: () => void;
  /** Custom content to render above the form */
  headerContent?: ReactNode;
  /** Custom content to render below the form */
  footerContent?: ReactNode;
}

export default function BaseEmbedableForm({
  formUrl,
  height = 800,
  successMessage = {
    title: "Thank You!",
    description: "We'll be in touch soon."
  },
  loadingMessage = "Loading form...",
  showSuccessOverlay = true,
  containerClassName = "",
  iframeClassName = "",
  onFormLoad,
  onFormSubmit,
  headerContent,
  footerContent
}: BaseEmbedableFormProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onFormLoad?.();
    }, 500);
    return () => clearTimeout(timer);
  }, [onFormLoad]);

  const handleFormSubmit = () => {
    if (showSuccessOverlay) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    onFormSubmit?.();
  };

  // Listen for form submission events (this is a basic implementation)
  // In a real scenario, you might need to implement more sophisticated
  // form submission detection based on the specific form provider
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // This is a basic implementation - you may need to customize
      // based on your specific form provider's postMessage events
      if (event.data && typeof event.data === 'string' && event.data.includes('form-submit')) {
        handleFormSubmit();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Success State Overlay */}
      {showSuccess && showSuccessOverlay && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {successMessage.title}
            </h3>
            <p className="text-foreground-secondary">
              {successMessage.description}
            </p>
          </div>
        </div>
      )}

      {/* Header Content */}
      {headerContent && (
        <div className="mb-8">
          {headerContent}
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-foreground-secondary">{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Form Embed */}
      <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          <iframe 
            src={formUrl}
            width="100%" 
            height={height} 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className={`w-full bg-background ${iframeClassName}`}
            style={{ height: `${height}px` }}
            onLoad={() => {
              setIsLoaded(true);
              onFormLoad?.();
            }}
          >
            Loading…
          </iframe>
          
          {/* Overlay gradient for better integration */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Footer Content */}
      {footerContent && (
        <div className="mt-8">
          {footerContent}
        </div>
      )}
    </div>
  );
}
