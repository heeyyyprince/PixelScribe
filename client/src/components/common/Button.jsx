import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Button component for consistent styling across the application
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, text)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.to - If provided, renders as Link component
 * @param {string} props.href - If provided, renders as anchor tag
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.leftIcon - Icon to display before text
 * @param {React.ReactNode} props.rightIcon - Icon to display after text
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  fullWidth = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  // Base classes for all button variants
  const baseClasses = 'font-medium rounded-full inline-flex items-center justify-center transition-all';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm hover:shadow',
    outline: 'border border-dark-200 hover:border-primary-500 bg-white hover:bg-primary-50 text-dark-800 hover:text-primary-700',
    text: 'text-primary-600 hover:text-primary-800 hover:bg-primary-50 bg-transparent'
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${widthClass} ${className}`;
  
  // Animation variants
  const buttonAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
      >
        <Link to={to} className={buttonClasses} {...props}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </Link>
      </motion.div>
    );
  }
  
  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
      >
        <a href={href} className={buttonClasses} {...props}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </a>
      </motion.div>
    );
  }
  
  // Render as button by default
  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled}
      initial="rest"
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      variants={buttonAnimation}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button;