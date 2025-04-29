
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface ASTViewerProps {
  code: string;
}

const ASTViewer = ({ code }: ASTViewerProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Function to generate a simple AST visualization based on the code
  const generateAST = useCallback((code: string) => {
    // This is a simplified example. In a real application,
    // you would use a proper parser to generate the AST.
    
    // For demo purposes, we'll create a simple mock AST
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    // Root node
    newNodes.push({
      id: '1',
      position: { x: 250, y: 5 },
      data: { label: 'Program' },
      style: { background: '#f0f9ff', border: '1px solid #93c5fd', borderRadius: '6px' }
    });
    
    // Add include node if the code has #include
    if (code.includes('#include')) {
      newNodes.push({
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: '#include <stdio.h>' },
        style: { background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '6px' }
      });
      newEdges.push({
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'smoothstep',
      });
    }

    // Add main function node
    newNodes.push({
      id: '3',
      position: { x: 300, y: 100 },
      data: { label: 'main()' },
      style: { background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: '6px' }
    });
    newEdges.push({
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
    });
    
    // Add printf if it exists
    if (code.includes('printf')) {
      newNodes.push({
        id: '4',
        position: { x: 250, y: 200 },
        data: { label: 'printf()' },
        style: { background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px' }
      });
      newEdges.push({
        id: 'e3-4',
        source: '3',
        target: '4',
        type: 'smoothstep',
      });
    }
    
    // Add return node
    if (code.includes('return')) {
      newNodes.push({
        id: '5',
        position: { x: 350, y: 200 },
        data: { label: 'return 0' },
        style: { background: '#fdf2f8', border: '1px solid #f9a8d4', borderRadius: '6px' }
      });
      newEdges.push({
        id: 'e3-5',
        source: '3',
        target: '5',
        type: 'smoothstep',
      });
    }
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);
  
  useEffect(() => {
    generateAST(code);
  }, [code, generateAST]);
  
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <MiniMap />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default ASTViewer;
