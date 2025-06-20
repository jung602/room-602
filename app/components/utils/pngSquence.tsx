import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PngSequenceProps {
    isActive: boolean;
    className?: string;
}

const PngSequenceAnimation: React.FC<PngSequenceProps> = ({ isActive, className }) => {
    const [frame, setFrame] = useState<number>(40);
    const numFrames = 60;
    const animationSpeed = 1000 / 30;

    useEffect(() => {
        const preloadImages = () => {
            for (let i = 1; i <= numFrames; i++) {
                const img = document.createElement('img');
                img.src = `./trainerCard/TrainerCard${i.toString().padStart(5, '0')}.png`;
                img.onload = () => console.log(`Preloaded image ${i}`);
            }
        };
        preloadImages();
    }, [numFrames]);

    useEffect(() => {
        if (isActive && frame < 60) {
            const timer = setTimeout(() => setFrame(frame + 1), animationSpeed);
            return () => clearTimeout(timer);
        } else if (!isActive && frame > 35) {
            const timer = setTimeout(() => setFrame(frame - 1), animationSpeed);
            return () => clearTimeout(timer);
        }
    }, [frame, isActive, animationSpeed]);

    const formattedFrame = frame.toString().padStart(5, '0');
    const imagePath = `./trainerCard/TrainerCard${formattedFrame}.png`;

    return (
        <Image 
            className={className}
            src={imagePath} 
            alt={`Frame ${frame}`}
            width={1000}
            height={1000}
            style={{
                maxWidth: '100%',
                height: 'auto'
            }}
            priority
        />
    );
};

export default PngSequenceAnimation;
