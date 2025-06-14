import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
  showRetry = true,
  icon = 'AlertTriangle',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="bg-error/10 p-4 rounded-full mb-6"
      >
        <ApperIcon name={icon} size={48} className="text-error" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-heading font-bold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6 max-w-md break-words"
      >
        {message}
      </motion.p>

      {showRetry && onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onRetry}
            icon="RefreshCw"
            variant="primary"
          >
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ErrorState;