import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value?.length > 0);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const filteredProps = { ...props };
  delete filteredProps.label;
  delete filteredProps.error;
  delete filteredProps.icon;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={20} />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200
            ${icon ? 'pl-12' : 'pl-4'}
            ${error 
              ? 'border-error focus:border-error focus:ring-error/20' 
              : 'border-gray-200 focus:border-primary focus:ring-primary/20'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-4 text-gray-900 placeholder-gray-500
          `}
          placeholder={!label ? placeholder : ''}
          {...filteredProps}
        />

        {label && (
          <motion.label
            initial={false}
            animate={{
              top: focused || hasValue ? '0.5rem' : '50%',
              fontSize: focused || hasValue ? '0.75rem' : '1rem',
              color: focused ? (error ? '#FF6B6B' : '#FF6B6B') : '#6B7280'
            }}
            className={`
              absolute left-4 transform -translate-y-1/2 pointer-events-none
              transition-all duration-200 bg-white px-2 rounded
              ${icon ? 'left-12' : 'left-4'}
            `}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </motion.label>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error flex items-center"
        >
          <ApperIcon name="AlertCircle" size={16} className="mr-1 flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default Input;