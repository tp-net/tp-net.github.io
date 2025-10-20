import Graph from 'graphology';

export interface NodeData {
  id: string;
  label: string;
  color: string;
  size: number;
  nodeType: string;
  x: number;
  y: number;
}

export interface GraphConfig {
  nodeCount: number;
  majorHubCount: number;
  secondaryHubCount: number;
  connectorCount: number;
  leafCount: number;
  randomConnections: number;
}

export const defaultGraphConfig: GraphConfig = {
  nodeCount: 20,
  majorHubCount: 3,
  secondaryHubCount: 5,
  connectorCount: 10,
  leafCount: 30,
  randomConnections: 150,
};

export function createRandomGraph(
  config: GraphConfig = defaultGraphConfig
): Graph {
  const graph = new Graph();
  const {
    nodeCount,
    majorHubCount,
    secondaryHubCount,
    connectorCount,
    leafCount,
    randomConnections,
  } = config;

  // Generate nodes with different types and sizes
  const nodes: NodeData[] = [];

  for (let i = 0; i < nodeCount; i++) {
    let nodeType: string, color: string, size: number, label: string;

    if (i < majorHubCount) {
      // Major hubs
      nodeType = 'major-hub';
      color = '#e74c3c';
      size = 28;
      label = `Hub ${i + 1}`;
    } else if (i < majorHubCount + secondaryHubCount) {
      // Secondary hubs
      nodeType = 'secondary-hub';
      color = '#3498db';
      size = 22;
      label = `Sec ${i - majorHubCount + 1}`;
    } else if (i < majorHubCount + secondaryHubCount + connectorCount) {
      // Connector nodes
      nodeType = 'connector';
      color = '#2ecc71';
      size = 18;
      label = `Conn ${i - majorHubCount - secondaryHubCount + 1}`;
    } else {
      // Leaf nodes
      nodeType = 'leaf';
      color = '#9b59b6';
      size = 14;
      label = `Leaf ${i - majorHubCount - secondaryHubCount - connectorCount + 1}`;
    }

    nodes.push({
      id: `node-${i}`,
      label,
      color,
      size,
      nodeType,
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }

  // Add all nodes to the graph
  nodes.forEach(node => {
    graph.addNode(node.id, {
      label: node.label,
      size: node.size,
      color: node.color,
      x: node.x,
      y: node.y,
      highlighted: false,
      fixed: false,
      pinned: false,
      // Add properties for node scaling
      baseSize: node.size,
      scaleFactor: Math.max(0.5, Math.min(3, node.size / 15)), // Normalize size for scaling
    });
  });

  // Create connections based on node types
  let edgeCount = 0;

  // Major hubs connect to many nodes (8-15 connections each)
  for (let i = 0; i < majorHubCount; i++) {
    const hubNode = `node-${i}`;
    const connections = Math.floor(Math.random() * 8) + 8;

    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i && !graph.hasEdge(hubNode, `node-${target}`)) {
        graph.addEdge(hubNode, `node-${target}`, {
          color: '#e74c3c',
          size: 3,
        });
        edgeCount++;
      }
    }
  }

  // Secondary hubs connect to 5-10 nodes each
  for (let i = majorHubCount; i < majorHubCount + secondaryHubCount; i++) {
    const secHubNode = `node-${i}`;
    const connections = Math.floor(Math.random() * 6) + 5;

    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i && !graph.hasEdge(secHubNode, `node-${target}`)) {
        graph.addEdge(secHubNode, `node-${target}`, {
          color: '#3498db',
          size: 2.5,
        });
        edgeCount++;
      }
    }
  }

  // Connector nodes bridge between different areas (3-6 connections each)
  for (
    let i = majorHubCount + secondaryHubCount;
    i < majorHubCount + secondaryHubCount + connectorCount;
    i++
  ) {
    const connectorNode = `node-${i}`;
    const connections = Math.floor(Math.random() * 4) + 3;

    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i && !graph.hasEdge(connectorNode, `node-${target}`)) {
        graph.addEdge(connectorNode, `node-${target}`, {
          color: '#2ecc71',
          size: 2,
        });
        edgeCount++;
      }
    }
  }

  // Leaf nodes connect to 1-3 other nodes
  for (
    let i = majorHubCount + secondaryHubCount + connectorCount;
    i < nodeCount;
    i++
  ) {
    const leafNode = `node-${i}`;
    const connections = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i && !graph.hasEdge(leafNode, `node-${target}`)) {
        graph.addEdge(leafNode, `node-${target}`, {
          color: '#9b59b6',
          size: 1.5,
        });
        edgeCount++;
      }
    }
  }

  // Add some random cross-connections to increase density and create cycles
  for (let i = 0; i < randomConnections; i++) {
    const source = Math.floor(Math.random() * nodeCount);
    const target = Math.floor(Math.random() * nodeCount);
    if (
      source !== target &&
      !graph.hasEdge(`node-${source}`, `node-${target}`)
    ) {
      graph.addEdge(`node-${source}`, `node-${target}`, {
        color: '#95a5a6',
        size: Math.random() * 1.5 + 0.5,
      });
      edgeCount++;
    }
  }

  console.log(`Created graph with ${nodeCount} nodes and ${edgeCount} edges`);

  return graph;
}
