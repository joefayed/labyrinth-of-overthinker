import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const StarCharacter = ({ position, isMoving }) => {
  const characterVariants = {
    idle: {
      y: [0, -8, 0],
      scale: [1, 1.02, 1],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
        scale: {
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        },
      },
    },
    moving: {
      scale: [1, 1.1, 1],
      filter: ['brightness(1.2)', 'brightness(1.5)', 'brightness(1.2)'],
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  // SVG paths for the Ori-inspired character
  const bodyPath = 'M12 3c-1.5 0-2.7 0.3-3.5 0.8C7.7 4.3 7 5 6.5 5.8c-0.5 0.8-0.8 1.7-0.8 2.7 0 1 0.3 2 0.8 2.8 0.5 0.8 1.2 1.5 2 2 0.8 0.5 1.7 0.8 2.7 0.8s1.9-0.3 2.7-0.8c0.8-0.5 1.5-1.2 2-2 0.5-0.8 0.8-1.7 0.8-2.8 0-1-0.3-2-0.8-2.7C17.3 5 16.6 4.3 15.8 3.8 15 3.3 13.7 3 12 3z';
  const glowPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
  const earLeft = 'M9 6.5C9 7.33 8.33 8 7.5 8S6 7.33 6 6.5 6.67 5 7.5 5 9 5.67 9 6.5z';
  const earRight = 'M18 6.5c0 0.83-0.67 1.5-1.5 1.5S15 7.33 15 6.5 15.67 5 16.5 5 18 5.67 18 6.5z';

  return (
    <motion.div
      className="ori-character"
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '60px',
        height: '60px',
        zIndex: 10,
      }}
      variants={characterVariants}
      animate={isMoving ? 'moving' : 'idle'}
    >
      {/* Outer glow effect */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          filter: 'blur(8px)',
          opacity: 0.6,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d={glowPath} fill="#4FC3F7" />
        </svg>
      </motion.div>

      {/* Main character */}
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(79, 195, 247, 0.8))',
        }}
      >
        <path d={bodyPath} fill="#E1F5FE" />
        <path d={earLeft} fill="#E1F5FE" />
        <path d={earRight} fill="#E1F5FE" />
      </svg>

      {/* Inner glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(79, 195, 247, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

StarCharacter.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isMoving: PropTypes.bool.isRequired,
};

export default StarCharacter;