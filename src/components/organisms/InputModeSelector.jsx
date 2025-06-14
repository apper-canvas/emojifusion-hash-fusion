import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const InputModeSelector = ({ onModeSelect, selectedMode, className = '' }) => {
  const modes = [
    {
      id: 'draw',
      title: 'Draw',
      description: 'Create emojis from your doodles',
      icon: 'PenTool',
      color: 'from-primary to-primary/80',
      iconBg: 'bg-primary/10'
    },
    {
      id: 'photo',
      title: 'Photo',
      description: 'Turn selfies into custom emojis',
      icon: 'Camera',
      color: 'from-secondary to-secondary/80',
      iconBg: 'bg-secondary/10'
    },
    {
      id: 'text',
      title: 'Text',
      description: 'Generate from text prompts',
      icon: 'Type',
      color: 'from-accent to-accent/80', 
      iconBg: 'bg-accent/10'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-heading font-bold text-gray-900 mb-2"
        >
          How do you want to create?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          Choose your preferred input method to get started
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, index) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card
              hoverable
              className={`
                relative overflow-hidden cursor-pointer text-center
                ${selectedMode === mode.id ? 'ring-4 ring-primary/30 shadow-xl' : ''}
              `}
              onClick={() => onModeSelect(mode.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-5`} />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 ${mode.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <ApperIcon name={mode.icon} size={32} className="text-primary" />
                </motion.div>

                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {mode.title}
                </h3>
                
                <p className="text-gray-600 break-words">
                  {mode.description}
                </p>

                {selectedMode === mode.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-primary text-white rounded-full p-1"
                  >
                    <ApperIcon name="Check" size={16} />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InputModeSelector;