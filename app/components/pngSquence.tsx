import React, { useState, useEffect } from 'react';

interface PngSequenceProps {
    isActive: boolean;
    className?: string;
}

const PngSequenceAnimation: React.FC<PngSequenceProps> = ({ isActive, className }) => {
    const [frame, setFrame] = useState<number>(1);
    const numFrames = 60; // 총 프레임 수 정의
    const animationSpeed = 1000 / 30; // 30 FPS

    // 프리로딩 로직
    useEffect(() => {
        for (let i = 1; i <= numFrames; i++) {
            const img = new Image();
            img.src = `./trainerCard/TrainerCard${i.toString().padStart(5, '0')}.png`;
            img.onload = () => console.log(`Preloaded image ${i}`);
        }
    }, []);

    // 애니메이션 로직
    useEffect(() => {
        if (!isActive && frame < 30) {
            const timer = setTimeout(() => setFrame(frame + 1), animationSpeed);
            return () => clearTimeout(timer);
        } else if (isActive && frame < 60) {
            const timer = setTimeout(() => setFrame(frame + 1), animationSpeed);
            return () => clearTimeout(timer);
        } else if (!isActive && frame > 30) {
            const timer = setTimeout(() => setFrame(frame - 1), animationSpeed);
            return () => clearTimeout(timer);
        }
    }, [frame, isActive]);

    const formattedFrame = frame.toString().padStart(5, '0');
    const imagePath = `./trainerCard/TrainerCard${formattedFrame}.png`;

    return (
        <img className={className} src={imagePath} alt={`Frame ${frame}`} />
    );
};

export default PngSequenceAnimation;
