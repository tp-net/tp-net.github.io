'use client';
/**
 * Functional Requirements:
 * - Industries-specific network graph visualization
 * - Uses BaseGraph component for core functionality
 * - Provides industry-specific configuration and controls
 * - Light and Dark mode support using theme system
 * - Drag and drop functionality for nodes
 * - Multiple layout algorithms (force, forceatlas2, noverlap)
 * - Real-time configuration controls
 * - Responsive design with proper theming
 * - Client-side rendering to prevent SSR issues
 *
 */
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/components/providers/ThemeProvider';
import { DragLayoutControls } from './config';
import { getIndustryGraph } from './data/getIndustriesGraph';

// Import types only (these don't cause SSR issues)
import type {
  ForceLayoutConfig,
  ForceAtlas2LayoutConfig,
  NoverlapLayoutConfig,
} from './BaseGraph';

// Dynamically import BaseGraph to prevent SSR issues
const BaseGraph = dynamic(() => import('./BaseGraph'), {
  ssr: false,
  loading: () => (
    <div className='h-full w-full min-h-[600px] relative flex items-center justify-center bg-background'>
      <div className='text-foreground'>Loading graph...</div>
    </div>
  ),
});

const IndustriesGraph: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isMounted, setIsMounted] = useState(false);
  const [layout, setLayout] = useState('force');
  const [isLayoutRunning, setIsLayoutRunning] = useState(true);
  const [dragMode, setDragMode] = useState(true);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragLockMode, setDragLockMode] = useState<'none' | 'fixed' | 'pinned'>(
    'fixed'
  );

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Layout configuration states - optimized for industry networks
  const [forceConfig, setForceConfig] = useState<ForceLayoutConfig>({
    attraction: 0.0005,
    repulsion: 0.1,
    gravity: 0.0001,
    inertia: 0.6,
    maxMove: 200,
    scalingRatio: 1.5,
    nodeScaling: true, // Scale force by node size
    nodeProperty: 'size', // Property to use for scaling
  });

  const [forceAtlas2Config, setForceAtlas2Config] =
    useState<ForceAtlas2LayoutConfig>({
      linLogMode: false,
      outboundAttractionDistribution: false,
      adjustSizes: true,
      edgeWeightInfluence: 1.5,
      scalingRatio: 1.2,
      strongGravityMode: false,
      gravity: 0.5,
      slowDown: 2,
      barnesHutOptimize: false,
      barnesHutTheta: 0.5,
      nodeScaling: true, // Scale gravity by node size
      nodeProperty: 'size', // Property to use for scaling
    });

  const [noverlapConfig, setNoverlapConfig] = useState<NoverlapLayoutConfig>({
    margin: 8,
    expansion: 1.2,
    gridSize: 20,
    speed: 3,
    maxIterations: 500,
    nodeScaling: true, // Scale margin by node size
    nodeProperty: 'size', // Property to use for scaling
  });

  const handleToggleLayout = () => {
    setIsLayoutRunning(!isLayoutRunning);
  };

  const handleToggleDragMode = () => {
    setDragMode(!dragMode);
    if (draggedNode) {
      setDraggedNode(null);
    }
  };

  // Generate graph data - memoized to prevent recreation on every render
  const graphData = useMemo(() => {
    return getIndustryGraph(isDark, 800, 600);
  }, [isDark]); // Only recreate when theme changes

  // Memoize controls component to prevent unnecessary re-renders
  // MUST be before any conditional returns to follow Rules of Hooks
  const controlsComponent = useMemo(
    () => (
      <DragLayoutControls
        layout={layout}
        onLayoutChange={setLayout}
        isLayoutRunning={isLayoutRunning}
        onToggleLayout={handleToggleLayout}
        dragMode={dragMode}
        onToggleDragMode={handleToggleDragMode}
        draggedNode={draggedNode}
        dragLockMode={dragLockMode}
        onDragLockModeChange={setDragLockMode}
        forceConfig={forceConfig}
        onForceConfigChange={setForceConfig}
        forceAtlas2Config={forceAtlas2Config}
        onForceAtlas2ConfigChange={setForceAtlas2Config}
        noverlapConfig={noverlapConfig}
        onNoverlapConfigChange={setNoverlapConfig}
      />
    ),
    [
      layout,
      isLayoutRunning,
      dragMode,
      draggedNode,
      dragLockMode,
      forceConfig,
      forceAtlas2Config,
      noverlapConfig,
    ]
  );

  // Don't render anything until mounted on client side
  if (!isMounted) {
    return (
      <div className='h-full w-full min-h-[600px] relative flex items-center justify-center bg-background'>
        <div className='text-foreground'>Loading industries graph...</div>
      </div>
    );
  }

  return (
    <BaseGraph
      graphData={graphData}
      layout={layout}
      isLayoutRunning={isLayoutRunning}
      dragMode={dragMode}
      draggedNode={draggedNode}
      setDraggedNode={setDraggedNode}
      dragLockMode={dragLockMode}
      forceConfig={forceConfig}
      forceAtlas2Config={forceAtlas2Config}
      noverlapConfig={noverlapConfig}
      controlsComponent={controlsComponent}
    />
  );
};

export { IndustriesGraph };
export default IndustriesGraph;
