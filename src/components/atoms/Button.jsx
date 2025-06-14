import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary/50 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary/50 shadow-lg hover:shadow-xl",
    accent: "bg-accent hover:bg-accent/90 text-gray-900 focus:ring-accent/50 shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/5 focus:ring-primary/50",
    success: "bg-success hover:bg-success/90 text-white focus:ring-success/50 shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full", 
    lg: "px-8 py-4 text-lg rounded-full",
    xl: "px-10 py-5 text-xl rounded-full"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };

  const filteredProps = { ...props };
  delete filteredProps.variant;
  delete filteredProps.size;
  delete filteredProps.icon;
  delete filteredProps.iconPosition;
  delete filteredProps.loading;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...filteredProps}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin mr-2" 
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-2" 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="ml-2" 
        />
      )}
    </motion.button>
  );
};

export default Button;