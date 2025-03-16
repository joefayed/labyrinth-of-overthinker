import { useState, useEffect } from 'react';
import ThoughtIsland from './ThoughtIsland';
import StarCharacter from './StarCharacter';
import InterconnectedPath from './InterconnectedPath';
import StarryBackground from './StarryBackground';
import EndPage from './EndPage';
import BubbleAnimation from './BubbleAnimation';

const LabyrinthGame = () => {
  // Game state
  const [playerPosition, setPlayerPosition] = useState({ x: 10, y: 50 }); // Start at left side of screen
  const [isMoving, setIsMoving] = useState(false);
  const [currentIslandIndex, setCurrentIslandIndex] = useState(0);
  const [revealedIslands, setRevealedIslands] = useState([0]); // Start with first island revealed
  const [activeIsland, setActiveIsland] = useState(0);
  const [pathProgress, setPathProgress] = useState({});
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);

  // Define thought islands - scattered widely across the virtual space
  const thoughtIslands = [
    { id: '0', position: { x: 10, y: 50 }, thought: "3ala fekra enta day2t yassmine w mkhleha msh mabsota" },
    { id: '1', position: { x: 120, y: 80 }, thought: "ma agy a3mel l Yasmine haga latefa as eny day2taha keter el fatra elly fatet w bel mara ashofha meday2a wala la" },
    { id: '2', position: { x: -30, y: 120 }, thought: "Wala la 3alshan matftkrsh eny bahawel atklem tany fi ay haga" },
    { id: '3', position: { x: 200, y: -20 }, thought: "bs mahy aslun momkn tkon wakhda mawkef 3alshan maslun fakra en you are still thinking about anything" },
    { id: '4', position: { x: -50, y: -40 }, thought: "aw meday2a mn akher message bema enaha mardetsh bs alet toskot 3alshan heya metrbya 3 marat w etksfet t7regny" },
    { id: '5', position: { x: 180, y: 150 }, thought: "khlas yb2a ana lazm aklemha ashr7lha en mafesh haga w eny odam rabena shayl kol haga mn dmaghy w bat3amel zy ma kona abl ay haga" },
    { id: '6', position: { x: 250, y: 70 }, thought: "bs enta olt da abl keda ya youssef w bringing anything up kol shwya msh haytfhem enak khayf 3ala ra7et-ha bel 3aks haytfehem enak obsessed" },
    { id: '7', position: { x: -250, y: 250 }, thought: "aiwa bs lw sa2ltaha one last last time w khalas" },
    { id: '8', position: { x: -250, y: -250 }, thought: "batal habal you will make things more awkward w hatday2ha 7atta lw heya msh meday2a menak w enta elly bt overthink" },
    { id: '9', position: { x: -10, y: -50 }, thought: "I wonder if I'm overthinking this... What if I make the wrong decision?" },
    { id: '10', position: { x: -20, y: -50 }, thought: "Aiwa Bs ana Walahy nefsy bs afhemha en all good w en mafesh haga w enaha heya teb2a merta7a w nefsy tefham en da elly fi dmaghy w neyty ughhh a3mel eh" },
  ];

  // Define connections between islands
  const connections = [
    { from: '0', to: '1' },
    { from: '0', to: '2' },
    { from: '1', to: '3' },
    { from: '1', to: '6' },
    { from: '2', to: '4' },
    { from: '2', to: '9' },
    { from: '3', to: '4' },
    { from: '3', to: '5' },
    { from: '4', to: '5' },
    { from: '4', to: '8' },
    { from: '5', to: '7' },
    { from: '5', to: '10' },
    { from: '6', to: '7' },
    { from: '7', to: '8' },
    { from: '8', to: '9' },
    { from: '9', to: '10' },
    { from: '10', to: '0' },
  ];

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isMoving) {
        moveToNextIsland();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMoving, currentIslandIndex]);

  // Move to the next island when space is pressed
  const moveToNextIsland = () => {
    const possibleConnections = connections.filter(conn => conn.from === thoughtIslands[currentIslandIndex].id);
    
    if (possibleConnections.length > 0) {
      const nextIslandId = possibleConnections[0].to;
      const nextIslandIndex = thoughtIslands.findIndex(island => island.id === nextIslandId);
      
      if (nextIslandIndex !== -1) {
        setIsMoving(true);
        
        const connectionKey = `${thoughtIslands[currentIslandIndex].id}-${nextIslandId}`;
        setPathProgress(prev => ({ ...prev, [connectionKey]: 0 }));
        
        const startTime = performance.now();
        const duration = 1500; // Increased duration for smoother animation
        
        // Easing function for smooth acceleration and deceleration
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const startPos = thoughtIslands[currentIslandIndex].position;
        const endPos = thoughtIslands[nextIslandIndex].position;
        
        // Animate both player and path using requestAnimationFrame
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);
          
          // Update player position
          const newX = startPos.x + (endPos.x - startPos.x) * easedProgress;
          const newY = startPos.y + (endPos.y - startPos.y) * easedProgress;
          setPlayerPosition({ x: newX, y: newY });
          
          // Update path progress
          setPathProgress(prev => ({
            ...prev,
            [connectionKey]: easedProgress
          }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsMoving(false);
            setCurrentIslandIndex(nextIslandIndex);
            setActiveIsland(nextIslandIndex);
            
            if (!revealedIslands.includes(nextIslandIndex)) {
              setRevealedIslands(prev => [...prev, nextIslandIndex]);
            }
          }
        };
        
        requestAnimationFrame(animate);
      }
    }
  };

  // Handle island click
  const handleIslandClick = (islandId) => {
    const clickedIndex = thoughtIslands.findIndex(island => island.id === islandId);
    if (revealedIslands.includes(clickedIndex)) {
      setActiveIsland(clickedIndex);
    }
  };

  // Check if player has reached the final island (ID 10)
  useEffect(() => {
    if (currentIslandIndex === thoughtIslands.findIndex(island => island.id === '10') && !gameCompleted) {
      setShowBubbles(true);
      setTimeout(() => {
        setShowBubbles(false);
        setGameCompleted(true);
      }, 3000); // Show bubbles for 3 seconds before transitioning to EndPage
    }
  }, [currentIslandIndex, thoughtIslands, gameCompleted]);

  // Update camera position to follow player
  useEffect(() => {
    const targetX = -playerPosition.x + 50; // Center horizontally
    const targetY = -playerPosition.y + 50; // Center vertically
    
    setCameraOffset({
      x: targetX,
      y: targetY
    });
  }, [playerPosition]);

  if (gameCompleted) {
    return <EndPage />;
  }

  return (
    <div className="labyrinth-game" style={{ 
      width: '100%', 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <BubbleAnimation isVisible={showBubbles} />
      <StarryBackground />
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `translate(${cameraOffset.x}%, ${cameraOffset.y}%)`,
        transition: 'transform 0.5s ease-out'
      }}>
        {/* Render connections between islands */}
        {connections.map(conn => {
        const startIsland = thoughtIslands.find(island => island.id === conn.from);
        const endIsland = thoughtIslands.find(island => island.id === conn.to);
        const connectionKey = `${conn.from}-${conn.to}`;
        const progress = pathProgress[connectionKey] || 0;
        const isRevealed = 
          revealedIslands.includes(thoughtIslands.findIndex(island => island.id === conn.from)) && 
          revealedIslands.includes(thoughtIslands.findIndex(island => island.id === conn.to));
        
        return (
          <InterconnectedPath
            key={connectionKey}
            startPosition={startIsland.position}
            endPosition={endIsland.position}
            isRevealed={isRevealed}
            progress={progress}
          />
        );
      })}
      
      {/* Render thought islands */}
      {thoughtIslands.map((island, index) => (
        <ThoughtIsland
          key={island.id}
          id={island.id}
          position={island.position}
          thought={island.thought}
          isActive={activeIsland === index}
          isRevealed={revealedIslands.includes(index)}
          onClick={() => handleIslandClick(island.id)}
        />
      ))}
      
      {/* Render player character */}
      <StarCharacter position={playerPosition} isMoving={isMoving} />
      
      {/* Game instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}>
        Press <span style={{ fontWeight: 'bold', color: '#FFD700' }}>SPACE</span> to float to the next thought
      </div>
    </div>
    </div>
  );
};

export default LabyrinthGame;