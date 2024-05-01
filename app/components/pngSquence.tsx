import React, { useState, useEffect } from 'react';

interface PngSequenceProps {
    isActive: boolean;
    className?: string;
}

const PngSequenceAnimation: React.FC<PngSequenceProps> = ({ isActive, className }) => {
    const [frame, setFrame] = useState<number>(30); // 초기 프레임 설정을 30으로 설정
    const animationSpeed = 1000 / 30; // 30 FPS

    // 모든 이미지를 미리 로딩
    useEffect(() => {
        const preloadedImages = [];
        for (let i = 1; i <= 60; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(5, '0');
            img.src = `./trainerCard/TrainerCard${frameNumber}.png?${new Date().getTime()}`; // 캐싱 방지를 위한 타임스탬프 추가
            preloadedImages.push(img);
        }
    }, []);

    // 애니메이션을 위한 useEffect
    useEffect(() => {
        let animationFrameId: ReturnType<typeof setTimeout>;

        if (isActive && frame < 60) {
            animationFrameId = setTimeout(() => setFrame(frame + 1), animationSpeed);
        } else if (!isActive && frame > 30) {
            animationFrameId = setTimeout(() => setFrame(frame - 1), animationSpeed);
        }

        return () => clearTimeout(animationFrameId);
    }, [frame, isActive]);

    const formattedFrame = frame.toString().padStart(5, '0');
    const imagePath = `./trainerCard/TrainerCard${formattedFrame}.png?${new Date().getTime()}`; // 캐싱 방지를 위한 타임스탬프 추가

    return (
        <img className={className} src={imagePath} alt={`Frame ${frame}`} />
    );
};

export default PngSequenceAnimation;
