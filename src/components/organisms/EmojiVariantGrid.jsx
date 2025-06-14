import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

const EmojiVariantGrid = ({ 
  variants = [], 
  selectedVariant, 
  onVariantSelect, 
  loading = false,
  className = '' 
}) => {
  const handleVariantClick = (variant, index) => {
    onVariantSelect?.(variant, index);
    toast.success(`Selected ${variant.mood} variant!`);
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <LoadingSpinner size="xl" text="Generating amazing emojis..." />
          
          {/* Sparkle particles during generation */}
          <div className="relative mt-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle-particle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 100 - 50
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: '50%',
                  top: '50%'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variants.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <ApperIcon name="Sparkles" size={48} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No variants generated yet</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Choose Your Favorite
        </h3>
        <p className="text-gray-600">
          AI generated {variants.length} unique variants for you
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <Card
              hoverable
              className={`
                relative text-center cursor-pointer transition-all duration-200
                ${selectedVariant === index 
                  ? 'ring-4 ring-primary/30 shadow-xl scale-105' 
                  : 'hover:shadow-lg'
                }
              `}  
              onClick={() => handleVariantClick(variant, index)}
              padding="md"
            >
              {/* Emoji Preview */}
              <div className="relative mb-4">
                <div 
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl shadow-sm"
                  style={{ backgroundColor: variant.colors?.primary || '#FFE66D' }}
                >
                  {/* Mock emoji display */}
                  <span className="text-2xl">
                    {variant.mood === 'happy' && '😊'}
                    {variant.mood === 'excited' && '🤩'}
                    {variant.mood === 'cool' && '😎'}
                    {variant.mood === 'love' && '😍'}
                    {variant.mood === 'surprised' && '😮'}
                    {variant.mood === 'chill' && '😌'}
                  </span>
                </div>
                
                {variant.isAnimated && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge variant="accent" size="sm">
                      <ApperIcon name="Zap" size={12} className="mr-1" />
                      Animated
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Mood Label */}
              <h4 className="font-medium text-gray-900 capitalize mb-2">
                {variant.mood}
              </h4>

              {/* Color Palette */}
              <div className="flex justify-center space-x-1">
                {Object.values(variant.colors || {}).slice(0, 3).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedVariant === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 bg-primary text-white rounded-full p-1"
                >
                  <ApperIcon name="Check" size={16} />
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmojiVariantGrid;