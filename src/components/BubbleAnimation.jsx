import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const BubbleAnimation = ({ isVisible }) => {
  // Generate 100 bubbles with random properties
  const bubbles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50, // Random size between 50-150px
    direction: {
      x: (Math.random() - 0.5) * 300, // Random x direction
      y: (Math.random() - 0.5) * 300, // Random y direction
    },
    duration: Math.random() * 2.5 + 1.5, // Random duration between 1.5-4s
    delay: Math.random() * 0.8, // Random delay up to 0.8s
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{
                opacity: 1,
                scale: 0,
                x: '50vw',
                y: '50vh',
              }}
              animate={{
                opacity: 0,
                scale: 1,
                x: `calc(50vw + ${bubble.direction.x}vw)`,
                y: `calc(50vh + ${bubble.direction.y}vh)`,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: bubble.size,
                height: bubble.size,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 55%, rgba(176, 218, 255, 0.95), rgba(176, 218, 255, 0.5) 40%, rgba(176, 218, 255, 0.3) 60%, rgba(176, 218, 255, 0) 70%)',
                boxShadow: '0 0 15px rgba(176, 218, 255, 0.4), inset 0 0 15px rgba(176, 218, 255, 0.4)',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

BubbleAnimation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default BubbleAnimation;