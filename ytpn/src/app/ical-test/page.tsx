'use client';

import { useState } from 'react';
import { Calendar, Download, CheckCircle } from 'lucide-react';
import { events } from '@/db/data/events';
import { generateEventICalContent, generateMultipleEventsICalContent } from '@/db/typesAndFunctions/eventUtils';
import { downloadEventICalFile, downloadMultipleEventsICalFile } from '@/db/typesAndFunctions/eventUtils';
import { MetadataBreadcrumb } from '@/components/ui/metadata-breadcrumb';

/**
 * Functional Requirements:
 * - Test iCal generation for single events
 * - Test iCal generation for multiple events
 * - Display generated iCal content for verification
 * - Provide download functionality for testing
 * - Show validation results
 * - Allow testing with different event configurations
 */

export default function ICalTestPage() {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [generatedICal, setGeneratedICal] = useState<string>('');
  const [testResults, setTestResults] = useState<{
    singleEvent: boolean;
    multipleEvents: boolean;
    eventCount: number;
  } | null>(null);

  const selectedEvent = events[selectedEventIndex];

  const testSingleEvent = () => {
    if (!selectedEvent) return;
    
    const icalContent = generateEventICalContent(selectedEvent);
    setGeneratedICal(icalContent);
    
    // Validate the generated content
    const isValid = icalContent.includes('BEGIN:VCALENDAR') && 
                   icalContent.includes('END:VCALENDAR') &&
                   icalContent.includes('BEGIN:VEVENT') &&
                   icalContent.includes('END:VEVENT') &&
                   icalContent.includes('SUMMARY:') &&
                   icalContent.includes('DTSTART:') &&
                   icalContent.includes('DTEND:');
    
    setTestResults(prev => ({
      ...prev,
      singleEvent: isValid,
      multipleEvents: prev?.multipleEvents || false,
      eventCount: prev?.eventCount || 0
    }));
  };

  const testMultipleEvents = () => {
    const icalContent = generateMultipleEventsICalContent(events);
    setGeneratedICal(icalContent);
    
    // Validate the generated content
    const eventCount = (icalContent.match(/BEGIN:VEVENT/g) || []).length;
    const isValid = icalContent.includes('BEGIN:VCALENDAR') && 
                   icalContent.includes('END:VCALENDAR') &&
                   eventCount === events.length;
    
    setTestResults(prev => ({
      ...prev,
      singleEvent: prev?.singleEvent || false,
      multipleEvents: isValid,
      eventCount: eventCount
    }));
  };

  const downloadSingleEvent = () => {
    if (selectedEvent) {
      downloadEventICalFile(selectedEvent);
    }
  };

  const downloadAllEvents = () => {
    downloadMultipleEventsICalFile(events);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <MetadataBreadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'iCal Test' }
            ]}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 mx-auto">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              iCal Generation Test
            </h1>
            <p className="text-xl text-foreground-secondary">
              Test and verify iCal file generation for events
            </p>
          </div>

          {/* Test Controls */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Test Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Single Event Test */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Single Event Test</h3>
                
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">
                    Select Event:
                  </label>
                  <select
                    value={selectedEventIndex}
                    onChange={(e) => setSelectedEventIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {events.map((event, index) => (
                      <option key={index} value={index}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={testSingleEvent}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Test Generation
                  </button>
                  
                  <button
                    onClick={downloadSingleEvent}
                    className="flex items-center gap-2 px-4 py-2 bg-background-secondary text-foreground border border-border rounded-md hover:bg-background-tertiary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Multiple Events Test */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Multiple Events Test</h3>
                <p className="text-sm text-foreground-secondary">
                  Test generation for all {events.length} events
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={testMultipleEvents}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Test Generation
                  </button>
                  
                  <button
                    onClick={downloadAllEvents}
                    className="flex items-center gap-2 px-4 py-2 bg-background-secondary text-foreground border border-border rounded-md hover:bg-background-tertiary transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Test Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-6 h-6 ${testResults.singleEvent ? 'text-success' : 'text-destructive'}`} />
                  <div>
                    <div className="font-medium text-foreground">Single Event</div>
                    <div className={`text-sm ${testResults.singleEvent ? 'text-success' : 'text-destructive'}`}>
                      {testResults.singleEvent ? 'PASSED' : 'FAILED'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-6 h-6 ${testResults.multipleEvents ? 'text-success' : 'text-destructive'}`} />
                  <div>
                    <div className="font-medium text-foreground">Multiple Events</div>
                    <div className={`text-sm ${testResults.multipleEvents ? 'text-success' : 'text-destructive'}`}>
                      {testResults.multipleEvents ? 'PASSED' : 'FAILED'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-info" />
                  <div>
                    <div className="font-medium text-foreground">Event Count</div>
                    <div className="text-sm text-info">
                      {testResults.eventCount} events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generated iCal Content */}
          {generatedICal && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Generated iCal Content</h2>
              
              <div className="bg-background-secondary border border-border rounded-md p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono overflow-x-auto">
                  {generatedICal}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
