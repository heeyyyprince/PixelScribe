import React from 'react';
import { motion } from 'framer-motion';

/**
 * Card component for consistent styling across the application
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Card variant (default, elevated, outlined)
 * @param {boolean} props.hoverable - Whether card should have hover effects
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional classes
 */
const Card = ({
  variant = 'default',
  hoverable = false,
  children,
  className = '',
  ...props
}) => {
  // Base classes for all card variants
  const baseClasses = 'rounded-xl overflow-hidden';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white shadow-sm',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-dark-200'
  };
  
  // Hover classes
  const hoverClasses = hoverable ? 'transition-all hover:shadow-lg hover:-translate-y-1' : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  // Animation variants
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      }
    }
  };
  
  return (
    <motion.div
      className={cardClasses}
      variants={cardAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;