import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  animated = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    info: 'bg-info/10 text-info border-info/20',
    gray: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const baseClasses = `
    inline-flex items-center font-medium rounded-full border
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  const BadgeContent = () => (
    <>
      {icon && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-1" 
        />
      )}
      {children}
    </>
  );

  if (animated) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={baseClasses}
        {...props}
      >
        <BadgeContent />
      </motion.span>
    );
  }

  return (
    <span className={baseClasses} {...props}>
      <BadgeContent />
    </span>
  );
};

export default Badge;