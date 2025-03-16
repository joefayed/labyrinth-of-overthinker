import { motion } from 'framer-motion';
import { useEffect } from 'react';
import StarryBackground from './StarryBackground';
import './EndPage.css';

const EndPage = () => {
  const bubbleCount = 50; // Number of bubbles to create
  const bubbles = Array.from({ length: bubbleCount });

  // Generate random positions and delays for each bubble
  const generateBubbleProps = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 0.5,
  });

  return (
    <div className="end-page">
      <StarryBackground />
      <motion.div
        className="end-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="end-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          Why I am saying this
        </motion.h1>
        <motion.p
          className="end-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I just wanted to say thank you, thank you for showing me how to be happy, 
          thank you for always keeping up with my bullshit w anxiety, You were never obligated to do that, yet you did. I know it's not ideal, and I'm genuinely trying to change this part of me because that's not who I normally am.
          anyway thank you for everything w Walahy walahy walahy I appreciate it w i know enty gety 3ala nafsek keter w 
          knowwing that bgd kills me, you will always be a teammate and a friend.
        </motion.p>
        <motion.p
          className="end-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginTop: '1rem' }}
        >
          I am not saying I am a bad person or anything, 
          i know my worth but i do know my flaws too w ego kills friendships, 
          ana fe3lan fe3lan mafesh fi dmaghy ay haga w afalt kol el hwarat elly fatet w msh bafkr feha 
          wala 7ata hatet ay hope "tab3an tab3an hope in rebena mawgod fi kol haga w ne3m bellah" bs enty 3arfa asdy eh :D, 
          bel nesbaly ana fe3lan bat3amel k Yasmine zy lama kona abl ay haga w elly hwa rabena el shahed 3ala kalamy 
          msh 3ayz ay haga f from my end mafesh ay 7asaseya bel 3aks this chapter is closed w ray7tny enaha et2flet aslun 
          msh 3ayzek enty bas yb2a feh ay 7asasseya mn ne7ytek w I don't want you to feel any awkwardness; I just want you to be comfortable.
        </motion.p>
        <motion.p
          className="end-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginTop: '1rem' }}
        >
          msh 3aref hatsd2eny wala la bs ana fe3lan msh haft7 wala ageb seret ay haga tany 3alshan ana keda fe3lan olt kol elly 3andy, And I know you might be thinking "why is he making this?" but trust me, this is just my way of processing things and making sure you understand that I genuinely appreciate our friendship and want to maintain it in a healthy way. "Plus tab3an eny geek w b7eb el code :D"
        </motion.p>
        {/* Animated bubbles */}
        <div className="bubbles-container">
          {bubbles.map((_, index) => {
            const props = generateBubbleProps();
            return (
              <motion.div
                key={index}
                className="bubble"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: props.x,
                  y: props.y,
                  scale: props.scale,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: props.delay,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default EndPage;