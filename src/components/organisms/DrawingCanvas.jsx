import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DrawingCanvas = ({ onCanvasChange, className = '' }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#333333');
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches[0]?.clientY) - rect.top;
    
    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches[0]?.clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    
    if (tool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setHasDrawn(true);
    onCanvasChange?.(canvas.toDataURL());
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onCanvasChange?.(null);
  };

  const tools = [
    { id: 'pen', icon: 'PenTool', label: 'Pen' },
    { id: 'eraser', icon: 'Eraser', label: 'Eraser' }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Tool Selection */}
        <div className="flex gap-2">
          {tools.map((toolOption) => (
            <motion.button
              key={toolOption.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTool(toolOption.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg transition-all
                ${tool === toolOption.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <ApperIcon name={toolOption.icon} size={16} />
              <span className="text-sm font-medium">{toolOption.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-gray-600 w-6">{brushSize}</span>
        </div>

        {/* Color Picker */}
        {tool === 'pen' && (
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Color:</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        )}

        {/* Clear Button */}
        <Button
          variant="outline"
          size="sm"
          icon="Trash2"
          onClick={clearCanvas}
          disabled={!hasDrawn}
        >
          Clear
        </Button>
      </div>

      {/* Drawing Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`
            w-full h-auto max-w-full border-2 border-gray-100 rounded-2xl cursor-crosshair
            ${tool === 'pen' ? 'canvas-drawing' : 'canvas-erasing'}
          `}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <ApperIcon name="PenTool" size={48} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Start drawing your emoji!</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DrawingCanvas;