import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Card from '@/components/atoms/Card';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  variant, 
  onExport,
  className = '' 
}) => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [selectedSize, setSelectedSize] = useState('128');
  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    { id: 'png', label: 'PNG', description: 'Best for transparency', icon: 'Image' },
    { id: 'svg', label: 'SVG', description: 'Vector format, scalable', icon: 'Maximize' },
    { id: 'gif', label: 'GIF', description: 'For animated emojis', icon: 'Film', disabled: !variant?.isAnimated }
  ];

  const sizes = [
    { id: '64', label: '64×64', description: 'Small' },
    { id: '128', label: '128×128', description: 'Standard' },
    { id: '256', label: '256×256', description: 'Large' },
    { id: '512', label: '512×512', description: 'Extra Large' }
  ];

  const exportOptions = [
    { id: 'download', label: 'Download to Device', icon: 'Download', description: 'Save to your computer' },
    { id: 'copy', label: 'Copy to Clipboard', icon: 'Copy', description: 'Paste anywhere' },
    { id: 'share', label: 'Share Link', icon: 'Share', description: 'Send to friends' }
  ];

  const handleExport = async (exportType) => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const exportData = {
        format: selectedFormat,
        size: selectedSize,
        type: exportType,
        variant: variant
      };

      onExport?.(exportData);
      
      switch (exportType) {
        case 'download':
          toast.success('Emoji downloaded successfully!');
          break;
        case 'copy':
          toast.success('Emoji copied to clipboard!');
          break;
        case 'share':
          toast.success('Share link created!');
          break;
      }
      
      onClose();
    } catch (error) {
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900">
                Export Your Emoji
              </h2>
              <p className="text-gray-600 mt-1">
                Choose format and export options
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={onClose}
              disabled={isExporting}
            />
          </div>

          <div className="p-6 space-y-8">
            {/* Emoji Preview */}
            <div className="text-center">
              <div 
                className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl shadow-lg mb-4"
                style={{ backgroundColor: variant?.colors?.primary || '#FFE66D' }}
              >
                <span>
                  {variant?.mood === 'happy' && '😊'}
                  {variant?.mood === 'excited' && '🤩'}
                  {variant?.mood === 'cool' && '😎'}
                  {variant?.mood === 'love' && '😍'}
                  {variant?.mood === 'surprised' && '😮'}
                  {variant?.mood === 'chill' && '😌'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="primary" size="sm">
                  {variant?.mood || 'Custom'}
                </Badge>
                {variant?.isAnimated && (
                  <Badge variant="accent" size="sm" icon="Zap">
                    Animated
                  </Badge>
                )}
              </div>
            </div>

            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Choose Format
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formats.map((format) => (
                  <motion.button
                    key={format.id}
                    whileHover={{ scale: format.disabled ? 1 : 1.02 }}
                    whileTap={{ scale: format.disabled ? 1 : 0.98 }}
                    onClick={() => !format.disabled && setSelectedFormat(format.id)}
                    disabled={format.disabled}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${format.disabled 
                        ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                        : selectedFormat === format.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center mb-2">
                      <ApperIcon name={format.icon} size={20} className="mr-2 text-primary" />
                      <span className="font-medium text-gray-900">{format.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Choose Size
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSize(size.id)}
                    className={`
                      p-3 rounded-lg border-2 text-center transition-all
                      ${selectedSize === size.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-medium text-gray-900">{size.label}</div>
                    <div className="text-xs text-gray-600">{size.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Export Options
              </h3>
              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <Card
                    key={option.id}
                    hoverable
                    className="cursor-pointer"
                    onClick={() => handleExport(option.id)}
                    padding="md"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-lg mr-4">
                        <ApperIcon name={option.icon} size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.label}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <ApperIcon name="ChevronRight" size={20} className="text-gray-400" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          <AnimatePresence>
            {isExporting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 flex items-center justify-center rounded-2xl"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <ApperIcon name="Loader2" size={48} className="text-primary" />
                  </motion.div>
                  <p className="text-lg font-medium text-gray-900">Exporting your emoji...</p>
                  <p className="text-gray-600 mt-1">This won't take long</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportModal;