import React, { useState, useEffect } from 'react';

interface PngSequenceProps {
    isActive: boolean; // isActive 프로퍼티 추가
    
    className?: string;
  }
  

const PngSequenceAnimation: React.FC<PngSequenceProps> = ({isActive, className}) => {
    const [frame, setFrame] = useState<number>(1);
    const animationSpeed = 1000 / 30; // 30 FPS
  
    useEffect(() => {
      let animationFrameId: ReturnType<typeof setTimeout>;
  
      if (!isActive && frame < 30) {
        animationFrameId = setTimeout(() => setFrame(frame + 1), animationSpeed);
      } else if (isActive && frame < 60) {
        animationFrameId = setTimeout(() => setFrame(frame + 1), animationSpeed);
      } else if (!isActive && frame > 30) {
        animationFrameId = setTimeout(() => setFrame(frame - 1), animationSpeed);
      }
  
      return () => clearTimeout(animationFrameId);
    }, [frame, isActive]);
  
    const formattedFrame = frame.toString().padStart(5, '0');
    const imagePath = `/trainerCard/TrainerCard${formattedFrame}.png`;
  
    return (
        <img className={className} src={imagePath} alt={`Frame ${frame}`} />
    );
  };
  
  export default PngSequenceAnimation;