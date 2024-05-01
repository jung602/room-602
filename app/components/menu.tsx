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
  setActiveTabId: (id: number | null) => void;
  toggleTab: () => void;
}

function isMobileDevice() {
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

const MagneticTab = ({ item, isActive, setActiveTabId, toggleTab }: MagneticTabProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tabHeight, setTabHeight] = useState(0);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, opacity: 1 });
  const [skillsResetKey, setSkillsResetKey] = useState(0); // For resetting Skills component
  const [cardResetKey, setCardResetKey] = useState(0); // For resetting ThreeDCard component

  // Update height dynamically
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setTabHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight(); // Initial height set

    // Observing size changes to update the height
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isMobileDevice() || !isActive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setHoverPosition({ x, y, opacity: 1 });
  };

  const handleClick = () => {
    toggleTab();
    if (!isActive) {
      setSkillsResetKey(prev => prev + 1);
      setCardResetKey(prev => prev + 1);
    }
    setActiveTabId(isActive ? null : item.id);
  };

  return (
    <button
      ref={ref}
      className={styles.magnetictab}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPosition({ x: 0, y: 0, opacity: 0 })}
      onClick={handleClick}
    >
      <div
        className={styles.tabtext}
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity
        }}
      >
        {item.text}
        <div
          ref={contentRef}
          className={`${styles.tabContent} ${isActive ? styles.active : ''}`}
          style={{ maxHeight: isActive ? `${tabHeight}px` : '0' }}
        >
          {item.text === 'Erin Jung' && <About />}
          {item.text === 'Design ⊕ Development' && <Skills key={skillsResetKey} />}
          {item.text === 'Pokemon Trainer' && <ThreeDCard key={cardResetKey} onCardToggle={() => {}} />}
          {item.text === 'Contact' && <Contact />}
        </div>
      </div>
    </button>
  );
};

export const MagneticTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  const toggleTab = (id: number) => {
    setActiveTabId(activeTabId === id ? null : id);
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