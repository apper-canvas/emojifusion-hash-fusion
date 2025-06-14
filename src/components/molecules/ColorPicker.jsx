import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ColorPicker = ({ 
  value = '#FF6B6B', 
  onChange, 
  label = 'Choose Color',
  presetColors = [],
  showCustom = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const defaultPresets = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#339AF0', 
    '#51CF66', '#FF8CC8', '#845EC2', '#FFC75F',
    '#FF9F1C', '#2D3748', '#F7FAFC', '#EDF2F7'
  ];

  const colors = presetColors.length > 0 ? presetColors : defaultPresets;

  const handleColorSelect = (color) => {
    onChange?.(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    onChange?.(color);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-primary transition-colors"
      >
        <div 
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: value }}
        />
        <span className="flex-1 text-left text-gray-700">{value}</span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-gray-400"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-30"
          >
            {/* Preset Colors */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {colors.map((color, index) => (
                <motion.button
                  key={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleColorSelect(color)}
                  className={`
                    w-8 h-8 rounded-full border-2 transition-all duration-200
                    ${value === color ? 'border-gray-800 ring-2 ring-primary/30' : 'border-white hover:border-gray-300'}
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Custom Color */}
            {showCustom && (
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Custom Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={handleCustomColorChange}
                    className="w-10 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      onChange?.(e.target.value);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                    placeholder="#FF6B6B"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;