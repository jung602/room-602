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
  isActive?: boolean;
  toggleTab?: () => void;
  setActiveTabId: (id: number | null) => void;
}

function isMobileDevice() {
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

const MagneticTab = ({ item, isActive, toggleTab, setActiveTabId }: MagneticTabProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tabHeight, setTabHeight] = useState(0);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, opacity: 1 });
  const [skillsResetKey, setSkillsResetKey] = useState(0);
  const [cardResetKey, setCardResetKey] = useState(0);

  // Function to toggle the internal state of the ThreeDCard
  const handleThreeDCardToggle = (active: boolean) => {
    console.log("ThreeDCard active state: ", active); // Implement or handle state logic as needed
  };

  useEffect(() => {
    if (!isActive) {
      setSkillsResetKey(prev => prev + 1); // Reset Skills component
      setCardResetKey(prev => prev + 1);   // Reset ThreeDCard component
    }
  }, [isActive]);

  const updateHeight = () => {
    if (contentRef.current) {
      setTabHeight(contentRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const observer = new MutationObserver(updateHeight);
    observer.observe(contentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });

    const images = Array.from(contentElement.getElementsByTagName('img'));
    images.forEach(img => {
      img.onload = updateHeight;
    });

    contentElement.addEventListener('transitionend', updateHeight);
    contentElement.addEventListener('animationend', updateHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      images.forEach(img => {
        img.onload = null;
      });
      contentElement.removeEventListener('transitionend', updateHeight);
      contentElement.removeEventListener('animationend', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, [isActive]);

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isMobileDevice()) return;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setHoverPosition({ x, y, opacity: 1 });
    }
  };

  const handleClick = () => {
    toggleTab?.();
    setActiveTabId(isActive ? null : item.id);
  };

  const buttonStyle = `${styles.tab} ${item.id === 1 ? styles.button1 : item.id === 2 ? styles.button2 : item.id === 3 ? styles.button3 : styles.button4}`;
  const tabStyle = `${styles.tabbackground} ${item.id === 1 ? styles.firstTab : item.id === 2 ? styles.secondTab : item.id === 3 ? styles.thirdTab : styles.fourthTab}`;

  return (
    <div className={`${buttonStyle} ${isActive ? styles.active : ''}`}>
      <button ref={ref} className={styles.magnetictab} onMouseMove={handleMouseMove} onClick={handleClick}>
        <div className={tabStyle} style={{ transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`, opacity: hoverPosition.opacity }}>
          <div className={styles.tabtext}>
            {item.text}
            <div ref={contentRef} className={`${styles.tabContent} ${isActive ? styles.active : ''}`} style={{ maxHeight: isActive ? `${tabHeight}px` : '0' }}>
              {item.text === 'Erin Jung' && <About />}
              {item.text === 'Design ⊕ Development' && <Skills key={skillsResetKey} />}
              {item.text === 'Pokemon Trainer' && <ThreeDCard key={cardResetKey} onCardToggle={handleThreeDCardToggle} />}
              {item.text === 'Contact' && <Contact />}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export const MagneticTabs: React.FC<{ setActiveTabId: (id: number | null) => void }> = ({ setActiveTabId }) => {
  const [activeTabId, setActiveTabIdLocal] = useState<number | null>(null);

  const toggleTab = (id: number) => {
    const newActiveTabId = activeTabId === id ? null : id;
    setActiveTabIdLocal(newActiveTabId);
    setActiveTabId(newActiveTabId);
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
    </div>
  );
};

const tabs = [
  { id: 1, text: "Erin Jung" },
  { id: 2, text: "Design ⊕ Development" },
  { id: 3, text: "Pokemon Trainer" },
  { id: 4, text: "Contact" },
];
