// Helper component for input fields
const ConfigInput: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  type?: 'number' | 'range';
}> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.001,
  type = 'number',
}) => (
  <div style={{ marginBottom: '8px' }}>
    <label
      style={{
        display: 'block',
        fontSize: '10px',
        color: '#666',
        marginBottom: '2px',
      }}
    >
      {label}: {value}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      min={min}
      max={max}
      step={step}
      style={{
        width: '100%',
        padding: '4px',
        borderRadius: '3px',
        border: '1px solid #ddd',
        fontSize: '10px',
      }}
    />
  </div>
);

// Helper component for checkbox fields
const ConfigCheckbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div style={{ marginBottom: '8px' }}>
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '10px',
        color: '#666',
      }}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ marginRight: '6px' }}
      />
      {label}
    </label>
  </div>
);

// Force Layout Configuration Panel
const ForceConfigPanel: React.FC<{
  config: any;
  onChange: (config: any) => void;
}> = ({ config, onChange }) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        fontSize: '10px',
      }}
    >
      <ConfigInput
        label='Attraction'
        value={config.attraction}
        onChange={v => updateConfig('attraction', v)}
        min={0}
        max={0.01}
        step={0.0001}
      />
      <ConfigInput
        label='Repulsion'
        value={config.repulsion}
        onChange={v => updateConfig('repulsion', v)}
        min={0}
        max={1}
        step={0.01}
      />
      <ConfigInput
        label='Gravity'
        value={config.gravity}
        onChange={v => updateConfig('gravity', v)}
        min={0}
        max={0.01}
        step={0.0001}
      />
      <ConfigInput
        label='Inertia'
        value={config.inertia}
        onChange={v => updateConfig('inertia', v)}
        min={0}
        max={1}
        step={0.01}
      />
      <ConfigInput
        label='Max Move'
        value={config.maxMove}
        onChange={v => updateConfig('maxMove', v)}
        min={1}
        max={1000}
        step={1}
      />
      <ConfigInput
        label='Scaling'
        value={config.scalingRatio}
        onChange={v => updateConfig('scalingRatio', v)}
        min={0.1}
        max={10}
        step={0.1}
      />
      <div style={{ gridColumn: '1 / -1' }}>
        <ConfigCheckbox
          label='Scale by node size'
          checked={config.nodeScaling}
          onChange={v => updateConfig('nodeScaling', v)}
        />
      </div>
    </div>
  );
};

// ForceAtlas2 Layout Configuration Panel
const ForceAtlas2ConfigPanel: React.FC<{
  config: any;
  onChange: (config: any) => void;
}> = ({ config, onChange }) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        fontSize: '10px',
      }}
    >
      <ConfigInput
        label='Gravity'
        value={config.gravity}
        onChange={v => updateConfig('gravity', v)}
        min={0}
        max={10}
        step={0.1}
      />
      <ConfigInput
        label='Edge Weight'
        value={config.edgeWeightInfluence}
        onChange={v => updateConfig('edgeWeightInfluence', v)}
        min={0}
        max={5}
        step={0.1}
      />
      <ConfigInput
        label='Scaling'
        value={config.scalingRatio}
        onChange={v => updateConfig('scalingRatio', v)}
        min={0.1}
        max={10}
        step={0.1}
      />
      <ConfigInput
        label='Slow Down'
        value={config.slowDown}
        onChange={v => updateConfig('slowDown', v)}
        min={0.1}
        max={10}
        step={0.1}
      />
      <div style={{ gridColumn: '1 / -1' }}>
        <ConfigCheckbox
          label='Lin-Log Mode'
          checked={config.linLogMode}
          onChange={v => updateConfig('linLogMode', v)}
        />
        <ConfigCheckbox
          label='Outbound Attraction Distribution'
          checked={config.outboundAttractionDistribution}
          onChange={v => updateConfig('outboundAttractionDistribution', v)}
        />
        <ConfigCheckbox
          label='Adjust Sizes'
          checked={config.adjustSizes}
          onChange={v => updateConfig('adjustSizes', v)}
        />
        <ConfigCheckbox
          label='Strong Gravity Mode'
          checked={config.strongGravityMode}
          onChange={v => updateConfig('strongGravityMode', v)}
        />
        <ConfigCheckbox
          label='Scale by node size'
          checked={config.nodeScaling}
          onChange={v => updateConfig('nodeScaling', v)}
        />
      </div>
    </div>
  );
};

// Noverlap Layout Configuration Panel
const NoverlapConfigPanel: React.FC<{
  config: any;
  onChange: (config: any) => void;
}> = ({ config, onChange }) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        fontSize: '10px',
      }}
    >
      <ConfigInput
        label='Margin'
        value={config.margin}
        onChange={v => updateConfig('margin', v)}
        min={0}
        max={50}
        step={1}
      />
      <ConfigInput
        label='Expansion'
        value={config.expansion}
        onChange={v => updateConfig('expansion', v)}
        min={1}
        max={5}
        step={0.1}
      />
      <ConfigInput
        label='Grid Size'
        value={config.gridSize}
        onChange={v => updateConfig('gridSize', v)}
        min={5}
        max={100}
        step={1}
      />
      <ConfigInput
        label='Speed'
        value={config.speed}
        onChange={v => updateConfig('speed', v)}
        min={1}
        max={20}
        step={1}
      />
      <ConfigInput
        label='Max Iterations'
        value={config.maxIterations}
        onChange={v => updateConfig('maxIterations', v)}
        min={50}
        max={2000}
        step={50}
      />
      <div style={{ gridColumn: '1 / -1' }}>
        <ConfigCheckbox
          label='Scale by node size'
          checked={config.nodeScaling}
          onChange={v => updateConfig('nodeScaling', v)}
        />
      </div>
    </div>
  );
};

