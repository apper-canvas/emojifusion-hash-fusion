import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ 
  title = 'No items found',
  description = 'Get started by creating your first item',
  actionLabel = 'Create Item',
  onAction,
  icon = 'Package',
  showAction = true,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="bg-primary/10 p-6 rounded-full mb-6"
      >
        <ApperIcon name={icon} size={48} className="text-primary" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-heading font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-md break-words"
      >
        {description}
      </motion.p>

      {showAction && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={onAction}
            variant="primary"
            size="lg"
            icon="Plus"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;