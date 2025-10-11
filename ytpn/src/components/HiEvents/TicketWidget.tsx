'use client';

/**
 * FUNCTIONAL REQUIREMENTS:
 * - HiEvents ticket widget integration with theme-aware colors
 * - Automatic color adaptation for light and dark forest themes
 * - Uses forest theme color palette for consistent branding
 * - Responsive widget that adapts to theme changes
 * - Maintains accessibility with proper contrast ratios
 * - Seamless integration with existing theme system
 */

import { useTheme } from '@/components/providers/ThemeProvider';
import { palette } from '@/styles/palette';

// Forest theme color mappings for HiEvents widget using imported palette
const getThemeColors = (resolvedTheme: 'light' | 'dark') => {
  const colors = palette[resolvedTheme];
  
  if (resolvedTheme === 'dark') {
    return {
      primaryColor: colors.primary, // Medium forest green
      primaryTextColor: colors.background, // Very dark forest green
      secondaryColor: colors.secondary, // Dark forest green
      secondaryTextColor: colors.foreground, // Light mint green
      backgroundColor: `${colors.background}bf`, // Very dark forest green with transparency
    };
  } else {
    return {
      primaryColor: colors.primary, // Rich forest green
      primaryTextColor: colors.background, // Warm cream
      secondaryColor: colors.secondary, // Light sage green
      secondaryTextColor: colors.foreground, // Deep forest green
      backgroundColor: `${colors.background}bf`, // Warm cream with transparency
    };
  }
};

export default function TicketWidget({ eventId }: { eventId: string }) {
  const { resolvedTheme } = useTheme();
  const colors = getThemeColors(resolvedTheme);

  return (
    <div 
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
      className="hievents-widget"
    />
  );
}


