/**
 * Date formatting utilities for events
 * Handles missing dates by displaying "TBC" (To Be Confirmed)
 * Includes day of week formatting options for different use cases
 */

export function formatEventDate(date?: Date): string {
  if (!date) {
    return 'TBC';
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
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

export function formatEventDateShort(date?: Date): string {
  if (!date) {
    return 'TBC';
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function formatEventDateWithoutYear(date?: Date): string {
  if (!date) {
    return 'TBC';
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}
