import Graph from 'graphology';
import {
  nodes as industryNodes,
  edges as industryEdges,
  IndustryNode,
  IndustryEdge,
} from './industries';
import { palette } from '@/styles/palette';

export interface IndustryGraphConfig {
  width: number;
  height: number;
  isDark: boolean;
}

export const defaultIndustryGraphConfig: IndustryGraphConfig = {
  width: 800,
  height: 600,
  isDark: false,
};

export function createIndustryGraph(
  config: IndustryGraphConfig = defaultIndustryGraphConfig
): Graph {
  const graph = new Graph();
  const { width, height, isDark } = config;
  // Add all industry nodes to the graph
  industryNodes.forEach((node: IndustryNode) => {
    // Generate random positions within the canvas bounds
    const x = Math.random() * (width - 100) + 50; // Leave some margin
    const y = Math.random() * (height - 100) + 50;

    graph.addNode(node.id, {
      label: node.label,
      size: node.category.size,
      color: isDark ? node.category.color.dark : node.category.color.light,
      labelColor: {
        attribute: isDark ? palette.dark.foreground : palette.light.foreground,
      },
      x,
      y,
      highlighted: false,
      fixed: false,
      pinned: false,
      category: node.category,
      // Add properties for node scaling
      baseSize: node.category.size,
      scaleFactor: Math.max(0.5, Math.min(3, node.category.size / 15)), // Normalize size for scaling
    });
  });

  // Add all industry edges to the graph
  industryEdges.forEach((edge: IndustryEdge) => {
    // Only add edge if both source and target nodes exist
    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
      graph.addEdge(edge.source, edge.target, {
        color: isDark ? palette.dark.foreground : palette.light.foreground,
        size: 2, // Default edge size
        weight: 1, // Default edge weight
      });
    }
  });

  console.log(
    `Created industry graph with ${graph.order} nodes and ${graph.size} edges`
  );

  return graph;
}

// Helper function to get a specific industry graph with custom configuration
export function getIndustryGraph(
  isDark: boolean = false,
  width: number = 800,
  height: number = 600
): Graph {
  return createIndustryGraph({
    width,
    height,
    isDark,
  });
}
