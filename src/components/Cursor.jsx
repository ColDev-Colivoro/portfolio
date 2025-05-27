
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setCursorVariant('click');
    const mouseUp = () => setCursorVariant('default');
    
    const handleLinkHover = () => setCursorVariant('hover');
    const handleLinkLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(255, 107, 69, 0.1)',
      border: '1px solid rgba(255, 107, 69, 0.3)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 107, 69, 0.2)',
      border: '1px solid rgba(255, 107, 69, 0.5)',
      transition: {
        type: 'spring',
        mass: 0.6
      }
    }
  };

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="cursor-ring hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          mass: 0.2
        }}
        style={{
          height: 8,
          width: 8,
          backgroundColor: 'rgba(255, 107, 69, 0.8)',
        }}
      />
    </>
  );
};

export default Cursor;
