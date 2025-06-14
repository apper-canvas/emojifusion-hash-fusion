import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true,
  className = '',
  variant = 'primary'
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    gray: 'text-gray-500'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={colors[variant]}
      >
        <ApperIcon name="Loader2" size={sizes[size]} />
      </motion.div>
      
      {showText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`mt-3 ${textSizes[size]} ${colors[variant]} font-medium`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;