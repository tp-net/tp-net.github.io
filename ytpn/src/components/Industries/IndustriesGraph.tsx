'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  SigmaContainer,
  useLoadGraph,
  useSetSettings,
  useRegisterEvents,
  useSigma,
} from '@react-sigma/core';
import { useWorkerLayoutForce } from '@react-sigma/layout-force';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useWorkerLayoutNoverlap } from '@react-sigma/layout-noverlap';
import './sigma.css';
import { DragLayoutControls } from './config';
import { getIndustryGraph } from './data/getIndustries';

const IndustriesGraphCore: React.FC<{
  layout: string;
  isLayoutRunning: boolean;
  dragMode: boolean;
  draggedNode: string | null;
  setDraggedNode: (node: string | null) => void;
  dragLockMode: 'none' | 'fixed' | 'pinned';
  forceConfig: any;
  forceAtlas2Config: any;
  noverlapConfig: any;
  isDark: boolean;
}> = ({
  layout,
  isLayoutRunning,
  dragMode,
  draggedNode,
  setDraggedNode,
  dragLockMode,
  forceConfig,
  forceAtlas2Config,
  noverlapConfig,
  isDark,
}) => {
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();

  // Layout workers
  const forceLayout = useWorkerLayoutForce();
  const forceAtlas2Layout = useWorkerLayoutForceAtlas2();
  const noverlapLayout = useWorkerLayoutNoverlap();

  // Apply configuration changes without restarting layout
  const applyConfigurationChanges = () => {
    if (!sigma) return;

    const graph = sigma.getGraph();

    // Apply node scaling if enabled - only update visual properties, not layout
    if (
      forceConfig.nodeScaling ||
      forceAtlas2Config.nodeScaling ||
      noverlapConfig.nodeScaling
    ) {
      graph.forEachNode(nodeId => {
        const node = graph.getNodeAttributes(nodeId);
        if (node.scaleFactor) {
          // Apply scaling to node properties that affect layout behavior
          if (forceConfig.nodeScaling && layout === 'force') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 + (forceConfig.scalingRatio - 1) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
          if (forceAtlas2Config.nodeScaling && layout === 'forceatlas2') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 + (forceAtlas2Config.scalingRatio - 1) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
          if (noverlapConfig.nodeScaling && layout === 'noverlap') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 + (noverlapConfig.margin / 10) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
        }
      });
    }

    // Note: We don't restart the layout here to prevent jitter
    // Layout parameters are applied directly to the running layout workers
  };

  useEffect(() => {
    const graph = getIndustryGraph(isDark, 800, 600);

    loadGraph(graph);

    setSettings({
      allowInvalidContainer: true,
      renderLabels: true,
      labelSize: 12,
      defaultNodeColor: isDark ? '#3b82f6' : '#2563eb',
      defaultEdgeColor: isDark ? '#6b7280' : '#9ca3af',
      nodeReducer: (_, attrs) => ({
        ...attrs,
        size: attrs.highlighted ? attrs.size * 1.3 : attrs.size,
        borderColor: attrs.highlighted
          ? isDark
            ? '#ffffff'
            : '#000000'
          : attrs.pinned
            ? '#ef4444'
            : attrs.fixed
              ? '#f59e0b'
              : undefined,
        borderSize: attrs.highlighted ? 3 : attrs.pinned || attrs.fixed ? 2 : 0,
      }),
      edgeReducer: (_, attrs) => ({
        ...attrs,
        size: attrs.weight || 1,
      }),
    });

    // Auto-fit the graph after a short delay to ensure proper positioning
    setTimeout(() => {
      if (sigma) {
        sigma.getCamera().animatedReset({ duration: 1000 });
      }
    }, 1000);
  }, [loadGraph, setSettings, sigma, isDark]);

  // Handle layout workers
  useEffect(() => {
    if (!isLayoutRunning) {
      forceLayout.stop();
      forceAtlas2Layout.stop();
      noverlapLayout.stop();
      return;
    }

    switch (layout) {
      case 'force':
        forceLayout.start();
        break;
      case 'forceatlas2':
        forceAtlas2Layout.start();
        break;
      case 'noverlap':
        noverlapLayout.start();
        break;
    }

    return () => {
      forceLayout.stop();
      forceAtlas2Layout.stop();
      noverlapLayout.stop();
    };
  }, [layout, isLayoutRunning, forceLayout, forceAtlas2Layout, noverlapLayout]);

  // Handle configuration changes - apply without restarting layout
  useEffect(() => {
    applyConfigurationChanges();
  }, [
    forceConfig.nodeScaling,
    forceConfig.scalingRatio,
    forceAtlas2Config.nodeScaling,
    forceAtlas2Config.scalingRatio,
    noverlapConfig.nodeScaling,
    noverlapConfig.margin,
    layout,
  ]);

  // Handle drag events
  useEffect(() => {
    if (!dragMode) {
      registerEvents({});
      return;
    }

    registerEvents({
      downNode: e => {
        setDraggedNode(e.node);
        const graph = sigma.getGraph();
        graph.setNodeAttribute(e.node, 'highlighted', true);

        // Apply drag lock mode
        if (dragLockMode === 'fixed') {
          graph.setNodeAttribute(e.node, 'fixed', true);
        } else if (dragLockMode === 'pinned') {
          graph.setNodeAttribute(e.node, 'pinned', true);
        }

        document.body.style.cursor = 'grabbing';
      },

      mousemovebody: e => {
        if (!draggedNode) return;

        const pos = sigma.viewportToGraph(e);
        const graph = sigma.getGraph();
        graph.setNodeAttribute(draggedNode, 'x', pos.x);
        graph.setNodeAttribute(draggedNode, 'y', pos.y);

        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },

      mouseup: () => {
        if (draggedNode) {
          const graph = sigma.getGraph();
          graph.setNodeAttribute(draggedNode, 'highlighted', false);

          // Handle drag lock mode release
          if (dragLockMode === 'fixed') {
            // Release fixed lock after drag
            graph.setNodeAttribute(draggedNode, 'fixed', false);
          }
          // For pinned mode, keep the pinned state

          setDraggedNode(null);
          document.body.style.cursor = 'default';
        }
      },

      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },

      enterNode: () => {
        if (!draggedNode) {
          document.body.style.cursor = 'grab';
        }
      },

      leaveNode: () => {
        if (!draggedNode) {
          document.body.style.cursor = 'default';
        }
      },

      // Double-click to toggle pinned state
      doubleClickNode: e => {
        const graph = sigma.getGraph();
        const isPinned = graph.getNodeAttribute(e.node, 'pinned') || false;
        graph.setNodeAttribute(e.node, 'pinned', !isPinned);
      },
    });

    return () => {
      document.body.style.cursor = 'default';
    };
  }, [
    registerEvents,
    sigma,
    draggedNode,
    dragMode,
    dragLockMode,
    setDraggedNode,
  ]);

  return null;
};

