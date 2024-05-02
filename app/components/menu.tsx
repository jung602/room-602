import React, { useRef, useState, useEffect } from "react";
import styles from './menu.module.scss';
import About from './about';
import Contact from './contact';
import Skills from "./skills";
import ThreeDCard from "./trainerCard";

  interface TabItem {
    id: number;
    text: string;
  }
  
  interface MagneticTabProps {
    item: TabItem;
    className?: string;
    isActive?: boolean;
    toggleTab?: () => void;
    setActiveTabId: (id: number | null) => void;
  }


  function isMobileDevice() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  }
  
  const MagneticTab = ({ item, isActive, toggleTab }: MagneticTabProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [tabHeight, setTabHeight] = useState(0);
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, opacity: 1 });
    const [isClicked, setIsClicked] = useState(false); // 클릭 상태를 추적하는 새로운 상태
    const [isCardActiveInThreeDCard, setIsCardActiveInThreeDCard] = useState(false);
    const [skillsResetKey, setSkillsResetKey] = useState(0);
    const [cardResetKey, setCardResetKey] = useState(0);

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
      
          // 뷰포트 크기 변경 시 높이 업데이트 이벤트 핸들러 추가
          window.addEventListener('resize', updateHeight);
      
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
      
              // 뷰포트 크기 변경 시 높이 업데이트 이벤트 핸들러 제거
              window.removeEventListener('resize', updateHeight);
              setIsCardActiveInThreeDCard(isCardActiveInThreeDCard);
          };
      }, [isActive]);
    

      const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (isMobileDevice()) return;
        if (isClicked || isActive) return;
    
        const { clientX, clientY } = e;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (clientX - rect.left - rect.width / 2) * 0.15;
        const y = (clientY - rect.top - rect.height / 2) * 0.15;
        setHoverPosition({ x, y, opacity: 1 });
    };
      

      useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        };
      }, []);
      
      useEffect(() => {
        if (!isActive) {
          setSkillsResetKey(prev => prev + 1); // Reset Skills component
          setCardResetKey(prev => prev + 1);   // Reset ThreeDCard component
        }
      }, [isActive]);

    const handleThreeDCardToggle = (isActive: boolean) => {
      setIsCardActiveInThreeDCard(isActive); // ThreeDCard 내부의 카드 상태에 따라 상태 업데이트
    };

    const onMouseOut = () => {
        if (isClicked) return; // 클릭 상태일 때 이벤트 핸들러 실행을 방지
        setHoverPosition({ x: 0, y: 0, opacity: 1 });
    };

    useEffect(() => {
      // isActive가 변경될 때마다 마우스 움직임 이벤트 핸들러의 조건을 리셋
      setIsClicked(false);
    }, [isActive]);

    const handleClick = () => {
      toggleTab?.();
      setActiveTabId(isActive ? null : item.id);
      setIsClicked(!isClicked);
    };
  
  const buttonStyle = `${styles.tab} ${item.id === 1 ? styles.button1 : item.id === 2 ? styles.button2 : item.id === 3 ? styles.button3 : styles.button4}`;
  const tabStyle = `${styles.tabbackground} ${item.id === 1 ? styles.firstTab : item.id === 2 ? styles.secondTab : item.id === 3 ? styles.thirdTab : styles.fourthTab}`;

    return (
      <>
        <div className={`${buttonStyle} ${isActive ? styles.active : ''}`}>
            <button
                ref={ref}
                className={styles.magnetictab}
                onMouseMove={handleMouseMove}
                onMouseLeave={onMouseOut}
                onClick={handleClick}
            >
                <div
                    className={tabStyle}
                    style={{
                      transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
                      opacity: hoverPosition.opacity
                    }}
                >
                      <div className={styles.tabtext}>
                        {item.text}
                        <div
                          ref={contentRef}
                          className={`${styles.tabContent} ${isActive ? styles.active : ''} ${isCardActiveInThreeDCard ? styles.cardActive : ''}`}
                          style={{ 
                            maxHeight: isActive ? `${tabHeight}px` : '0', 
                            marginTop: isActive ? `-4rem` : '0', 
                          }}
                          >
                            {item.text === 'Erin Jung' && <About />}
                            {item.text === 'Design ⊕ Development' && <Skills key={skillsResetKey} />}
                            {item.text === 'Pokemon Trainer' && <ThreeDCard key={cardResetKey} onCardToggle={handleThreeDCardToggle} />}
                            {item.text === 'Contact' && <Contact />}
                        </div>
                      </div>
                </div>
            </button>

        </div>

      </>
    );
  };

// MagneticTabs 컴포넌트
export const MagneticTabs: React.FC<{ setActiveTabId: (id: number | null) => void }> = ({ setActiveTabId }) => {
  const [activeTabId, setActiveTabIdLocal] = useState<number | null>(null);

  const toggleTab = (id: number) => {
    const newActiveTabId = activeTabId === id ? null : id;
    setActiveTabIdLocal(newActiveTabId);
    setActiveTabId(newActiveTabId);
  };

  // 클릭 핸들러: 탭이 열려있는 경우 모든 탭을 닫습니다.
  const handleClickOutsideTabs = () => {
    if (activeTabId !== null) {
      setActiveTabId(null);
    }
  };

  return (
      <div>
          {tabs.map((item) => (
              <MagneticTab
                  key={item.id}
                  item={item}
                  isActive={item.id === activeTabId}
                  toggleTab={() => toggleTab(item.id)}
                  setActiveTabId={setActiveTabId}
              />
          ))}
        <div 
            className={`${styles.back} ${activeTabId !== null ? styles.active : ''}`}
            onClick={handleClickOutsideTabs}></div>
      </div>
  );
};

// 탭 데이터
  const tabs = [
      { id: 1, text: "Erin Jung" },
      { id: 2, text: "Design ⊕ Development" },
      { id: 3, text: "Pokemon Trainer" },
      { id: 4, text: "Contact" },
  ];

function setActiveTabId(arg0: number | null) {
}