const DragLayoutControls: React.FC<DragLayoutControlsProps> = ({
  layout,
  onLayoutChange,
  isLayoutRunning,
  onToggleLayout,
  dragMode,
  onToggleDragMode,
  draggedNode,
  dragLockMode,
  onDragLockModeChange,
  forceConfig,
  onForceConfigChange,
  forceAtlas2Config,
  onForceAtlas2ConfigChange,
  noverlapConfig,
  onNoverlapConfigChange,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: 1000,
        maxWidth: '400px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>
        Industries Network Explorer
      </h3>
      <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '12px' }}>
        14 industry nodes with weighted connections - Explore industry relationships
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '14px' }}>
          Layout Algorithm
        </h4>
        <select
          value={layout}
          onChange={e => onLayoutChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
          }}
        >
          <option value='none'>No Layout</option>
          <option value='force'>Force Layout</option>
          <option value='forceatlas2'>ForceAtlas2</option>
          <option value='noverlap'>Noverlap</option>
        </select>

        <button
          onClick={onToggleLayout}
          disabled={layout === 'none'}
          style={{
            width: '100%',
            marginTop: '8px',
            padding: '10px',
            backgroundColor:
              layout === 'none'
                ? '#6c757d'
                : isLayoutRunning
                  ? '#dc3545'
                  : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: layout === 'none' ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {isLayoutRunning ? 'Stop Layout' : 'Start Layout'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#555', fontSize: '14px' }}>
          Drag Mode
        </h4>

        <div style={{ marginBottom: '10px' }}>
          <label
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
          >
            <input
              type='checkbox'
              checked={dragMode}
              onChange={onToggleDragMode}
              style={{ marginRight: '8px' }}
            />
            Enable Dragging
          </label>
        </div>

        {dragMode && (
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '12px',
                color: '#666',
              }}
            >
              Drag Lock Mode:
            </label>
            <select
              value={dragLockMode}
              onChange={e =>
                onDragLockModeChange(
                  e.target.value as 'none' | 'fixed' | 'pinned'
                )
              }
              style={{
                width: '100%',
                padding: '6px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '12px',
              }}
            >
              <option value='none'>None (Free movement)</option>
              <option value='fixed'>Fixed (Temporary lock)</option>
              <option value='pinned'>Pinned (Permanent lock)</option>
            </select>
          </div>
        )}
      </div>

      {draggedNode && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#e3f2fd',
            borderRadius: '6px',
            fontSize: '12px',
            lineHeight: '1.4',
            marginBottom: '15px',
          }}
        >
          <div style={{ color: '#1976d2', fontWeight: 'bold' }}>
            Dragging: {draggedNode}
          </div>
          <div style={{ color: '#666', marginTop: '4px' }}>
            Mode: {dragLockMode}
          </div>
        </div>
      )}

      {/* Layout Configuration */}
      {layout !== 'none' && (
        <div
          style={{
            marginBottom: '15px',
            padding: '12px',
            backgroundColor: '#fff3cd',
            borderRadius: '6px',
            border: '1px solid #ffeaa7',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#555', fontSize: '12px' }}>
            {layout.charAt(0).toUpperCase() + layout.slice(1)} Configuration
          </h4>

          {layout === 'force' && (
            <ForceConfigPanel
              config={forceConfig}
              onChange={onForceConfigChange}
            />
          )}

          {layout === 'forceatlas2' && (
            <ForceAtlas2ConfigPanel
              config={forceAtlas2Config}
              onChange={onForceAtlas2ConfigChange}
            />
          )}

          {layout === 'noverlap' && (
            <NoverlapConfigPanel
              config={noverlapConfig}
              onChange={onNoverlapConfigChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

interface DragLayoutControlsProps {
  layout: string;
  onLayoutChange: (layout: string) => void;
  isLayoutRunning: boolean;
  onToggleLayout: () => void;
  dragMode: boolean;
  onToggleDragMode: () => void;
  draggedNode: string | null;
  dragLockMode: 'none' | 'fixed' | 'pinned';
  onDragLockModeChange: (mode: 'none' | 'fixed' | 'pinned') => void;
  forceConfig: any;
  onForceConfigChange: (config: any) => void;
  forceAtlas2Config: any;
  onForceAtlas2ConfigChange: (config: any) => void;
  noverlapConfig: any;
  onNoverlapConfigChange: (config: any) => void;
}
export {
  ForceConfigPanel,
  ForceAtlas2ConfigPanel,
  NoverlapConfigPanel,
  DragLayoutControls,
};

export type { DragLayoutControlsProps };
