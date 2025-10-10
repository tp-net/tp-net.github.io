/**
 * Date formatting utilities for events
 * Handles missing dates by displaying "TBC" (To Be Confirmed)
 */

export function formatEventDate(date?: Date): string {
  if (!date) {
    return 'TBC';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatEventTime(date?: Date): string {
  if (!date) {
    return 'TBC';
  }
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatEventDateTime(date?: Date): { date: string; time: string } {
  return {
    date: formatEventDate(date),
    time: formatEventTime(date)
  };
}
