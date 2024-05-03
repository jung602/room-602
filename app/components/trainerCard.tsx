import React, { useRef, useState, MouseEvent } from 'react';
import styles from './trainercard.module.scss';
import Image from 'next/image';
import PngSequenceAnimation from './pngSquence'
import localFont from 'next/font/local';

const sfMid= localFont({
  src: './fonts/SF-Pro-Rounded-Semibold.otf',
  display: 'swap',
})


interface ThreeDCardProps {
  onCardToggle: (isActive: boolean) => void; // 부모 컴포넌트로 상태 변경을 알리는 함수
}


const ThreeDCard: React.FC<ThreeDCardProps> = ({ onCardToggle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false); // 클릭 상태 관리

// components/ThreeDCard.tsx 수정 부분
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {


  if (!cardRef.current) return;

  const { clientX, clientY, currentTarget } = e;
  const { left, top, width, height } = currentTarget.getBoundingClientRect();
  const x = (clientX - left) / width - 0.5;
  const y = (clientY - top) / height - 0.5;

  const rotateX = y * 15; // 상하로 틸트될 각도 증가
  const rotateY = x * 15; // 좌우로 틸트될 각도 증가

  cardRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
};


const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateX(0) rotateY(0)';
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    onCardToggle(newActiveState); // 부모 컴포넌트로 상태 변경 알림
    event.stopPropagation(); // 이벤트 버블링 방지
  };


  return (
    <div 
    className={styles.container}>
    <div
      ref={cardRef}
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <PngSequenceAnimation
       isActive={isActive}
       className={`${styles.image} ${isActive ? styles.active : ''}`}
      />
      <div className={styles.title}>
        <Image src="./pokeball.png" alt="icon" width={100} height={100} className={styles.icon} />
        <div className={styles.text}>Trainer Card</div>
      </div>
      <div className={`${styles.infos} ${isActive ? styles.infoActive : ''}`}>
        
        <div className={styles.infocontent}>
          <div className={`${styles.subtext} ${sfMid.className}`}>Name</div>
          <div className={styles.maintext}>Milky</div>
        </div>

        <div className={styles.infocontent}>
          <div className={`${styles.subtext} ${sfMid.className}`}>Adventure Started</div>
          <div className={styles.maintext}>May, 2007</div>
        </div>

        <div className={styles.infocontent}>
          <div className={`${styles.subtext} ${sfMid.className}`}>Partners</div>
          <div className={styles.pokes}>
          <Image src="./dark1.png" alt="icon" width={100} height={100} className={styles.icon} />
          <Image src="./dark2.png" alt="icon" width={100} height={100} className={styles.icon} />
          <Image src="./dark3.png" alt="icon" width={100} height={100} className={styles.icon} />
          <Image src="./dark4.png" alt="icon" width={100} height={100} className={styles.icon} />
          <Image src="./dark5.png" alt="icon" width={100} height={100} className={styles.icon} />
          <Image src="./dark6.png" alt="icon" width={100} height={100} className={styles.icon} />
          </div>
        </div>

      </div>
      <Image src="./dark.png" alt="icon" width={100} height={100} className={styles.symbols} />
    </div>
    </div>
  );
};

export default ThreeDCard;
