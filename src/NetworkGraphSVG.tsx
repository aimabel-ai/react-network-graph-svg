import React from 'react';

type ShapeType = 'circle' | 'square';

export interface Node {
  id: number;
  label: string;
  title?: string;
  shapeType?: ShapeType;
  lineColor?: string;
  lineWidth?: number;
  fillColor?: string;
  x?: number;
  y?: number;
  onClick?: () => void;
  tier?: number;
}

export interface Edge {
  from: number;
  to: number;
  label?: string;
  title?: string;
  lineColor?: string;
  lineWidth?: number;
  onClick?: () => void;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface Options {
  height: string;
  width?: string;
  defaultNode?: {
    shapeType: ShapeType;
    lineColor: string;
    lineWidth: number;
    fillColor: string;
  };
  defaultEdge?: {
    lineColor: string;
    lineWidth: number;
  };
}

interface NetworkGraphSVGProps {
  graph: Graph;
  options: Options;
}

const NetworkGraphSVG: React.FC<NetworkGraphSVGProps> = ({ graph, options }) => {
  const height = parseInt(options.height, 10);
  const width = parseInt(options.width ?? options.height, 10);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 50;

  // Safe fallback for defaults
  const defaultNode = {
    shapeType: 'circle',
    lineColor: '#000',
    lineWidth: 1,
    fillColor: '#fff',
    ...options.defaultNode,
  };

  const defaultEdge = {
    lineColor: '#000',
    lineWidth: 1,
    ...options.defaultEdge,
  };

  const nodesWithPosition: Node[] = (() => {
    // Group nodes by tier (default to 3)
    const nodesByTier = graph.nodes.reduce<Record<number, Node[]>>((acc, node) => {
      const tier = node.tier ?? 3;
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(node);
      return acc;
    }, {});

    // Position nodes for each tier
    const positionedNodes: Node[] = [];

    Object.entries(nodesByTier).forEach(([tierStr, nodes]) => {
      const tier = parseInt(tierStr, 10);
      // Calculate radius for this tier (equal spacing: tier 1 = 1/3, tier 2 = 2/3, tier 3 = 3/3)
      const tierRadius = radius * (tier / 3);

      nodes.forEach((node, index) => {
        // Start from top (-π/2) and distribute evenly to avoid same Y positions
        const angle = -Math.PI / 2 + (index / nodes.length) * 2 * Math.PI;
        positionedNodes.push({
          ...node,
          x: centerX + tierRadius * Math.cos(angle),
          y: centerY + tierRadius * Math.sin(angle),
        });
      });
    });

    return positionedNodes;
  })();

  const nodeMap = nodesWithPosition.reduce<Record<number, Node>>((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ddd' }}>
      {/* Edges */}
      {graph.edges.map((edge, i) => {
        const from = nodeMap[edge.from];
        const to = nodeMap[edge.to];
        if (!from || !to) return null;

        const stroke = edge.lineColor ?? defaultEdge.lineColor;
        const strokeWidth = edge.lineWidth ?? defaultEdge.lineWidth;

        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={stroke}
            strokeWidth={strokeWidth}
            onClick={edge.onClick}
            style={edge.onClick ? { cursor: 'pointer' } : undefined}
          >
            {edge.title && <title>{edge.title}</title>}
          </line>
        );
      })}

      {/* Nodes */}
      {nodesWithPosition.map((node) => {
        const {
          x,
          y,
          title,
          label,
          shapeType = defaultNode.shapeType,
          lineColor = defaultNode.lineColor,
          lineWidth = defaultNode.lineWidth,
          fillColor = defaultNode.fillColor,
        } = node;

        return (
          <g
            key={node.id}
            onClick={node.onClick}
            style={node.onClick ? { cursor: 'pointer' } : undefined}
          >
            {shapeType === 'circle' ? (
              <circle
                cx={x}
                cy={y}
                r={20}
                fill={fillColor}
                stroke={lineColor}
                strokeWidth={lineWidth}
              >
                <title>{title}</title>
              </circle>
            ) : (
              <rect
                x={x! - 20}
                y={y! - 20}
                width={40}
                height={40}
                fill={fillColor}
                stroke={lineColor}
                strokeWidth={lineWidth}
              >
                <title>{title}</title>
              </rect>
            )}
            <text x={x} y={y} textAnchor='middle' dy='.3em' fontSize='12'>
              {label}
              <title>{title}</title>
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default NetworkGraphSVG;
