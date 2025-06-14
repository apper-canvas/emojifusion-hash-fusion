import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  elevated = true,
  padding = 'md',
  onClick,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const baseClasses = `
    bg-white rounded-2xl transition-all duration-200 max-w-full overflow-hidden
    ${elevated ? 'shadow-lg' : 'border border-gray-100'}
    ${hoverable ? 'cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  const filteredProps = { ...props };
  delete filteredProps.hoverable;
  delete filteredProps.elevated;
  delete filteredProps.padding;

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        onClick={onClick}
        {...filteredProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick} {...filteredProps}>
      {children}
    </div>
  );
};

export default Card;