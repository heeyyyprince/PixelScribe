/**
 * Animation utilities for PixelScribe
 * This file contains reusable animation variants for Framer Motion
 */

// Basic fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Fade in with y-axis movement
export const fadeInUp = {
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

// Fade in with scale
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 24 
    }
  }
};

// Staggered children animation
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren,
      delayChildren
    } 
  }
});

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

// Tap animations
export const tapScale = {
  scale: 0.95
};

// Float animation
export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
};

// Pulse animation
export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
};

// Rotate animation
export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear'
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Button animations
export const buttonAnimation = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Image animations
export const imageAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.5 } 
  },
  exit: { 
    scale: 0.8, 
    opacity: 0, 
    transition: { duration: 0.2 } 
  }
};

// List item animations
export const listItemAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 24 
    }
  }
};

// Decorative background element animations
export const decorativeAnimation = {
  initial: { opacity: 0.7, scale: 0.9 },
  animate: {
    opacity: [0.7, 0.4, 0.7],
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
};