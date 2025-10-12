'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import { HI_EVENTS_HOST, HI_EVENTS_ORGANISER_PAGE } from "./HighEventsConfig";

/**
 * FUNCTIONAL REQUIREMENTS:
 * - Detect if HiEvents widget has loaded successfully by checking for widget content
 * - Show spinner button with "Register Now" text for first 5 seconds
 * - Display tooltip explaining cold start behavior during loading
 * - After 5 seconds, show two buttons: refresh page and backup link
 * - Handle widget loading states gracefully with proper fallbacks
 * - Use forest theme system for consistent styling
 * - Ensure responsive design and accessibility
 * - Provide proper ARIA labels and keyboard navigation
 */

function getBackupLink({eventId, eventSlug}: {eventId?: string, eventSlug?: string}) {
  if (eventId && eventSlug) {
    return `${HI_EVENTS_HOST}/event/${eventId}/${eventSlug}`;
  }
  else{
    return HI_EVENTS_ORGANISER_PAGE;
  }
}

interface ColdStartWidgetWrapperProps {
  widget: React.ReactNode;
  eventId?: string;
  eventSlug?: string;
}

function ColdStartWidgetWrapper({widget, eventId, eventSlug}: ColdStartWidgetWrapperProps){
   /**
  The ticketing service has a cold start. So this should be shown if the events widget fails to load. (the div will be empty)
  The button should only render if the widget is not loaded.
  For the first five seconds, the button should show immediately with a spinner.
  After five seconds, it should be a link to the backup link.
  The button should have the text "Register Now", it should have a tooltip that explains the cold start behaviour.
  "Our ticketing service is still warming up. Try again in a few seconds."
  Then two buttons should be shown one, to refresh the the page, and one to go to the backup link.
  */
  const [isWidgetLoaded, setIsWidgetLoaded] = useState<boolean>(false);
  const [showFallbackButtons, setShowFallbackButtons] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const widgetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if widget has loaded by looking for content in the widget container
  const checkWidgetLoaded = () => {
    if (widgetRef.current) {
      const widgetElement = widgetRef.current.querySelector('.hievents-widget');
      if (widgetElement) {
        // Check if widget has actual content (not just empty div)
        const hasContent = widgetElement.children.length > 0 || 
                          widgetElement.textContent?.trim().length > 0 ||
                          widgetElement.innerHTML.includes('hievents') ||
                          widgetElement.querySelector('[data-hievents]');
        
        if (hasContent) {
          setIsWidgetLoaded(true);
          setIsLoading(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          return true;
        }
      }
    }
    return false;
  };

  // Set up periodic checking for widget loading
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (!isWidgetLoaded) {
        checkWidgetLoaded();
      }
    }, 500); // Check every 500ms

    // Set timeout to show fallback buttons after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (!isWidgetLoaded) {
        setShowFallbackButtons(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isWidgetLoaded]);

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const handleBackupLink = () => {
    const backupUrl = getBackupLink({eventId, eventSlug});
    window.open(backupUrl, '_blank', 'noopener,noreferrer');
  };

  const backupUrl = getBackupLink({eventId, eventSlug});

  return (
    <div className="w-full">
      {/* Widget Container */}
      <div ref={widgetRef} className="w-full">
        {widget}
      </div>

      {/* Cold Start Fallback UI */}
      {!isWidgetLoaded && (
        <div className="flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg w-full mt-4">
          <div className="text-center space-y-4 p-6 max-w-md mx-auto w-full">
            {isLoading && !showFallbackButtons ? (
              // Loading state with spinner
              <div className="space-y-3">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  title="Our ticketing service is still warming up. Try again in a few seconds."
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                </button>
              
              </div>
            ) : (
              // Fallback buttons after timeout
              <div className="space-y-3">
                <p className="text-sm text-foreground-secondary mb-4">
                  The ticketing service may be warming up. Try again in a few seconds, and if the issue persists, please contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleRefreshPage}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-background-secondary text-foreground-secondary border border-border rounded-lg font-medium text-sm hover:bg-background-tertiary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Page
                  </button>
                  <button
                    onClick={handleBackupLink}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Register on External Site
                  </button>
                </div>
                <p className="text-xs text-foreground-tertiary break-all">
                  Or visit: <a href={backupUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{backupUrl}</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BaseTicketWidget({ eventId }: { eventId: string }) {

  return (
    <div data-hievents-id={eventId} data-hievents-primary-color="#91b89e" data-hievents-primary-text-color="#14532d" data-hievents-secondary-color="#16a34a" data-hievents-secondary-text-color="#eefff3" data-hievents-background-color="#ffffffbf" data-hievents-widget-type="widget" data-hievents-widget-version="1.0" data-hievents-locale="en" data-hievents-padding="20px" data-hievents-autoresize="true" data-hievents-continue-button-text="Continue" className="hievents-widget rounded-lg"/>
  );
}

interface TicketWidgetProps {
  eventId: string;
  eventSlug?: string;
}

export default function TicketWidget({ eventId, eventSlug }: TicketWidgetProps) {
  return (
    <ColdStartWidgetWrapper 
      widget={<BaseTicketWidget eventId={eventId} />} 
      eventId={eventId}
      eventSlug={eventSlug}
    />
  );
}
