'use client';
/**
 * Functional Requirements:
 * - Generic network graph visualization component
 * - Light and Dark mode support using theme system
 * - Drag and drop functionality for nodes with fixed lock mode
 * - Force layout algorithm with configurable parameters
 * - Responsive design with proper theming
 * - Client-side rendering to prevent SSR issues
 * - Configurable graph data source
 * - Customizable styling and behavior
 * - Touch and pointer interaction support for drag, move, and release
 *
 */
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
import { useTheme } from '@/components/providers/ThemeProvider';
import { palette } from '@/styles/palette';
import './sigma.css';

// Type definitions for configuration
export interface ForceLayoutConfig {
  attraction: number;
  repulsion: number;
  gravity: number;
  inertia: number;
  maxMove: number;
  scalingRatio: number;
  nodeScaling: boolean;
  nodeProperty: string;
}

export interface ForceAtlas2LayoutConfig {
  linLogMode: boolean;
  outboundAttractionDistribution: boolean;
  adjustSizes: boolean;
  edgeWeightInfluence: number;
  scalingRatio: number;
  strongGravityMode: boolean;
  gravity: number;
  slowDown: number;
  barnesHutOptimize: boolean;
  barnesHutTheta: number;
  nodeScaling: boolean;
  nodeProperty: string;
}

export interface NoverlapLayoutConfig {
  margin: number;
  expansion: number;
  gridSize: number;
  speed: number;
  maxIterations: number;
  nodeScaling: boolean;
  nodeProperty: string;
}

