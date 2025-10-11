'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - HiEvents ticket widget integration with theme-aware colors
 * - Automatic color adaptation for light and dark forest themes
 * - Uses forest theme color palette for consistent branding
 * - Responsive widget that adapts to theme changes without page refresh
 * - Maintains accessibility with proper contrast ratios
 * - Seamless integration with existing theme system
 * - Transparent background for better integration with page design
 * - Immediate theme reactivity using key-based re-rendering
 */

import { useTheme } from '@/components/providers/ThemeProvider';
import { palette } from '@/styles/palette';

// Forest theme color mappings for HiEvents widget using imported palette
const getThemeColors = (resolvedTheme: 'light' | 'dark') => {
  const colors = palette[resolvedTheme];
  
  if (resolvedTheme === 'light') {
    return {
      primaryColor: colors.primary, // Dark forest green for buttons/links
      primaryTextColor: colors.foreground, // Dark text on light backgrounds
      secondaryColor: colors.secondary, // Light sage green for secondary elements
      secondaryTextColor: colors.primary, // Dark forest green for secondary text
      backgroundColor: 'transparent', // Transparent background
    };
  } else {
    return {
      primaryColor: colors.primary, // Medium forest green for buttons/links
      primaryTextColor: colors.foreground, // Light mint green for text
      secondaryColor: colors.secondary, // Dark forest green for secondary elements
      secondaryTextColor: colors.foreground, // Light mint green for secondary text
      backgroundColor: 'transparent', // Transparent background
    };
  }
};

export default function TicketWidget({ eventId }: { eventId: string }) {
  const { resolvedTheme } = useTheme();
  const colors = getThemeColors(resolvedTheme);

  return (
    <div 
      key={`hievents-widget-${resolvedTheme}`} // Force re-render on theme change
      data-hievents-id={eventId} 
      data-hievents-primary-color={colors.primaryColor}
      data-hievents-primary-text-color={colors.primaryTextColor}
      data-hievents-secondary-color={colors.secondaryColor}
      data-hievents-secondary-text-color={colors.secondaryTextColor}
      data-hievents-background-color={colors.backgroundColor}
      data-hievents-widget-type="widget" 
      data-hievents-widget-version="1.0" 
      data-hievents-locale="en" 
      data-hievents-padding="20px" 
      data-hievents-autoresize="true" 
      data-hievents-continue-button-text="Continue" 
      className="hievents-widget border-rounded-md"
    />
  );
}


