import React, { useCallback, useEffect, useState, useRef, Component } from 'react';
import { Plus, Save, Play, Share, Trash, Search, Filter, Mail, Database, Bot, FileText, MessageSquare, ZoomIn, ZoomOut, Move, Calendar, Clock, AlertCircle, ArrowRight, Edit, Copy, ChevronRight, ChevronDown, Info, MoreVertical, X } from 'lucide-react';
// Sample workflow data
const sampleWorkflows = [{
  id: 1,
  name: 'Patient Intake Process',
  description: 'Automates patient intake through email processing and data extraction',
  createdAt: '2023-05-12',
  updatedAt: '2023-08-23',
  status: 'active',
  trigger: 'email',
  executions: 245,
  lastRun: '2 hours ago'
}, {
  id: 2,
  name: 'Appointment Reminder',
  description: 'Sends automated reminders to patients before appointments',
  createdAt: '2023-06-18',
  updatedAt: '2023-09-05',
  status: 'active',
  trigger: 'schedule',
  executions: 1892,
  lastRun: '35 mins ago'
}, {
  id: 3,
  name: 'Lab Results Processing',
  description: 'Processes incoming lab results and notifies patients',
  createdAt: '2023-04-30',
  updatedAt: '2023-07-15',
  status: 'draft',
  trigger: 'data',
  executions: 0,
  lastRun: 'Never'
}, {
  id: 4,
  name: 'Insurance Verification',
  description: 'Automates insurance verification for new patients',
  createdAt: '2023-07-22',
  updatedAt: '2023-08-10',
  status: 'active',
  trigger: 'form',
  executions: 432,
  lastRun: '1 day ago'
}, {
  id: 5,
  name: 'Prescription Renewal',
  description: 'Handles prescription renewal requests from patients',
  createdAt: '2023-08-05',
  updatedAt: '2023-09-01',
  status: 'inactive',
  trigger: 'message',
  executions: 156,
  lastRun: '5 days ago'
}];
// Workflow List Component
const WorkflowList = ({
  onCreateNew,
  onEditWorkflow
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(null);
  // Filter workflows based on search and status
  const filteredWorkflows = sampleWorkflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) || workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const toggleDetails = id => {
    setShowDetails(showDetails === id ? null : id);
  };
  return <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 flex-shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Workflows
          </h1>
          <p className="text-muted-foreground text-sm">
            Design and automate healthcare workflows
          </p>
        </div>
        <button onClick={onCreateNew} className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          <Plus size={16} className="mr-2" />
          Create New Workflow
        </button>
      </div>

      {/* Search and filters - stack on mobile */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search workflows..." className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1]" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm flex-1" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Workflows list - desktop view (hidden on mobile) */}
      <div className="rounded-md border flex-1 flex flex-col overflow-hidden hidden md:flex">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium border-b bg-muted/30 flex-shrink-0">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Trigger</div>
          <div className="col-span-1">Executions</div>
          <div className="col-span-2">Last Updated</div>
          <div className="col-span-1">Actions</div>
        </div>
        <div className="divide-y divide-border overflow-y-auto flex-1">
          {filteredWorkflows.length === 0 ? <div className="p-6 text-center text-muted-foreground">
              No workflows found. Create a new workflow to get started.
            </div> : filteredWorkflows.map(workflow => <div key={workflow.id} className="grid grid-cols-12 gap-4 p-4 text-sm items-center hover:bg-muted/20">
                <div className="col-span-3 font-medium">{workflow.name}</div>
                <div className="col-span-3 text-muted-foreground truncate">
                  {workflow.description}
                </div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${workflow.status === 'active' ? 'bg-green-100 text-green-800' : workflow.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {workflow.status === 'active' ? 'Active' : workflow.status === 'draft' ? 'Draft' : 'Inactive'}
                  </span>
                </div>
                <div className="col-span-1">
                  {workflow.trigger === 'email' && <Mail size={16} className="text-blue-500" />}
                  {workflow.trigger === 'schedule' && <Calendar size={16} className="text-purple-500" />}
                  {workflow.trigger === 'data' && <Database size={16} className="text-green-500" />}
                  {workflow.trigger === 'form' && <FileText size={16} className="text-orange-500" />}
                  {workflow.trigger === 'message' && <MessageSquare size={16} className="text-red-500" />}
                </div>
                <div className="col-span-1 text-muted-foreground">
                  {workflow.executions}
                </div>
                <div className="col-span-2 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{workflow.updatedAt}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEditWorkflow(workflow.id)} className="p-1 hover:bg-muted rounded-md" title="Edit workflow">
                      <Edit size={16} className="text-[#4169e1]" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded-md" title="Duplicate workflow">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>)}
        </div>
      </div>

      {/* Mobile workflow list (hidden on desktop) */}
      <div className="md:hidden rounded-md border flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto flex-1">
          {filteredWorkflows.length === 0 ? <div className="p-6 text-center text-muted-foreground">
              No workflows found. Create a new workflow to get started.
            </div> : <div className="divide-y divide-border">
              {filteredWorkflows.map(workflow => <div key={workflow.id} className="flex flex-col">
                  <div className="p-4 hover:bg-muted/20" onClick={() => toggleDetails(workflow.id)}>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{workflow.name}</div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${workflow.status === 'active' ? 'bg-green-100 text-green-800' : workflow.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {workflow.status === 'active' ? 'Active' : workflow.status === 'draft' ? 'Draft' : 'Inactive'}
                        </span>
                        {showDetails === workflow.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {workflow.description}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {workflow.trigger === 'email' && <Mail size={12} className="text-blue-500" />}
                        {workflow.trigger === 'schedule' && <Calendar size={12} className="text-purple-500" />}
                        {workflow.trigger === 'data' && <Database size={12} className="text-green-500" />}
                        {workflow.trigger === 'form' && <FileText size={12} className="text-orange-500" />}
                        {workflow.trigger === 'message' && <MessageSquare size={12} className="text-red-500" />}
                        <span>
                          {workflow.trigger.charAt(0).toUpperCase() + workflow.trigger.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{workflow.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  {/* Expanded details */}
                  {showDetails === workflow.id && <div className="px-4 pb-4 bg-muted/10">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Executions:
                          </span>
                          <span>{workflow.executions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Last run:
                          </span>
                          <span>{workflow.lastRun}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Created:
                          </span>
                          <span>{workflow.createdAt}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-end gap-2">
                          <button onClick={e => {
                    e.stopPropagation();
                    onEditWorkflow(workflow.id);
                  }} className="p-2 bg-[#4169e1]/10 text-[#4169e1] rounded-md text-xs font-medium flex items-center">
                            <Edit size={14} className="mr-1" />
                            Edit
                          </button>
                          <button onClick={e => e.stopPropagation()} className="p-2 bg-gray-100 text-gray-700 rounded-md text-xs font-medium flex items-center">
                            <Copy size={14} className="mr-1" />
                            Duplicate
                          </button>
                        </div>
                      </div>
                    </div>}
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
};
const WorkflowCanvas = () => {
  // State for canvas transform (position and scale)
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [nodes, setNodes] = useState([{
    id: 1,
    type: 'email',
    x: 100,
    y: 100,
    width: 64
  }, {
    id: 2,
    type: 'data',
    x: 300,
    y: 200,
    width: 64
  }, {
    id: 3,
    type: 'ai',
    x: 500,
    y: 300,
    width: 64
  }, {
    id: 4,
    type: 'update',
    x: 700,
    y: 200,
    width: 64
  }, {
    id: 5,
    type: 'response',
    x: 900,
    y: 100,
    width: 64
  }]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connections, setConnections] = useState([{
    from: 1,
    to: 2,
    fromOutput: 'output',
    toInput: 'input'
  }, {
    from: 2,
    to: 3,
    fromOutput: 'output',
    toInput: 'input'
  }, {
    from: 3,
    to: 4,
    fromOutput: 'output',
    toInput: 'input'
  }, {
    from: 4,
    to: 5,
    fromOutput: 'output',
    toInput: 'input'
  }]);
  const canvasRef = useRef(null);
  // Add new state for connection drawing
  const [drawingConnection, setDrawingConnection] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  // Handle canvas panning
  const handleMouseDown = e => {
    // Only start dragging if not clicking on a node
    if (e.target === canvasRef.current || e.target.classList.contains('canvas-background')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };
  const handleMouseMove = e => {
    // Update mouse position for connection drawing
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setTransform(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy
      }));
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };
  // Handle zooming with mouse wheel
  const handleWheel = e => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom in or out
    // Calculate the mouse position relative to the canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // Calculate new scale
    const newScale = transform.scale * scaleFactor;
    // Limit zoom level
    if (newScale < 0.1 || newScale > 5) return;
    // Calculate new position to zoom toward mouse position
    const newX = mouseX - (mouseX - transform.x) * scaleFactor;
    const newY = mouseY - (mouseY - transform.y) * scaleFactor;
    setTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  };
  // Handle node dragging
  const startNodeDrag = (e, nodeId) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
  };
  const handleNodeDrag = useCallback(e => {
    if (selectedNode !== null) {
      // Get mouse position relative to canvas and adjusted for scale
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - transform.x) / transform.scale;
      const y = (e.clientY - rect.top - transform.y) / transform.scale;
      setNodes(prev => prev.map(node => node.id === selectedNode ? {
        ...node,
        x,
        y
      } : node));
    }
  }, [selectedNode, transform]);
  const endNodeDrag = () => {
    setSelectedNode(null);
  };
  // Set up event listeners for node dragging
  useEffect(() => {
    if (selectedNode !== null) {
      window.addEventListener('mousemove', handleNodeDrag);
      window.addEventListener('mouseup', endNodeDrag);
      return () => {
        window.removeEventListener('mousemove', handleNodeDrag);
        window.removeEventListener('mouseup', endNodeDrag);
      };
    }
  }, [selectedNode, handleNodeDrag]);
  // Start drawing a connection from a node's output
  const startConnection = (e, nodeId) => {
    e.stopPropagation();
    const sourceNode = nodes.find(node => node.id === nodeId);
    setDrawingConnection({
      from: nodeId,
      fromOutput: 'output',
      fromNode: sourceNode
    });
  };
  // Complete a connection to a node's input
  const completeConnection = (e, nodeId) => {
    e.stopPropagation();
    if (drawingConnection && drawingConnection.from !== nodeId) {
      // Check if connection already exists
      const connectionExists = connections.some(conn => conn.from === drawingConnection.from && conn.to === nodeId);
      if (!connectionExists) {
        setConnections([...connections, {
          from: drawingConnection.from,
          to: nodeId,
          fromOutput: drawingConnection.fromOutput,
          toInput: 'input'
        }]);
      }
    }
    setDrawingConnection(null);
  };
  // Cancel drawing connection
  const cancelConnection = () => {
    if (drawingConnection) {
      setDrawingConnection(null);
      return true;
    }
    return false;
  };
  // Handle mouse up event
  const handleMouseUp = () => {
    // Cancel connection drawing if not completed
    cancelConnection();
    setIsDragging(false);
  };
  // Get path for connection being drawn
  const getDrawingPath = () => {
    if (!drawingConnection) return '';
    const fromNode = drawingConnection.fromNode;
    const startX = (fromNode.x + fromNode.width / 2) * transform.scale + transform.x;
    const startY = (fromNode.y + 32) * transform.scale + transform.y;
    const endX = mousePosition.x;
    const endY = mousePosition.y;
    // Create a curved path
    const controlX1 = startX;
    const controlY1 = startY + (endY - startY) / 2;
    const controlX2 = endX;
    const controlY2 = endY - (endY - startY) / 2;
    return `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
  };
  // Calculate connection paths between nodes
  const getConnectionPath = (fromNode, toNode, fromOutput, toInput) => {
    // Calculate connection points
    const startX = (fromNode.x + fromNode.width / 2) * transform.scale + transform.x;
    const startY = (fromNode.y + 32) * transform.scale + transform.y;
    const endX = (toNode.x + toNode.width / 2) * transform.scale + transform.x;
    const endY = (toNode.y + 16) * transform.scale + transform.y;
    // Create a curved path
    const controlX1 = startX;
    const controlY1 = startY + (endY - startY) / 2;
    const controlX2 = endX;
    const controlY2 = endY - (endY - startY) / 2;
    return `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
  };
  // Zoom controls
  const zoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 5)
    }));
  };
  const zoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale * 0.8, 0.1)
    }));
  };
  const resetZoom = () => {
    setTransform({
      x: 0,
      y: 0,
      scale: 1
    });
  };
  // Calculate the grid size based on zoom level
  const gridSize = 20 * transform.scale;
  const gridOffset = {
    x: transform.x % gridSize,
    y: transform.y % gridSize
  };
  return <div className="bg-accent/30 h-full rounded-md border border-border p-0 relative overflow-hidden" ref={canvasRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{
    cursor: isDragging ? 'grabbing' : drawingConnection ? 'crosshair' : 'grab'
  }}>
      {/* Grid background that respects zoom level */}
      <div className="absolute inset-0 canvas-background" style={{
      backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
      backgroundSize: `${gridSize}px ${gridSize}px`,
      backgroundPosition: `${gridOffset.x}px ${gridOffset.y}px`,
      userSelect: 'none' // Prevent text selection on background
    }}></div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white p-2 rounded-md shadow-md z-20">
        <button onClick={zoomIn} className="p-1 hover:bg-accent rounded-md">
          <ZoomIn size={18} />
        </button>
        <button onClick={zoomOut} className="p-1 hover:bg-accent rounded-md">
          <ZoomOut size={18} />
        </button>
        <button onClick={resetZoom} className="p-1 hover:bg-accent rounded-md">
          <Move size={18} />
        </button>
      </div>

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 z-0 pointer-events-none">
        {connections.map((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        if (!fromNode || !toNode) return null;
        return <path key={index} d={getConnectionPath(fromNode, toNode, connection.fromOutput, connection.toInput)} stroke={fromNode.type === 'email' ? '#3b82f6' : fromNode.type === 'data' ? '#22c55e' : fromNode.type === 'ai' ? '#a855f7' : fromNode.type === 'update' ? '#f97316' : '#ef4444'} strokeWidth="2" fill="none" />;
      })}
        {/* Drawing connection line */}
        {drawingConnection && <path d={getDrawingPath()} stroke={drawingConnection.fromNode.type === 'email' ? '#3b82f6' : drawingConnection.fromNode.type === 'data' ? '#22c55e' : drawingConnection.fromNode.type === 'ai' ? '#a855f7' : drawingConnection.fromNode.type === 'update' ? '#f97316' : '#ef4444'} strokeWidth="2" strokeDasharray="5,5" fill="none" />}
      </svg>

      {/* Nodes */}
      {nodes.map(node => {
      const nodeX = node.x * transform.scale + transform.x;
      const nodeY = node.y * transform.scale + transform.y;
      const nodeWidth = node.width * transform.scale;
      return <div key={node.id} className="absolute bg-card rounded-md shadow-md border border-border z-10 cursor-move" style={{
        left: `${nodeX}px`,
        top: `${nodeY}px`,
        width: `${nodeWidth * 4}px`,
        transform: `scale(${transform.scale})`,
        transformOrigin: 'top left',
        userSelect: 'none' // Prevent text selection
      }} onMouseDown={e => startNodeDrag(e, node.id)}>
            <div className={`p-3 border-b border-border ${node.type === 'email' ? 'bg-blue-50' : node.type === 'data' ? 'bg-green-50' : node.type === 'ai' ? 'bg-purple-50' : node.type === 'update' ? 'bg-orange-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {node.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                {node.type === 'data' && <Database className="h-4 w-4 text-green-600" />}
                {node.type === 'ai' && <Bot className="h-4 w-4 text-purple-600" />}
                {node.type === 'update' && <FileText className="h-4 w-4 text-orange-600" />}
                {node.type === 'response' && <MessageSquare className="h-4 w-4 text-red-600" />}
                <span className="font-medium text-sm">
                  {node.type === 'email' && 'Email Trigger'}
                  {node.type === 'data' && 'Data Extraction'}
                  {node.type === 'ai' && 'AI Processing'}
                  {node.type === 'update' && 'Update Records'}
                  {node.type === 'response' && 'Send Response'}
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs text-muted-foreground mb-2">
                {node.type === 'email' && 'When a new email is received'}
                {node.type === 'data' && 'Extract patient data from email'}
                {node.type === 'ai' && 'Analyze patient request'}
                {node.type === 'update' && 'Update patient records in EHR'}
                {node.type === 'response' && 'Send automated response to patient'}
              </div>
              {/* Input connection point */}
              {node.type !== 'email' && <div className="flex items-center justify-between text-xs mb-2">
                  <span>Input</span>
                  <div className="h-3 w-3 rounded-full bg-blue-500 cursor-pointer relative" onClick={e => completeConnection(e, node.id)} style={{
              zIndex: 1
            }}></div>
                </div>}
              {/* Output connection point */}
              <div className="flex items-center justify-between text-xs">
                <span>{node.type === 'response' ? 'Complete' : 'Output'}</span>
                <div className={`h-3 w-3 rounded-full cursor-pointer relative ${node.type === 'email' ? 'bg-blue-500' : node.type === 'data' ? 'bg-green-500' : node.type === 'ai' ? 'bg-purple-500' : node.type === 'update' ? 'bg-orange-500' : 'bg-red-500'}`} onClick={e => startConnection(e, node.id)} style={{
              zIndex: 1
            }}></div>
              </div>
            </div>
          </div>;
    })}
    </div>;
};
const WorkflowCanvasContainer = ({
  onBackToList
}) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [showSidebar, setShowSidebar] = useState(true);
  return <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 flex-shrink-0">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={onBackToList} className="text-[#4169e1] hover:underline flex items-center gap-1 mr-2">
              <ArrowRight size={16} className="rotate-180" />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Workflow Canvas
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Design and automate healthcare workflows
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="md:hidden inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? 'Hide Components' : 'Show Components'}
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent">
            <Play size={14} className="mr-1.5" />
            <span className="sm:inline">Test</span>
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent">
            <Share size={14} className="mr-1.5" />
            <span className="sm:inline">Share</span>
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Save size={14} className="mr-1.5" />
            <span className="sm:inline">Save</span>
          </button>
        </div>
      </div>
      {/* Mobile tab navigation */}
      <div className="md:hidden border-b border-border mb-3 overflow-x-auto flex-shrink-0">
        <div className="flex items-center">
          <button className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'editor' ? 'border-b-2 border-[#4169e1] text-[#4169e1]' : 'text-muted-foreground'}`} onClick={() => setActiveTab('editor')}>
            Editor
          </button>
          <button className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'executions' ? 'border-b-2 border-[#4169e1] text-[#4169e1]' : 'text-muted-foreground'}`} onClick={() => setActiveTab('executions')}>
            Executions
          </button>
          <button className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-[#4169e1] text-[#4169e1]' : 'text-muted-foreground'}`} onClick={() => setActiveTab('settings')}>
            Settings
          </button>
          <div className="ml-auto flex items-center px-2">
            <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
              Active
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 flex-1 overflow-hidden">
        {/* Left sidebar - Node palette - Conditionally shown on mobile */}
        {(showSidebar || !activeTab.includes('editor') || window.innerWidth >= 768) && <div className={`${activeTab === 'editor' ? 'md:col-span-2' : 'hidden md:block md:col-span-2'} border border-border rounded-md flex flex-col overflow-hidden mb-3 md:mb-0`}>
            <div className="p-3 border-b border-border bg-card flex-shrink-0 flex justify-between items-center">
              <h3 className="font-medium">Components</h3>
              <button className="md:hidden text-muted-foreground" onClick={() => setShowSidebar(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex-1">
              <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Triggers
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Email</span>
                  </div>
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Message</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
                  Processing
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Data Extract</span>
                  </div>
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">AI Process</span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">
                  Actions
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Update EHR</span>
                  </div>
                </div>
                <div className="p-2 border border-border rounded-md bg-card mb-2 cursor-grab">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Send Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {/* Main content - Canvas and tabs */}
        <div className={`${activeTab === 'editor' ? 'md:col-span-10' : 'md:col-span-10'} border border-border rounded-md overflow-hidden flex flex-col`}>
          {/* Desktop tab navigation - hidden on mobile */}
          <div className="hidden md:block border-b border-border bg-card flex-shrink-0">
            <div className="flex items-center">
              <button className={`px-4 py-2 text-sm font-medium border-r border-border ${activeTab === 'editor' ? 'bg-background' : ''}`} onClick={() => setActiveTab('editor')}>
                Editor
              </button>
              <button className={`px-4 py-2 text-sm font-medium border-r border-border ${activeTab === 'executions' ? 'bg-background' : ''}`} onClick={() => setActiveTab('executions')}>
                Executions
              </button>
              <button className={`px-4 py-2 text-sm font-medium border-r border-border ${activeTab === 'settings' ? 'bg-background' : ''}`} onClick={() => setActiveTab('settings')}>
                Settings
              </button>
              <div className="ml-auto flex items-center px-4">
                <div className="text-sm mr-4">
                  <span className="text-muted-foreground mr-2">Workflow:</span>
                  <span className="font-medium">Patient Intake Process</span>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {activeTab === 'editor' && <WorkflowCanvas />}
            {activeTab === 'executions' && <div className="p-3 sm:p-6 h-full overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="font-medium">Recent Executions</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="inline-flex items-center text-sm text-muted-foreground">
                      <Filter size={14} className="mr-1" />
                      Filter
                    </button>
                    <select className="h-8 rounded-md border border-input bg-background px-3 text-sm">
                      <option>Last 24 hours</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                    </select>
                  </div>
                </div>
                {/* Mobile execution list */}
                <div className="md:hidden space-y-3">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">WF-{1000 + i}</div>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : i % 4 === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {i % 3 === 0 ? 'Running' : i % 4 === 0 ? 'Failed' : 'Completed'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div className="text-muted-foreground">Started:</div>
                        <div>10 mins ago</div>
                        <div className="text-muted-foreground">Duration:</div>
                        <div>3.2s</div>
                        <div className="text-muted-foreground">Trigger:</div>
                        <div>Email</div>
                      </div>
                      <div className="flex justify-end">
                        <button className="text-primary text-sm">
                          View details
                        </button>
                      </div>
                    </div>)}
                </div>
                {/* Desktop execution table - hidden on mobile */}
                <div className="hidden md:block rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-3 text-sm font-medium border-b">
                    <div>ID</div>
                    <div>Started</div>
                    <div>Duration</div>
                    <div>Status</div>
                    <div>Trigger</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y divide-border">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="grid grid-cols-6 gap-4 p-3 text-sm">
                        <div className="font-medium">WF-{1000 + i}</div>
                        <div className="text-muted-foreground">10 mins ago</div>
                        <div className="text-muted-foreground">3.2s</div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${i % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : i % 4 === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {i % 3 === 0 ? 'Running' : i % 4 === 0 ? 'Failed' : 'Completed'}
                          </span>
                        </div>
                        <div className="text-muted-foreground">Email</div>
                        <div>
                          <button className="text-primary text-sm">
                            View details
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>}
            {activeTab === 'settings' && <div className="p-3 sm:p-6 h-full overflow-y-auto">
                <h3 className="font-medium mb-4">Workflow Settings</h3>
                <div className="space-y-4 sm:space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Workflow Name
                    </label>
                    <input type="text" value="Patient Intake Process" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]" defaultValue="This workflow automates the patient intake process by processing incoming emails, extracting patient data, analyzing the request with AI, updating electronic health records, and sending an automated response."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Access Level
                    </label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Admin Only</option>
                      <option>Hospital Staff</option>
                      <option>Doctors</option>
                      <option>Nurses</option>
                      <option>All Users</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm">Active</span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      When active, this workflow will automatically run when
                      triggered
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="ml-2 text-sm">
                        Send notifications on failure
                      </span>
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Receive email notifications when this workflow fails
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button className="inline-flex items-center justify-center rounded-md border border-destructive bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20">
                      <Trash size={16} className="mr-2" />
                      Delete Workflow
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      <Save size={16} className="mr-2" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
const Workflow = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState(null);
  const handleCreateNew = () => {
    setShowCanvas(true);
    setEditingWorkflowId(null);
  };
  const handleEditWorkflow = workflowId => {
    setShowCanvas(true);
    setEditingWorkflowId(workflowId);
  };
  const handleBackToList = () => {
    setShowCanvas(false);
  };
  return <div className="h-full overflow-auto">
      {showCanvas ? <WorkflowCanvasContainer onBackToList={handleBackToList} /> : <WorkflowList onCreateNew={handleCreateNew} onEditWorkflow={handleEditWorkflow} />}
    </div>;
};
export default Workflow;