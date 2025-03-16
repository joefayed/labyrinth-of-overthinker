import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './ThoughtIsland.css';

const ThoughtIsland = ({ id, position, thought, isActive, isRevealed, onClick }) => {
  // Animation variants for the island
  const bubbleVariants = {
    idle: {
      scale: [1, 1.05, 1],
      opacity: isRevealed ? 1 : 0.7,
      transition: {
        scale: {
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        },
      },
    },
    active: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Animation variants for the thought text
  const thoughtTextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="thought-island"
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '320px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: isActive ? 2 : 1,
      }}
      variants={bubbleVariants}
      animate={isActive ? 'active' : 'idle'}
      onClick={onClick}
      data-id={id}
    >
      <div className="bubble" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 55%, rgba(176, 218, 255, 0.95), rgba(176, 218, 255, 0.5) 40%, rgba(176, 218, 255, 0.3) 60%, rgba(176, 218, 255, 0) 70%)',
        boxShadow: isActive
          ? '0 0 25px rgba(176, 218, 255, 0.7), inset 0 0 25px rgba(176, 218, 255, 0.7)'
          : '0 0 15px rgba(176, 218, 255, 0.4), inset 0 0 15px rgba(176, 218, 255, 0.4)',
        animation: 'bubble-pulse 3s ease-in-out infinite',
      }} />
      <div className="bubble-shine" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 40%)',
        transform: 'rotate(-30deg)',
      }} />
      {isActive && (
        <motion.div
          className="thought-text"
          variants={thoughtTextVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '100%',
            transform: 'translate(-50%, -10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '15px 20px',
            borderRadius: '20px',
            maxWidth: '280px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 3,
            pointerEvents: 'none',
            fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#2c3e50',
            letterSpacing: '0.3px'
          }}
        >
          {thought}
        </motion.div>
      )}
    </motion.div>
  );
};

ThoughtIsland.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  thought: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ThoughtIsland;