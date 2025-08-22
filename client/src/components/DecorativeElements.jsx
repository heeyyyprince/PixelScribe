import React from 'react';
import { motion } from 'framer-motion';
import { decorativeAnimation, floatAnimation, rotateAnimation } from '../utils/animations';

/**
 * Decorative elements to enhance the visual appeal of the application
 * These elements add dynamic animations to various parts of the UI
 */
export const FloatingCircle = ({ size = 100, color = 'primary', opacity = 0.1, top, left, right, bottom, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-${color}-500`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        filter: 'blur(30px)',
        zIndex: -1
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity,
        y: [0, -20, 0],
        transition: {
          y: {
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
            delay
          },
          opacity: {
            duration: 1,
            delay: delay * 0.5
          }
        }
      }}
    />
  );
};

export const RotatingShape = ({ shape = 'circle', size = 80, color = 'secondary', top, left, right, bottom, opacity = 0.15, delay = 0 }) => {
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'triangle',
    blob: 'blob'
  };

  const shapeClass = shapes[shape] || shapes.circle;

  return (
    <motion.div
      className={`absolute ${shapeClass} bg-${color}-500`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        zIndex: -1
      }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity,
        rotate: 360,
        transition: {
          rotate: {
            repeat: Infinity,
            duration: 20 + delay * 5,
            ease: 'linear'
          },
          opacity: {
            duration: 1,
            delay: delay * 0.5
          }
        }
      }}
    />
  );
};

export const PulsingDot = ({ size = 10, color = 'primary', top, left, right, bottom, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full bg-${color}-500`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        zIndex: -1
      }}
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.5, 0.8, 0.5],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
          delay
        }
      }}
    />
  );
};

export const FloatingGrid = ({ columns = 3, rows = 3, size = 5, gap = 20, color = 'dark', top, left, right, bottom, opacity = 0.1 }) => {
  const dots = [];
  
  for (let i = 0; i < columns * rows; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;
    
    dots.push(
      <motion.div
        key={i}
        className={`absolute rounded-full bg-${color}-500`}
        style={{
          width: size,
          height: size,
          top: `calc(${top || 0} + ${row * gap}px)`,
          left: `calc(${left || 0} + ${col * gap}px)`,
          opacity
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity,
          y: [0, -5, 0],
          transition: {
            y: {
              repeat: Infinity,
              duration: 2 + (i % 3),
              ease: 'easeInOut',
              delay: i * 0.1
            },
            opacity: {
              duration: 1,
              delay: i * 0.05
            }
          }
        }}
      />
    );
  }
  
  return dots;
};

export const BackgroundGradient = ({ colors = ['primary', 'secondary'], opacity = 0.05 }) => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
    >
      <motion.div
        className={`absolute -inset-[100px] bg-gradient-to-br from-${colors[0]}-300/30 via-transparent to-${colors[1]}-300/30 rounded-full`}
        style={{ opacity }}
        {...decorativeAnimation}
      />
    </motion.div>
  );
};

export const AnimatedBackground = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <FloatingCircle size={300} color="primary" top="-100px" right="-100px" opacity={0.08} />
      <FloatingCircle size={200} color="secondary" bottom="-50px" left="-50px" opacity={0.05} delay={1} />
      <RotatingShape shape="square" size={150} top="30%" right="-30px" delay={0.5} />
      <RotatingShape shape="circle" size={100} bottom="20%" left="10%" delay={1.5} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};