export interface BaseGraphProps {
  graphData: any; // Graph data from getIndustryGraph or similar
  layout: string;
  isLayoutRunning: boolean;
  dragMode: boolean;
  draggedNode: string | null;
  setDraggedNode: (node: string | null) => void;
  dragLockMode: 'none' | 'fixed' | 'pinned';
  forceConfig: ForceLayoutConfig;
  forceAtlas2Config?: ForceAtlas2LayoutConfig;
  noverlapConfig?: NoverlapLayoutConfig;
  minHeight?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BaseGraphCore: React.FC<{
  graphData: any;
  layout: string;
  isLayoutRunning: boolean;
  dragMode: boolean;
  draggedNode: string | null;
  setDraggedNode: (node: string | null) => void;
  dragLockMode: 'none' | 'fixed' | 'pinned';
  forceConfig: ForceLayoutConfig;
  forceAtlas2Config?: ForceAtlas2LayoutConfig;
  noverlapConfig?: NoverlapLayoutConfig;
}> = ({
  graphData,
  layout,
  isLayoutRunning,
  dragMode,
  draggedNode,
  setDraggedNode,
  dragLockMode,
  forceConfig,
  forceAtlas2Config = {} as ForceAtlas2LayoutConfig,
  noverlapConfig = {} as NoverlapLayoutConfig,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
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
    if (!sigma || draggedNode) return; // Don't apply changes during drag operations

    const graph = sigma.getGraph();

    // Apply node scaling if enabled - only update visual properties, not layout
    if (
      forceConfig.nodeScaling ||
      forceAtlas2Config?.nodeScaling ||
      noverlapConfig?.nodeScaling
    ) {
      graph.forEachNode(nodeId => {
        const node = graph.getNodeAttributes(nodeId);
        if (node.scaleFactor && !node.highlighted) {
          // Don't modify highlighted/dragged nodes
          // Apply scaling to node properties that affect layout behavior
          if (forceConfig.nodeScaling && layout === 'force') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 + (forceConfig.scalingRatio - 1) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
          if (forceAtlas2Config?.nodeScaling && layout === 'forceatlas2') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 +
                ((forceAtlas2Config.scalingRatio || 1) - 1) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
          if (noverlapConfig?.nodeScaling && layout === 'noverlap') {
            // Scale node size based on configuration
            const scaledSize =
              node.baseSize *
              (1 + ((noverlapConfig.margin || 8) / 10) * node.scaleFactor);
            graph.setNodeAttribute(nodeId, 'size', scaledSize);
          }
        }
      });
    }

    // Note: We don't restart the layout here to prevent jitter
    // Layout parameters are applied directly to the running layout workers
  };

  // Load graph data only once
  useEffect(() => {
    loadGraph(graphData);
  }, [loadGraph, graphData]);

  // Update settings when theme changes, but don't reload graph
  useEffect(() => {
    setSettings({
      allowInvalidContainer: true,
      renderLabels: true,
      labelSize: 12,
      labelWeight: 'bold',
      labelFont: 'system-ui, -apple-system, sans-serif',
      labelColor: {
        color: isDark ? palette.dark.foreground : palette.light.foreground,
      },
      hideLabelsOnMove: false,
      labelDensity: 1,
      labelRenderedSizeThreshold: 0,
      defaultNodeColor: isDark ? palette.dark.primary : palette.light.primary,
      defaultEdgeColor: isDark
        ? palette.dark.foreground
        : palette.light.foreground,
      // Disable camera movement when dragging a node
      enableCameraRotation: !draggedNode,
      enableCameraPanning: !draggedNode,
      enableCameraZooming: !draggedNode,
      defaultDrawNodeHover: (ctx, data, settings) => {
        const { x, y, size, color, label } = data;
        const borderColor = isDark
          ? palette.dark.background
          : palette.light.background;
        const borderWidth = 3;
        const textBackgroundColor = isDark
          ? palette.dark.foreground
          : palette.light.foreground;
        const textColor = isDark
          ? palette.dark.background
          : palette.light.background;
        const padding = 2;

        // Save the current context state
        ctx.save();

        // Set the border color and width
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw the border circle
        ctx.beginPath();
        ctx.arc(x, y, size + borderWidth / 2, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw text background if label exists
        if (label) {
          const fontSize = settings.labelSize || 12;
          const font =
            settings.labelFont || 'system-ui, -apple-system, sans-serif';
          const fontWeight = settings.labelWeight || 'bold';
          const labelColor = textColor;

          // Set font and measure text (matching original settings)
          ctx.font = `${fontWeight} ${fontSize}px ${font}`;
          const textWidth = ctx.measureText(label).width;
          const textHeight = fontSize;

          // Draw text background
          ctx.fillStyle = textBackgroundColor;
          ctx.fillRect(
            x + size + padding,
            y - textHeight / 2 - padding,
            textWidth + 2 * padding,
            textHeight + 2 * padding
          );

          // Draw node label (using original label color)
          ctx.fillStyle = labelColor;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, x + size + padding * 2, y);
        }

        // Restore the context state
        ctx.restore();
      },
      nodeReducer: (_, attrs) => ({
        ...attrs,
        size: attrs.highlighted ? attrs.size * 1.3 : attrs.size,
        color: attrs.highlighted
          ? isDark
            ? palette.dark.primary
            : palette.light.primary
          : attrs.color ||
            (isDark ? palette.dark.primary : palette.light.primary),
        highlighted: attrs.highlighted || false,
        // Custom properties for visual styling (not part of NodeDisplayData interface)
        borderColor: attrs.highlighted
          ? isDark
            ? palette.dark.foreground
            : palette.light.foreground
          : attrs.pinned
            ? palette.dark.destructive
            : attrs.fixed
              ? palette.dark.warning
              : undefined,
        borderSize: attrs.highlighted ? 3 : attrs.pinned || attrs.fixed ? 2 : 0,
        labelOutlineColor: isDark
          ? palette.dark.background
          : palette.light.background,
        labelOutlineWidth: 2,
      }),
      edgeReducer: (_, attrs) => ({
        ...attrs,
        size: attrs.weight || 1,
        color: attrs.highlighted
          ? isDark
            ? palette.dark.primary
            : palette.light.primary
          : isDark
            ? palette.dark.foreground
            : palette.light.foreground,
      }),
    });

    // Auto-fit the graph after a short delay to ensure proper positioning
    setTimeout(() => {
      if (sigma) {
        sigma.getCamera().animatedReset({ duration: 1000 });
      }
    }, 1000);
  }, [setSettings, sigma, isDark, draggedNode]);

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
    forceAtlas2Config?.nodeScaling,
    forceAtlas2Config?.scalingRatio,
    noverlapConfig?.nodeScaling,
    noverlapConfig?.margin,
    layout,
    draggedNode, // Include draggedNode to prevent changes during drag
  ]);

  // Handle drag events
  useEffect(() => {
    if (!dragMode) {
      registerEvents({});
      return;
    }

    // Normalize mouse/touch coordinates to graph coordinates
    const getGraphCoordsFromEvent = (evt: any) => {
      const original = evt?.original as any;
      let clientX: number | undefined;
      let clientY: number | undefined;

      if (original?.touches && original.touches.length > 0) {
        clientX = original.touches[0].clientX;
        clientY = original.touches[0].clientY;
      } else if (
        original?.changedTouches &&
        original.changedTouches.length > 0
      ) {
        clientX = original.changedTouches[0].clientX;
        clientY = original.changedTouches[0].clientY;
      } else if (
        typeof original?.clientX === 'number' &&
        typeof original?.clientY === 'number'
      ) {
        clientX = original.clientX;
        clientY = original.clientY;
      } else if (typeof evt?.x === 'number' && typeof evt?.y === 'number') {
        clientX = evt.x;
        clientY = evt.y;
      }

      // Get the container's position to calculate relative coordinates
      const container = sigma.getContainer();
      const rect = container.getBoundingClientRect();

      // Convert client coordinates to container-relative coordinates
      const containerX = (clientX ?? 0) - rect.left;
      const containerY = (clientY ?? 0) - rect.top;

      const viewportPoint = { x: containerX, y: containerY } as {
        x: number;
        y: number;
      };
      return sigma.viewportToGraph(viewportPoint as { x: number; y: number });
    };

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

        // Prevent default sigma behavior (camera pan) when starting node drag
        e.preventSigmaDefault();
      },

      mousemovebody: e => {
        if (!draggedNode) return;

        const pos = getGraphCoordsFromEvent(e);
        const graph = sigma.getGraph();
        graph.setNodeAttribute(draggedNode, 'x', pos.x);
        graph.setNodeAttribute(draggedNode, 'y', pos.y);

        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },

      // Touch and Pointer move support mirrors mousemovebody
      touchmovebody: e => {
        if (!draggedNode) return;

        const pos = getGraphCoordsFromEvent(e);
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

      // Touch end handled via global listener to avoid event map type mismatch

      mousedown: e => {
        // Prevent camera pan when clicking for node drag
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
        // If we're about to drag a node, prevent default camera behavior
        if (draggedNode) {
          e.preventSigmaDefault();
        }
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

  // Add global touch event support for dragging on touch devices
  useEffect(() => {
    if (!dragMode) return;

    const handleTouchMove = (ev: TouchEvent) => {
      if (!draggedNode) return;
      if (ev.touches.length === 0) return;

      const touch = ev.touches[0];

      // Get the container's position to calculate relative coordinates
      const container = sigma.getContainer();
      const rect = container.getBoundingClientRect();

      // Convert client coordinates to container-relative coordinates
      const containerX = touch.clientX - rect.left;
      const containerY = touch.clientY - rect.top;

      const pos = sigma.viewportToGraph({ x: containerX, y: containerY });
      const graph = sigma.getGraph();
      graph.setNodeAttribute(draggedNode, 'x', pos.x);
      graph.setNodeAttribute(draggedNode, 'y', pos.y);

      ev.preventDefault();
      ev.stopPropagation();
    };

    const handleTouchEnd = (_ev: TouchEvent) => {
      if (!draggedNode) return;
      const graph = sigma.getGraph();
      graph.setNodeAttribute(draggedNode, 'highlighted', false);
      if (dragLockMode === 'fixed') {
        graph.setNodeAttribute(draggedNode, 'fixed', false);
      }
      setDraggedNode(null);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragMode, draggedNode, sigma, setDraggedNode, dragLockMode]);

  return null;
};

const BaseGraph: React.FC<BaseGraphProps> = ({
  graphData,
  layout,
  isLayoutRunning,
  dragMode,
  draggedNode,
  setDraggedNode,
  dragLockMode,
  forceConfig,
  forceAtlas2Config,
  noverlapConfig,
  minHeight = '600px',
  className = 'h-full w-full relative bg-background',
  style,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until mounted on client side
  if (!isMounted) {
    return (
      <div className={className} style={{ ...style, minHeight }}>
        <div className='flex items-center justify-center h-full'>
          <div className='text-foreground'>Loading graph...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={{ ...style, minHeight }}>
      <SigmaContainer
        style={{ height: '100%', width: '100%' }}
        settings={{ allowInvalidContainer: true }}
      >
        <BaseGraphCore
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
        />
      </SigmaContainer>
    </div>
  );
};

// Export with dynamic import to prevent SSR
const DynamicBaseGraph = dynamic(() => Promise.resolve(BaseGraph), {
  ssr: false,
  loading: () => (
    <div
      className='h-full w-full relative flex items-center justify-center bg-background'
      style={{ minHeight: '600px' }}
    >
      <div className='text-foreground'>Loading graph...</div>
    </div>
  ),
});

// Only export the dynamic version to prevent SSR issues
export default DynamicBaseGraph;
