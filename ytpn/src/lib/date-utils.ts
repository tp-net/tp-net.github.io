/**
 * Date formatting utilities for events
 */

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatEventDateTime(date: Date): { date: string; time: string } {
  return {
    date: formatEventDate(date),
    time: formatEventTime(date)
  };
}
