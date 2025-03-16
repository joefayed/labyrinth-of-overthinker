import './StarryBackground.css';
const generateStars = (count) => {
    let stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      stars.push(`${x}px ${y}px #FFF`);
    }
    return stars.join(', ');
  };
  
  document.documentElement.style.setProperty('--small-stars-shadow', generateStars(200));
  document.documentElement.style.setProperty('--medium-stars-shadow', generateStars(100));
  document.documentElement.style.setProperty('--large-stars-shadow', generateStars(50));

const StarryBackground = () => {
  return (
    <div className="starry-background">
      <div className="stars-small"></div>
      <div className="stars-medium"></div>
      <div className="stars-large"></div>
    </div>
  );
};

export default StarryBackground;