const IndustriesGraph: React.FC<{ isDark?: boolean }> = ({
  isDark = false,
}) => {
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
  const [forceConfig, setForceConfig] = useState({
    attraction: 0.0005,
    repulsion: 0.1,
    gravity: 0.0001,
    inertia: 0.6,
    maxMove: 200,
    scalingRatio: 1.5,
    nodeScaling: true, // Scale force by node size
    nodeProperty: 'size', // Property to use for scaling
  });

  const [forceAtlas2Config, setForceAtlas2Config] = useState({
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

  const [noverlapConfig, setNoverlapConfig] = useState({
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

  // Don't render anything until mounted on client side
  if (!isMounted) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          minHeight: '600px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        }}
      >
        <div style={{ color: isDark ? '#ffffff' : '#000000' }}>
          Loading industries graph...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        minHeight: '600px',
        position: 'relative',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
      }}
    >
      <SigmaContainer
        style={{ height: '100%', width: '100%' }}
        settings={{ allowInvalidContainer: true }}
      >
        <IndustriesGraphCore
          layout={layout}
          isLayoutRunning={isLayoutRunning}
          dragMode={dragMode}
          draggedNode={draggedNode}
          setDraggedNode={setDraggedNode}
          dragLockMode={dragLockMode}
          forceConfig={forceConfig}
          forceAtlas2Config={forceAtlas2Config}
          noverlapConfig={noverlapConfig}
          isDark={isDark}
        />
      </SigmaContainer>
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
    </div>
  );
};

// Export with dynamic import to prevent SSR
const DynamicIndustriesGraph = dynamic(() => Promise.resolve(IndustriesGraph), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100%',
        width: '100%',
        minHeight: '600px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>Loading industries graph...</div>
    </div>
  ),
});

export { IndustriesGraph };
export default DynamicIndustriesGraph;
