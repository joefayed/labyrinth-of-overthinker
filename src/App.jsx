import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import LabyrinthGame from './components/LabyrinthGame';
import IntroPage from './components/IntroPage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <IntroPage onStart={() => setGameStarted(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <LabyrinthGame />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
