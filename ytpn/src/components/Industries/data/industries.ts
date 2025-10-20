export interface IndustryEdge {
  source: string;
  target: string;
}

export interface CategorySettings {
  color: {
    light: string;
    dark: string;
  };
  size: number;
}

export interface IndustryNode {
  id: string;
  label: string;
  category: CategorySettings;
}

export const categoryInfo: Record<string, CategorySettings> = {
  industry: {
    size: 10,
    color: {
      light: '#059669', // emerald-600
      dark: '#10b981', // emerald-500
    },
  },
  discipline: {
    size: 9,
    color: {
      light: '#2563eb', // blue-600
      dark: '#3b82f6', // blue-500
    },
  },
  tool: {
    size: 5,
    color: {
      light: '#dc2626', // red-600
      dark: '#ef4444', // red-500
    },
  },
  topic: {
    size: 7,
    color: {
      light: '#ea580c', // orange-600
      dark: '#f97316', // orange-500
    },
  },
  challenge: {
    size: 6,
    color: {
      light: '#7c3aed', // violet-600
      dark: '#8b5cf6', // violet-500
    },
  },
} as const;

export const getCategoryInfo = (category: string) => {
  return (
    categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.industry
  );
};

export const nodes: IndustryNode[] = [
  // Industries
  { id: 'energy', label: 'Energy', category: categoryInfo.industry },
  { id: 'mining', label: 'Mining', category: categoryInfo.industry },
  // {
  //   id: 'manufacturing',
  //   label: 'Manufacturing',
  //   category: categoryInfo.industry,
  // },
  { id: 'logistics', label: 'Logistics', category: categoryInfo.industry },
  { id: 'healthcare', label: 'Healthcare', category: categoryInfo.industry },
  { id: 'water', label: 'Water', category: categoryInfo.industry },
  { id: 'defence', label: 'Defence', category: categoryInfo.industry },
  { id: 'agriculture', label: 'Agriculture', category: categoryInfo.industry },
  { id: 'aviation', label: 'Aviation', category: categoryInfo.industry },
  { id: 'aerospace', label: 'Aerospace', category: categoryInfo.industry },
  {
    id: 'coastal-engineering',
    label: 'Coastal Engineering',
    category: categoryInfo.industry,
  },
  { id: 'oil-and-gas', label: 'Oil and Gas', category: categoryInfo.industry },
  {
    id: 'pharmaceuticals',
    label: 'Pharmaceuticals',
    category: categoryInfo.industry,
  },
  { id: 'automotive', label: 'Automotive', category: categoryInfo.industry },
  { id: 'utilities', label: 'Utilities', category: categoryInfo.industry },
  { id: 'chemicals', label: 'Chemicals', category: categoryInfo.industry },
  { id: 'maritime', label: 'Maritime', category: categoryInfo.industry },
  {
    id: 'food-and-beverage',
    label: 'Food and Beverage',
    category: categoryInfo.industry,
  },
  { id: 'electronics', label: 'Electronics', category: categoryInfo.industry },
  { id: 'renewables', label: 'Renewables', category: categoryInfo.industry },

  // Disciplines
  {
    id: 'chemical-engineering',
    label: 'Chemical Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'mechanical-engineering',
    label: 'Mechanical Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'civil-engineering',
    label: 'Civil Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'electrical-engineering',
    label: 'Electrical Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'process-engineering',
    label: 'Process Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'data-science',
    label: 'Data Science',
    category: categoryInfo.discipline,
  },
  { id: 'chemistry', label: 'Chemistry', category: categoryInfo.discipline },
  {
    id: 'environmental-engineering',
    label: 'Environmental Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'industrial-engineering',
    label: 'Industrial Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'materials-engineering',
    label: 'Materials Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'biomedical-engineering',
    label: 'Biomedical Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'aerospace-engineering',
    label: 'Aerospace Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'nuclear-engineering',
    label: 'Nuclear Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'systems-engineering',
    label: 'Systems Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'robotics-engineering',
    label: 'Robotics Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'geotechnical-engineering',
    label: 'Geotechnical Engineering',
    category: categoryInfo.discipline,
  },
  {
    id: 'petroleum-engineering',
    label: 'Petroleum Engineering',
    category: categoryInfo.discipline,
  },
  { id: 'gis', label: 'GIS', category: categoryInfo.discipline },
  { id: 'statistics', label: 'Statistics', category: categoryInfo.discipline },
  { id: 'geology', label: 'Geology', category: categoryInfo.discipline },
  // Tools
  // { id: 'python', label: 'Python', category: categoryInfo.tool },
  // { id: 'syscad', label: 'SysCAD', category: categoryInfo.tool },
  // { id: 'matlab', label: 'MATLAB', category: categoryInfo.tool },
  // { id: 'autocad', label: 'AutoCAD', category: categoryInfo.tool },
  { id: 'cloud', label: 'Cloud', category: categoryInfo.tool },
  {
    id: 'web-development',
    label: 'Web Development',
    category: categoryInfo.tool,
  },
  // { id: 'ansys', label: 'ANSYS', category: categoryInfo.tool },
  // { id: 'solidworks', label: 'SolidWorks', category: categoryInfo.tool },
  // { id: 'r', label: 'R', category: categoryInfo.tool },
  // { id: 'tensorflow', label: 'TensorFlow', category: categoryInfo.tool },
  // { id: 'aspen-plus', label: 'Aspen Plus', category: categoryInfo.tool },
  // { id: 'excel', label: 'Excel', category: categoryInfo.tool },
  // { id: 'simulink', label: 'Simulink', category: categoryInfo.tool },
  { id: 'kubernetes', label: 'Kubernetes', category: categoryInfo.tool },
  { id: 'docker', label: 'Docker', category: categoryInfo.tool },
  // { id: 'tableau', label: 'Tableau', category: categoryInfo.tool },
  { id: 'power-bi', label: 'Power BI', category: categoryInfo.tool },
  // { id: 'comsol', label: 'COMSOL', category: categoryInfo.tool },
  // { id: 'labview', label: 'LabVIEW', category: categoryInfo.tool },

  // Topics
  {
    id: 'carbon-capture',
    label: 'Carbon Capture',
    category: categoryInfo.topic,
  },
  { id: 'automation', label: 'Automation', category: categoryInfo.topic },
  { id: 'ai', label: 'Artificial Intelligence', category: categoryInfo.topic },
  { id: 'digital-twins', label: 'Digital Twins', category: categoryInfo.topic },
  {
    id: 'renewable-energy',
    label: 'Renewable Energy',
    category: categoryInfo.topic,
  },
  {
    id: 'process-optimization',
    label: 'Process Optimization',
    category: categoryInfo.topic,
  },
  {
    id: 'modelling',
    label: 'Modelling & Simulation',
    category: categoryInfo.topic,
  },
  // { id: 'simulation', label: 'Simulation', category: categoryInfo.topic },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    category: categoryInfo.topic,
  },
  { id: 'iot', label: 'IoT', category: categoryInfo.topic },
  // { id: 'big-data', label: 'Big Data', category: categoryInfo.topic },
  { id: 'cybersecurity', label: 'Cybersecurity', category: categoryInfo.topic },
  { id: 'robotics', label: 'Robotics', category: categoryInfo.topic },
  { id: '3d-printing', label: '3D Printing', category: categoryInfo.topic },
  // { id: 'blockchain', label: 'Blockchain', category: categoryInfo.topic },
  // {
  //   id: 'edge-computing',
  //   label: 'Edge Computing',
  //   category: categoryInfo.topic,
  // },
  // {
  //   id: 'quantum-computing',
  //   label: 'Quantum Computing',
  //   category: categoryInfo.topic,
  // },
  // {
  //   id: 'augmented-reality',
  //   label: 'Augmented Reality',
  //   category: categoryInfo.topic,
  // },
  // {
  //   id: 'virtual-reality',
  //   label: 'Virtual Reality',
  //   category: categoryInfo.topic,
  // },
  {
    id: 'maintenance',
    label: 'Maintenance',
    category: categoryInfo.topic,
  },
  {
    id: 'energy-storage',
    label: 'Energy Storage',
    category: categoryInfo.topic,
  },
  { id: 'biofuels', label: 'Biofuels', category: categoryInfo.topic },
  {
    id: 'nanotechnology',
    label: 'Nanotechnology',
    category: categoryInfo.topic,
  },

  // Challenges
  {
    id: 'sustainability',
    label: 'Sustainability',
    category: categoryInfo.challenge,
  },
  {
    id: 'climate-change',
    label: 'Climate Change',
    category: categoryInfo.challenge,
  },
  {
    id: 'regulatory-compliance',
    label: 'Regulatory Compliance',
    category: categoryInfo.challenge,
  },
  {
    id: 'energy-transition',
    label: 'Energy Transition',
    category: categoryInfo.challenge,
  },
];

