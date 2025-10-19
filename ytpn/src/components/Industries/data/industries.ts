export interface IndustryNode {
  id: string;
  label: string;
  size: number;
  color: {
    light: string;
    dark: string;
  };
  category: 'traditional' | 'tech' | 'emerging' | 'infrastructure';
}

export interface IndustryEdge {
  source: string;
  target: string;
  weight: number;
  color: {
    light: string;
    dark: string;
  };
}

// Theme-aware color palette
export const industryColors = {
  traditional: {
    light: {
      primary: '#059669', // emerald-600
      secondary: '#10b981', // emerald-500
      tertiary: '#34d399', // emerald-400
    },
    dark: {
      primary: '#10b981', // emerald-500
      secondary: '#34d399', // emerald-400
      tertiary: '#6ee7b7', // emerald-300
    },
  },
  tech: {
    light: {
      primary: '#2563eb', // blue-600
      secondary: '#3b82f6', // blue-500
      tertiary: '#60a5fa', // blue-400
    },
    dark: {
      primary: '#3b82f6', // blue-500
      secondary: '#60a5fa', // blue-400
      tertiary: '#93c5fd', // blue-300
    },
  },
  emerging: {
    light: {
      primary: '#7c3aed', // violet-600
      secondary: '#8b5cf6', // violet-500
      tertiary: '#a78bfa', // violet-400
    },
    dark: {
      primary: '#8b5cf6', // violet-500
      secondary: '#a78bfa', // violet-400
      tertiary: '#c4b5fd', // violet-300
    },
  },
  infrastructure: {
    light: {
      primary: '#dc2626', // red-600
      secondary: '#ef4444', // red-500
      tertiary: '#f87171', // red-400
    },
    dark: {
      primary: '#ef4444', // red-500
      secondary: '#f87171', // red-400
      tertiary: '#fca5a5', // red-300
    },
  },
} as const;

// Helper function to get theme-appropriate color
export const getThemeColor = (
  category: keyof typeof industryColors,
  variant: 'primary' | 'secondary' | 'tertiary',
  isDark: boolean
): string => {
  return industryColors[category][isDark ? 'dark' : 'light'][variant];
};

export const nodes: IndustryNode[] = [
  {
    id: 'energy',
    label: 'Energy',
    size: 20,
    color: {
      light: industryColors.traditional.light.primary,
      dark: industryColors.traditional.dark.primary,
    },
    category: 'traditional',
  },
  {
    id: 'mining',
    label: 'Mining',
    size: 18,
    color: {
      light: industryColors.traditional.light.secondary,
      dark: industryColors.traditional.dark.secondary,
    },
    category: 'traditional',
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    size: 22,
    color: {
      light: industryColors.traditional.light.tertiary,
      dark: industryColors.traditional.dark.tertiary,
    },
    category: 'traditional',
  },
  {
    id: 'construction',
    label: 'Construction',
    size: 16,
    color: {
      light: industryColors.infrastructure.light.primary,
      dark: industryColors.infrastructure.dark.primary,
    },
    category: 'infrastructure',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    size: 19,
    color: {
      light: industryColors.infrastructure.light.secondary,
      dark: industryColors.infrastructure.dark.secondary,
    },
    category: 'infrastructure',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    size: 21,
    color: {
      light: industryColors.emerging.light.primary,
      dark: industryColors.emerging.dark.primary,
    },
    category: 'emerging',
  },
  {
    id: 'water',
    label: 'Water',
    size: 15,
    color: {
      light: industryColors.infrastructure.light.tertiary,
      dark: industryColors.infrastructure.dark.tertiary,
    },
    category: 'infrastructure',
  },
  {
    id: 'defence',
    label: 'Defence',
    size: 17,
    color: {
      light: industryColors.traditional.light.secondary,
      dark: industryColors.traditional.dark.secondary,
    },
    category: 'traditional',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    size: 18,
    color: {
      light: industryColors.traditional.light.tertiary,
      dark: industryColors.traditional.dark.tertiary,
    },
    category: 'traditional',
  },
  {
    id: 'software',
    label: 'Software',
    size: 24,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
    category: 'tech',
  },
  {
    id: 'web-development',
    label: 'Web Development',
    size: 20,
    color: {
      light: industryColors.tech.light.secondary,
      dark: industryColors.tech.dark.secondary,
    },
    category: 'tech',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    size: 23,
    color: {
      light: industryColors.tech.light.tertiary,
      dark: industryColors.tech.dark.tertiary,
    },
    category: 'tech',
  },
  {
    id: 'data-science',
    label: 'Data Science',
    size: 21,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
    category: 'tech',
  },
  {
    id: 'carbon-capture',
    label: 'Carbon Capture',
    size: 19,
    color: {
      light: industryColors.emerging.light.secondary,
      dark: industryColors.emerging.dark.secondary,
    },
    category: 'emerging',
  },
  {
    id: 'oil-gas',
    label: 'Oil and Gas',
    size: 20,
    color: {
      light: industryColors.traditional.light.primary,
      dark: industryColors.traditional.dark.primary,
    },
    category: 'traditional',
  },
];

