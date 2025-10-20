'use client';
/**
 * Functional Requirements:
 * - Industries-specific network graph visualization
 * - Uses BaseGraph component for core functionality
 * - Light and Dark mode support using theme system
 * - Drag and drop functionality for nodes with fixed lock mode
 * - Force layout algorithm only
 * - Responsive design with proper theming
 * - Client-side rendering to prevent SSR issues
 *
 */
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getIndustryGraph } from './data/getIndustriesGraph';

// Import types only (these don't cause SSR issues)
import type { ForceLayoutConfig } from './BaseGraph';

// Dynamically import BaseGraph to prevent SSR issues
const BaseGraph = dynamic(() => import('./BaseGraph'), {
  ssr: false,
  loading: () => (
    <div className='h-full w-full min-h-[600px] relative flex items-center justify-center bg-background'>
      <div className='text-foreground'>Loading graph...</div>
    </div>
  ),
});

interface IndustriesGraphProps {
  minHeight?: string;
}

const IndustriesGraph: React.FC<IndustriesGraphProps> = ({
  minHeight = '500px',
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [isMounted, setIsMounted] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force layout configuration - optimized for industry networks
  const forceConfig: ForceLayoutConfig = {
    attraction: 0.0005,
    repulsion: 0.1,
    gravity: 0.0001,
    inertia: 0.6,
    maxMove: 200,
    scalingRatio: 1.5,
    nodeScaling: true, // Scale force by node size
    nodeProperty: 'size', // Property to use for scaling
  };

  // Generate graph data - memoized to prevent recreation on every render
  const graphData = useMemo(() => {
    return getIndustryGraph(isDark, 800, 600);
  }, [isDark]); // Only recreate when theme changes

  // Don't render anything until mounted on client side
  if (!isMounted) {
    return (
      <div
        className='h-full w-full relative flex items-center justify-center bg-background'
        style={{ minHeight }}
      >
        <div className='text-foreground'>Loading industries graph...</div>
      </div>
    );
  }

  return (
    <BaseGraph
      graphData={graphData}
      layout='force'
      isLayoutRunning={true}
      dragMode={true}
      draggedNode={draggedNode}
      setDraggedNode={setDraggedNode}
      dragLockMode='fixed'
      forceConfig={forceConfig}
      minHeight={minHeight}
    />
  );
};

export { IndustriesGraph };
export default IndustriesGraph;