export const edges: IndustryEdge[] = [
  // Industry connections
  { source: 'energy', target: 'mining' },
  { source: 'energy', target: 'renewable-energy' },
  { source: 'mining', target: 'logistics' },
  { source: 'logistics', target: 'automotive' },
  { source: 'logistics', target: 'maritime' },
  { source: 'healthcare', target: 'pharmaceuticals' },
  { source: 'water', target: 'coastal-engineering' },
  { source: 'agriculture', target: 'water' },
  { source: 'agriculture', target: 'food-and-beverage' },
  { source: 'aviation', target: 'aerospace' },
  { source: 'defence', target: 'aerospace' },
  { source: 'oil-and-gas', target: 'energy' },
  { source: 'oil-and-gas', target: 'mining' },
  { source: 'pharmaceuticals', target: 'healthcare' },
  { source: 'automotive', target: 'logistics' },
  { source: 'utilities', target: 'energy' },
  { source: 'utilities', target: 'water' },
  { source: 'chemicals', target: 'agriculture' },
  { source: 'chemicals', target: 'pharmaceuticals' },
  { source: 'maritime', target: 'logistics' },
  { source: 'maritime', target: 'coastal-engineering' },
  { source: 'food-and-beverage', target: 'agriculture' },
  { source: 'electronics', target: 'automotive' },
  { source: 'renewables', target: 'energy' },
  { source: 'renewables', target: 'utilities' },

  // Discipline links
  { source: 'process-engineering', target: 'chemical-engineering' },
  { source: 'mechanical-engineering', target: 'automotive' },
  { source: 'mechanical-engineering', target: 'aviation' },
  { source: 'civil-engineering', target: 'coastal-engineering' },
  { source: 'electrical-engineering', target: 'automation' },
  { source: 'chemical-engineering', target: 'chemistry' },
  { source: 'chemical-engineering', target: 'chemicals' },
  { source: 'software-engineering', target: 'web-development' },
  { source: 'software-engineering', target: 'cloud' },
  { source: 'data-science', target: 'ai' },
  { source: 'data-science', target: 'statistics' },
  { source: 'environmental-engineering', target: 'water' },
  { source: 'environmental-engineering', target: 'renewables' },
  { source: 'industrial-engineering', target: 'logistics' },
  { source: 'materials-engineering', target: 'chemicals' },
  { source: 'biomedical-engineering', target: 'healthcare' },
  { source: 'aerospace-engineering', target: 'aerospace' },
  { source: 'nuclear-engineering', target: 'energy' },
  { source: 'systems-engineering', target: 'software-engineering' },
  { source: 'robotics-engineering', target: 'automation' },
  { source: 'geotechnical-engineering', target: 'mining' },
  { source: 'petroleum-engineering', target: 'oil-and-gas' },
  { source: 'gis', target: 'civil-engineering' },
  { source: 'gis', target: 'environmental-engineering' },
  { source: 'statistics', target: 'data-science' },
  { source: 'geology', target: 'mining' },
  { source: 'geology', target: 'oil-and-gas' },

  // Tools integration
  { source: 'cloud', target: 'software-engineering' },
  { source: 'cloud', target: 'data-science' },
  { source: 'web-development', target: 'software-engineering' },
  { source: 'kubernetes', target: 'cloud' },
  { source: 'docker', target: 'cloud' },
  { source: 'power-bi', target: 'data-science' },
  { source: 'power-bi', target: 'statistics' },

  // Topics connections
  { source: 'carbon-capture', target: 'energy' },
  { source: 'carbon-capture', target: 'climate-change' },
  { source: 'automation', target: 'electrical-engineering' },
  { source: 'automation', target: 'robotics-engineering' },
  { source: 'ai', target: 'data-science' },
  { source: 'ai', target: 'machine-learning' },
  { source: 'digital-twins', target: 'modelling' },
  { source: 'digital-twins', target: 'automation' },
  { source: 'renewable-energy', target: 'energy' },
  { source: 'renewable-energy', target: 'sustainability' },
  { source: 'process-optimization', target: 'industrial-engineering' },
  { source: 'process-optimization', target: 'automation' },
  { source: 'modelling', target: 'data-science' },
  { source: 'modelling', target: 'process-engineering' },
  { source: 'machine-learning', target: 'ai' },
  { source: 'iot', target: 'automation' },
  { source: 'iot', target: 'cloud' },
  { source: 'cybersecurity', target: 'software-engineering' },
  { source: 'robotics', target: 'robotics-engineering' },
  { source: 'robotics', target: 'automation' },
  { source: '3d-printing', target: 'materials-engineering' },
  { source: '3d-printing', target: 'automotive' },
  { source: 'maintenance', target: 'industrial-engineering' },
  { source: 'maintenance', target: 'automation' },
  { source: 'energy-storage', target: 'renewable-energy' },
  { source: 'energy-storage', target: 'utilities' },
  { source: 'biofuels', target: 'renewable-energy' },
  { source: 'biofuels', target: 'agriculture' },
  { source: 'nanotechnology', target: 'materials-engineering' },
  { source: 'nanotechnology', target: 'electronics' },

  // Challenges connections
  { source: 'sustainability', target: 'renewables' },
  { source: 'sustainability', target: 'environmental-engineering' },
  { source: 'climate-change', target: 'agriculture' },
  { source: 'climate-change', target: 'water' },
  { source: 'regulatory-compliance', target: 'pharmaceuticals' },
  { source: 'regulatory-compliance', target: 'defence' },
  { source: 'energy-transition', target: 'renewables' },
  { source: 'energy-transition', target: 'energy' },
];
