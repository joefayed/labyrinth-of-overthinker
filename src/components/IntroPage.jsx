import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import StarryBackground from './StarryBackground';
import './IntroPage.css';

const IntroPage = ({ onStart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [buttonClicked, setButtonClicked] = useState(false);

  const messageLines = [
    "Hello Yasmine :D",
    "You probably thinking, ughhh another episode of Youssef",
    "and you would probably be right, this is cringe",
    "but this is not an appology",
    "this is not an excuse",
    "and dw i am not looking to reopen any conversation or anything",
    "but i am here to tell you something about my brain",
    "I have a lot of thoughts that are hard to process",
    "and sometimes they just don't make sense",
    "but sometimes they do",
    "It's just that my overthinking brain needs a bit more closure",
    "and sometimes things just are easier to be told in a written form than spoken",
    "and writing this out helps me process everything better.",
    "Feel free to read this whenever (or never) - there's no response needed.",
    "I just wanted to share how my mind works with this situation.",
    "not to prove anything, just to clarify why i do very very stupid things for a smart person",
    "and as for why you exactly hafhmek fel akher"
  ];


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentLineIndex < messageLines.length - 1) {
        setCurrentLineIndex(prev => prev + 1);
        setShowMessage(true);
      } else if (e.key === 'ArrowUp' && currentLineIndex > 0) {
        setCurrentLineIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentLineIndex === -1) {
        // Initialize the message display when first pressing down arrow
        setShowMessage(true);
        setCurrentLineIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLineIndex, messageLines.length]);

  return (
    <div className="intro-page">
      <StarryBackground />
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="intro-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          Labyrinth of the Overthinker
        </motion.h1>
        {/* Down arrow indicator - only shown when at start of messages */}
        {currentLineIndex === -1 && (
          <motion.div
            className="down-arrow-indicator"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            style={{
              marginBottom: '1rem',
              color: '#fff',
              fontSize: '2rem',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div>Press ↓</div>
              <div style={{ fontSize: '2.5rem' }}>↓</div>
            </div>
          </motion.div>
        )}
        <motion.div 
            className="intro-message"
            initial={{ opacity: 0, height: 0 }}
            animate={{
                opacity: showMessage ? 1 : 0,
                height: showMessage ? 'auto' : 0,
                marginBottom: showMessage ? '2rem' : 0
            }}
            transition={{ duration: 0.5 }}
            style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                minHeight: '10rem', // adjust based on text size
            }}
            >
            {messageLines.map((line, index) => {
                const positionOffset = (index - currentLineIndex) * 50; // adjust vertical spacing as needed
                let opacity = 0;
                let blur = '10px';
                let scale = 0.9;

                if (index === currentLineIndex) {
                opacity = 1;
                blur = '0px';
                scale = 1;
                } else if (index === currentLineIndex - 1 || index === currentLineIndex + 1) {
                opacity = 0.5;
                blur = '4px';
                scale = 0.95;
                }

                return (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: positionOffset, filter: 'blur(10px)', scale: 0.9 }}
                    animate={{
                    opacity,
                    y: positionOffset,
                    filter: `blur(${blur})`,
                    scale,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    margin: 0,
                    padding: '0 1rem',
                    transform: 'translateY(-50%)',
                    }}
                >
                    {line}
                </motion.p>
                );
            })}
        </motion.div>
        {currentLineIndex >= messageLines.length - 1 && (
          <motion.button
            className="start-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              setButtonClicked(true);
              setShowMessage(true);
              setCurrentLineIndex(0);
              // Increase timeout to allow user to see the messages
              setTimeout(() => {
                setButtonClicked(false);
                // Only navigate to the game after showing all messages
                if (currentLineIndex >= messageLines.length - 1) {
                  onStart();
                }
              }, 300);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95, y: 10 }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: buttonClicked ? 10 : 0
            }}
            transition={{ 
              opacity: { delay: 1, duration: 1 },
              y: { duration: 0.1 }
            }}
          >
            Start the Journey
            <div className={`button-glow ${isHovered ? 'hovered' : ''}`} />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default IntroPage;