export const edges: IndustryEdge[] = [
  {
    source: 'energy',
    target: 'mining',
    weight: 3,
    color: {
      light: industryColors.traditional.light.primary,
      dark: industryColors.traditional.dark.primary,
    },
  },
  {
    source: 'energy',
    target: 'oil-gas',
    weight: 4,
    color: {
      light: industryColors.traditional.light.primary,
      dark: industryColors.traditional.dark.primary,
    },
  },
  {
    source: 'energy',
    target: 'manufacturing',
    weight: 3,
    color: {
      light: industryColors.traditional.light.primary,
      dark: industryColors.traditional.dark.primary,
    },
  },
  {
    source: 'mining',
    target: 'manufacturing',
    weight: 2,
    color: {
      light: industryColors.traditional.light.secondary,
      dark: industryColors.traditional.dark.secondary,
    },
  },
  {
    source: 'manufacturing',
    target: 'construction',
    weight: 2,
    color: {
      light: industryColors.traditional.light.tertiary,
      dark: industryColors.traditional.dark.tertiary,
    },
  },
  {
    source: 'construction',
    target: 'transportation',
    weight: 2,
    color: {
      light: industryColors.infrastructure.light.primary,
      dark: industryColors.infrastructure.dark.primary,
    },
  },
  {
    source: 'transportation',
    target: 'energy',
    weight: 2,
    color: {
      light: industryColors.infrastructure.light.secondary,
      dark: industryColors.infrastructure.dark.secondary,
    },
  },
  {
    source: 'software',
    target: 'web-development',
    weight: 4,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
  },
  {
    source: 'software',
    target: 'cloud',
    weight: 4,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
  },
  {
    source: 'software',
    target: 'data-science',
    weight: 3,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
  },
  {
    source: 'cloud',
    target: 'data-science',
    weight: 3,
    color: {
      light: industryColors.tech.light.tertiary,
      dark: industryColors.tech.dark.tertiary,
    },
  },
  {
    source: 'web-development',
    target: 'cloud',
    weight: 3,
    color: {
      light: industryColors.tech.light.secondary,
      dark: industryColors.tech.dark.secondary,
    },
  },
  {
    source: 'data-science',
    target: 'healthcare',
    weight: 2,
    color: {
      light: industryColors.tech.light.primary,
      dark: industryColors.tech.dark.primary,
    },
  },
  {
    source: 'carbon-capture',
    target: 'energy',
    weight: 3,
    color: {
      light: industryColors.emerging.light.secondary,
      dark: industryColors.emerging.dark.secondary,
    },
  },
  {
    source: 'carbon-capture',
    target: 'oil-gas',
    weight: 2,
    color: {
      light: industryColors.emerging.light.secondary,
      dark: industryColors.emerging.dark.secondary,
    },
  },
  {
    source: 'water',
    target: 'agriculture',
    weight: 2,
    color: {
      light: industryColors.infrastructure.light.tertiary,
      dark: industryColors.infrastructure.dark.tertiary,
    },
  },
  {
    source: 'water',
    target: 'healthcare',
    weight: 2,
    color: {
      light: industryColors.infrastructure.light.tertiary,
      dark: industryColors.infrastructure.dark.tertiary,
    },
  },
  {
    source: 'defence',
    target: 'manufacturing',
    weight: 2,
    color: {
      light: industryColors.traditional.light.secondary,
      dark: industryColors.traditional.dark.secondary,
    },
  },
  {
    source: 'defence',
    target: 'software',
    weight: 2,
    color: {
      light: industryColors.traditional.light.secondary,
      dark: industryColors.traditional.dark.secondary,
    },
  },
  {
    source: 'agriculture',
    target: 'manufacturing',
    weight: 2,
    color: {
      light: industryColors.traditional.light.tertiary,
      dark: industryColors.traditional.dark.tertiary,
    },
  },
];
