'use client';

import { Download, Calendar } from 'lucide-react';
import { type Event } from '@/db/typesAndFunctions/events';
import { downloadEventICalFile, downloadMultipleEventsICalFile } from '@/db/typesAndFunctions/eventUtils';

interface ICalDownloadButtonProps {
  event?: Event;
  events?: Event[];
  variant?: 'single' | 'multiple' | 'all';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Functional Requirements:
 * - Download single event as iCal file
 * - Download multiple events as iCal file
 * - Download all events as iCal file
 * - Provide visual feedback during download
 * - Handle error states gracefully
 * - Support custom styling and children
 */
export function ICalDownloadButton({ 
  event, 
  events, 
  variant = 'single',
  className = '',
  children 
}: ICalDownloadButtonProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (variant === 'single' && event) {
        downloadEventICalFile(event);
      } else if (variant === 'multiple' && events) {
        downloadMultipleEventsICalFile(events);
      } else if (variant === 'all' && events) {
        downloadMultipleEventsICalFile(events, 'ytpn-all-events.ics');
      }
    } catch (error) {
      console.error('Failed to download iCal file:', error);
      // In a production app, you might want to show a toast notification here
    }
  };

  const getButtonText = () => {
    if (children) return children;
    
    switch (variant) {
      case 'single':
        return 'Add to Calendar';
      case 'multiple':
        return 'Download All Events';
      case 'all':
        return 'Download All Events';
      default:
        return 'Add to Calendar';
    }
  };

  const getIcon = () => {
    return variant === 'single' ? <Calendar className="w-4 h-4" /> : <Download className="w-4 h-4" />;
  };

  return (
    <button
      onClick={handleDownload}
      data-prevent-navigation
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-primary text-primary-foreground 
        rounded-lg font-medium text-sm
        hover:bg-primary/90 
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={!event && !events}
      title={`Download ${variant === 'single' ? 'event' : 'events'} as iCal file`}
    >
      {getIcon()}
      {getButtonText()}
    </button>
  );
}

/**
 * Specialized component for downloading a single event
 */
export function SingleEventICalButton({ 
  event, 
  className = '',
  children 
}: { 
  event: Event; 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ICalDownloadButton 
      event={event} 
      variant="single" 
      className={className}
    >
      {children}
    </ICalDownloadButton>
  );
}

/**
 * Specialized component for downloading multiple events
 */
export function MultipleEventsICalButton({ 
  events, 
  className = '',
  children 
}: { 
  events: Event[]; 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ICalDownloadButton 
      events={events} 
      variant="multiple" 
      className={className}
    >
      {children}
    </ICalDownloadButton>
  );
}
