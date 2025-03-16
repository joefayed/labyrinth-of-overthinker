import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const InterconnectedPath = ({ startPosition, endPosition, isRevealed, progress }) => {
  // Calculate the path between two islands
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: progress, 
      opacity: isRevealed ? 0.6 : 0.2,
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut' 
      }
    }
  };

  // Calculate control points for a curved path
  const midX = (startPosition.x + endPosition.x) / 2;
  const midY = (startPosition.y + endPosition.y) / 2;
  
  // Add some curvature to the path
  const curveOffset = 20; // Adjust for more or less curve
  const controlX = midX + (Math.random() * 2 - 1) * curveOffset;
  const controlY = midY + (Math.random() * 2 - 1) * curveOffset;

  // Create a curved path using quadratic bezier
  const pathData = `M ${startPosition.x} ${startPosition.y} Q ${controlX} ${controlY}, ${endPosition.x} ${endPosition.y}`;

  return (
    <motion.svg
      className="interconnected-path"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <motion.path
        d={pathData}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="2"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
};

InterconnectedPath.propTypes = {
  startPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  endPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isRevealed: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
};

export default InterconnectedPath;