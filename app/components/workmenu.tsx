import React, { useRef, useState, useEffect } from "react";
import styles from './menu.module.scss';
import About from './about';
import Selectedwork from './work';
import Contact from './contact';


interface TabItem {
    id: number;
    text: string;
  }
  
  interface MagneticTabProps {
    item: TabItem;
    isActive: boolean;
    toggleTab: () => void;
  }
  
  const MagneticTab = ({ item, isActive, toggleTab }: MagneticTabProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [tabHeight, setTabHeight] = useState(0);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, opacity: 0 });
  
    // 높이 업데이트 함수
    const updateHeight = () => {
      if (contentRef.current) {
        setTabHeight(contentRef.current.scrollHeight);
      }
    };
  
    useEffect(() => {
        const contentElement = contentRef.current;
        if (!contentElement) return;
      
        let observer: MutationObserver | null = null;
      
        if (isActive) {
          observer = new MutationObserver(updateHeight);
          observer.observe(contentElement, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
          });
      
          updateHeight();
        }
      
        // 이미지 로딩 완료 이벤트 핸들러 추가
        const images = Array.from(contentElement.getElementsByTagName('img'));
        images.forEach(img => {
          img.onload = updateHeight;
        });
      
        // CSS 전환/애니메이션 완료 이벤트 핸들러 추가
        contentElement.addEventListener('transitionend', updateHeight);
        contentElement.addEventListener('animationend', updateHeight);
      
        return () => {
          if (observer) {
            observer.disconnect();
          }
      
          // 이미지 로딩 완료 이벤트 핸들러 제거
          images.forEach(img => {
            img.onload = null;
          });
      
          // CSS 전환/애니메이션 완료 이벤트 핸들러 제거
          contentElement.removeEventListener('transitionend', updateHeight);
          contentElement.removeEventListener('animationend', updateHeight);
        };
      }, [isActive]);
      

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) * 0.15;
        const y = (clientY - top - height / 2) * 0.15;
        setHoverPosition({ x, y, opacity: 1 });
    };

    const onMouseOut = () => {
        setHoverPosition({ x: 0, y: 0, opacity: 0 });
    };

    return (
        <div
        className={`${styles.tab} ${isActive ? styles.active : ''}`}>
            <button
                ref={ref}
                className={styles.magnetictab}
                onMouseMove={handleMouseMove}
                onMouseLeave={onMouseOut}
                onClick={toggleTab}
            >
                <span className={`${styles.tabtext} ${isActive ? styles.active : ''}`}>
                    {item.text}
                    <div 
                    ref={contentRef} // 참조 적용
                    className={`${styles.tabArrow} ${isActive ? styles.active : ''}`}>
                      ↘
                    </div>

                </span>
                
                <div
                    className={styles.tabbackground}
                    style={{
                      transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
                      opacity: hoverPosition.opacity
                    }}
                />
            </button>

            <div
                ref={contentRef}
                className={`${styles.tabContent} ${isActive ? styles.active : ''}`}
                style={{ maxHeight: isActive ? `${tabHeight}px` : '0' }}
            >
                {item.text === 'About' && <About />}
                {item.text === 'Selected Work' &&
                  <div>
                    <Selectedwork />
                  </div>}
                {item.text === 'Contact' && <Contact />}
            </div>
        </div>
    );
};

// MagneticTabs 컴포넌트
export const MagneticTabs = () => {
    const [activeTabId, setActiveTabId] = useState<number | null>(null);

    const toggleTab = (id: number) => {
        setActiveTabId(activeTabId === id ? null : id);
    };

    return (
        <div className={styles.magnetictabs}>
            <span className={`${styles.tabtext}`}>
                  Erin Jung,
                  <br /> Inetraction Designer
            </span>
            {tabs.map((item) => (
                <MagneticTab
                    key={item.id}
                    item={item}
                    isActive={item.id === activeTabId}
                    toggleTab={() => toggleTab(item.id)}
                />
            ))}
        </div>
    );
};

// 탭 데이터
const tabs = [
    { id: 1, text: "About" },
    { id: 2, text: "Selected Work" },
    { id: 3, text: "Contact" },
];