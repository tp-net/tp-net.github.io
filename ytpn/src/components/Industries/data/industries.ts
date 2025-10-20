export interface IndustryEdge {
  source: string;
  target: string;
  color?: {
    light: string;
    dark: string;
  };
}

export interface IndustryNode {
  id: string;
  label: string;
  size: number;
  color: {
    light: string;
    dark: string;
  };
  category: string; // Keep category as a string identifier for grouping
}

// Category definitions for reference (no longer used for styling)
export const categoryInfo = {
  industry: { name: 'Industry', description: 'Traditional industrial sectors' },
  infrastructure: {
    name: 'Infrastructure',
    description: 'Critical infrastructure sectors',
  },
  tech: { name: 'Technology', description: 'Technology and software sectors' },
  emerging: {
    name: 'Emerging',
    description: 'Emerging and innovative sectors',
  },
} as const;

// Helper function to get category information
export const getCategoryInfo = (category: string) => {
  return (
    categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.industry
  );
};

export const nodes: IndustryNode[] = [
  {
    id: 'energy',
    label: 'Energy',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
  {
    id: 'mining',
    label: 'Mining',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
  {
    id: 'construction',
    label: 'Construction',
    size: 10,
    color: {
      light: '#2563eb', // blue-600
      dark: '#3b82f6', // blue-500
    },
    category: 'infrastructure',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    size: 10,
    color: {
      light: '#2563eb', // blue-600
      dark: '#3b82f6', // blue-500
    },
    category: 'infrastructure',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    size: 6,
    color: {
      light: '#7c3aed', // violet-600
      dark: '#8b5cf6', // violet-500
    },
    category: 'emerging',
  },
  {
    id: 'water',
    label: 'Water',
    size: 10,
    color: {
      light: '#2563eb', // blue-600
      dark: '#3b82f6', // blue-500
    },
    category: 'infrastructure',
  },
  {
    id: 'defence',
    label: 'Defence',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
  {
    id: 'software',
    label: 'Software',
    size: 8,
    color: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
    category: 'tech',
  },
  {
    id: 'web-development',
    label: 'Web Development',
    size: 8,
    color: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
    category: 'tech',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    size: 8,
    color: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
    category: 'tech',
  },
  {
    id: 'data-science',
    label: 'Data Science',
    size: 8,
    color: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
    category: 'tech',
  },
  {
    id: 'carbon-capture',
    label: 'Carbon Capture',
    size: 6,
    color: {
      light: '#7c3aed', // violet-600
      dark: '#8b5cf6', // violet-500
    },
    category: 'emerging',
  },
  {
    id: 'oil-gas',
    label: 'Oil and Gas',
    size: 12,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
    category: 'industry',
  },
];

export const edges: IndustryEdge[] = [
  {
    source: 'energy',
    target: 'mining',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'energy',
    target: 'oil-gas',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'energy',
    target: 'manufacturing',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'mining',
    target: 'manufacturing',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'manufacturing',
    target: 'construction',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'construction',
    target: 'transportation',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'transportation',
    target: 'energy',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'software',
    target: 'web-development',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'software',
    target: 'cloud',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'software',
    target: 'data-science',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'cloud',
    target: 'data-science',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'web-development',
    target: 'cloud',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'data-science',
    target: 'healthcare',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'carbon-capture',
    target: 'energy',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'carbon-capture',
    target: 'oil-gas',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'water',
    target: 'agriculture',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'water',
    target: 'healthcare',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'defence',
    target: 'manufacturing',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'defence',
    target: 'software',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
  {
    source: 'agriculture',
    target: 'manufacturing',
    color: {
      light: '#6b7280', // gray-500
      dark: '#9ca3af', // gray-400
    },
  },
];
