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

// Theme-aware color palette - flipped structure: industry.level.mode
export const industryColors = {
  traditional: {
    primary: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    secondary: {
      light: '#10b981', // emerald-500
      dark: '#34d399', // emerald-400
    },
    tertiary: {
      light: '#34d399', // emerald-400
      dark: '#6ee7b7', // emerald-300
    },
  },
  tech: {
    primary: {
      light: '#2563eb', // blue-600
      dark: '#3b82f6', // blue-500
    },
    secondary: {
      light: '#3b82f6', // blue-500
      dark: '#60a5fa', // blue-400
    },
    tertiary: {
      light: '#60a5fa', // blue-400
      dark: '#93c5fd', // blue-300
    },
  },
  emerging: {
    primary: {
      light: '#7c3aed', // violet-600
      dark: '#8b5cf6', // violet-500
    },
    secondary: {
      light: '#8b5cf6', // violet-500
      dark: '#a78bfa', // violet-400
    },
    tertiary: {
      light: '#a78bfa', // violet-400
      dark: '#c4b5fd', // violet-300
    },
  },
  infrastructure: {
    primary: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
    secondary: {
      light: '#ef4444', // red-500
      dark: '#f87171', // red-400
    },
    tertiary: {
      light: '#f87171', // red-400
      dark: '#fca5a5', // red-300
    },
  },
} as const;

// Helper function to get theme-appropriate color using category lookup
export const getThemeColor = (
  category: keyof typeof industryColors,
  variant: 'primary' | 'secondary' | 'tertiary',
  isDark: boolean
): string => {
  return industryColors[category][variant][isDark ? 'dark' : 'light'];
};

// Helper function to get color object for a category and variant
export const getCategoryColor = (
  category: keyof typeof industryColors,
  variant: 'primary' | 'secondary' | 'tertiary'
): { light: string; dark: string } => {
  return industryColors[category][variant];
};

export const nodes: IndustryNode[] = [
  {
    id: 'energy',
    label: 'Energy',
    size: 20,
    color: getCategoryColor('traditional', 'primary'),
    category: 'traditional',
  },
  {
    id: 'mining',
    label: 'Mining',
    size: 18,
    color: getCategoryColor('traditional', 'secondary'),
    category: 'traditional',
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    size: 22,
    color: getCategoryColor('traditional', 'tertiary'),
    category: 'traditional',
  },
  {
    id: 'construction',
    label: 'Construction',
    size: 16,
    color: getCategoryColor('infrastructure', 'primary'),
    category: 'infrastructure',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    size: 19,
    color: getCategoryColor('infrastructure', 'secondary'),
    category: 'infrastructure',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    size: 21,
    color: getCategoryColor('emerging', 'primary'),
    category: 'emerging',
  },
  {
    id: 'water',
    label: 'Water',
    size: 15,
    color: getCategoryColor('infrastructure', 'tertiary'),
    category: 'infrastructure',
  },
  {
    id: 'defence',
    label: 'Defence',
    size: 17,
    color: getCategoryColor('traditional', 'secondary'),
    category: 'traditional',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    size: 18,
    color: getCategoryColor('traditional', 'tertiary'),
    category: 'traditional',
  },
  {
    id: 'software',
    label: 'Software',
    size: 24,
    color: getCategoryColor('tech', 'primary'),
    category: 'tech',
  },
  {
    id: 'web-development',
    label: 'Web Development',
    size: 20,
    color: getCategoryColor('tech', 'secondary'),
    category: 'tech',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    size: 23,
    color: getCategoryColor('tech', 'tertiary'),
    category: 'tech',
  },
  {
    id: 'data-science',
    label: 'Data Science',
    size: 21,
    color: getCategoryColor('tech', 'primary'),
    category: 'tech',
  },
  {
    id: 'carbon-capture',
    label: 'Carbon Capture',
    size: 19,
    color: getCategoryColor('emerging', 'secondary'),
    category: 'emerging',
  },
  {
    id: 'oil-gas',
    label: 'Oil and Gas',
    size: 20,
    color: getCategoryColor('traditional', 'primary'),
    category: 'traditional',
  },
];

export const edges: IndustryEdge[] = [
  {
    source: 'energy',
    target: 'mining',
    weight: 3,
    color: getCategoryColor('traditional', 'primary'),
  },
  {
    source: 'energy',
    target: 'oil-gas',
    weight: 4,
    color: getCategoryColor('traditional', 'primary'),
  },
  {
    source: 'energy',
    target: 'manufacturing',
    weight: 3,
    color: getCategoryColor('traditional', 'primary'),
  },
  {
    source: 'mining',
    target: 'manufacturing',
    weight: 2,
    color: getCategoryColor('traditional', 'secondary'),
  },
  {
    source: 'manufacturing',
    target: 'construction',
    weight: 2,
    color: getCategoryColor('traditional', 'tertiary'),
  },
  {
    source: 'construction',
    target: 'transportation',
    weight: 2,
    color: getCategoryColor('infrastructure', 'primary'),
  },
  {
    source: 'transportation',
    target: 'energy',
    weight: 2,
    color: getCategoryColor('infrastructure', 'secondary'),
  },
  {
    source: 'software',
    target: 'web-development',
    weight: 4,
    color: getCategoryColor('tech', 'primary'),
  },
  {
    source: 'software',
    target: 'cloud',
    weight: 4,
    color: getCategoryColor('tech', 'primary'),
  },
  {
    source: 'software',
    target: 'data-science',
    weight: 3,
    color: getCategoryColor('tech', 'primary'),
  },
  {
    source: 'cloud',
    target: 'data-science',
    weight: 3,
    color: getCategoryColor('tech', 'tertiary'),
  },
  {
    source: 'web-development',
    target: 'cloud',
    weight: 3,
    color: getCategoryColor('tech', 'secondary'),
  },
  {
    source: 'data-science',
    target: 'healthcare',
    weight: 2,
    color: getCategoryColor('tech', 'primary'),
  },
  {
    source: 'carbon-capture',
    target: 'energy',
    weight: 3,
    color: getCategoryColor('emerging', 'secondary'),
  },
  {
    source: 'carbon-capture',
    target: 'oil-gas',
    weight: 2,
    color: getCategoryColor('emerging', 'secondary'),
  },
  {
    source: 'water',
    target: 'agriculture',
    weight: 2,
    color: getCategoryColor('infrastructure', 'tertiary'),
  },
  {
    source: 'water',
    target: 'healthcare',
    weight: 2,
    color: getCategoryColor('infrastructure', 'tertiary'),
  },
  {
    source: 'defence',
    target: 'manufacturing',
    weight: 2,
    color: getCategoryColor('traditional', 'secondary'),
  },
  {
    source: 'defence',
    target: 'software',
    weight: 2,
    color: getCategoryColor('traditional', 'secondary'),
  },
  {
    source: 'agriculture',
    target: 'manufacturing',
    weight: 2,
    color: getCategoryColor('traditional', 'tertiary'),
  },
];
