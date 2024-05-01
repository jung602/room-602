import React, { useState, useEffect, useRef } from 'react';

interface PngSequenceProps {
    isActive: boolean;
    className?: string;
}

const PngSequenceAnimation: React.FC<PngSequenceProps> = ({ isActive, className }) => {
    const [frame, setFrame] = useState<number>(30);
    const frameRef = useRef(frame);
    const animationRef = useRef<number>();

    const numFrames = 60; // 총 프레임 수

    // 이미지 프리로딩
    useEffect(() => {
        const preloadedImages = [];
        for (let i = 1; i <= numFrames; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(5, '0');
            img.src = `./trainerCard/TrainerCard${frameNumber}.png`;
            preloadedImages.push(img);
        }
    }, []);

    // 애니메이션 효과
    useEffect(() => {
        const updateFrame = () => {
            if (isActive && frameRef.current < numFrames) {
                setFrame(f => f + 1);
            } else if (!isActive && frameRef.current > 30) {
                setFrame(f => f - 1);
            }

            frameRef.current = frame; // 현재 프레임을 ref에 저장
            animationRef.current = requestAnimationFrame(updateFrame); // 다음 프레임을 요청
        };

        if (isActive) {
            animationRef.current = requestAnimationFrame(updateFrame);
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [isActive]);

    const formattedFrame = frame.toString().padStart(5, '0');
    const imagePath = `./trainerCard/TrainerCard${formattedFrame}.png`;

    return (
        <img className={className} src={imagePath} alt={`Frame ${frame}`} />
    );
};

export default PngSequenceAnimation;
