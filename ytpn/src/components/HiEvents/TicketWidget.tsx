'use client';

export default function TicketWidget({ eventId }: { eventId: string }) {
  return (
    <div data-hievents-id={eventId} data-hievents-primary-color="#91b89e" data-hievents-primary-text-color="#14532d" data-hievents-secondary-color="#16a34a" data-hievents-secondary-text-color="#eefff3" data-hievents-background-color="#ffffffbf" data-hievents-widget-type="widget" data-hievents-widget-version="1.0" data-hievents-locale="en" data-hievents-padding="20px" data-hievents-autoresize="true" data-hievents-continue-button-text="Continue" className="hievents-widget rounded-lg"/>
  );
}


