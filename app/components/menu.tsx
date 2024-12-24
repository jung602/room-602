import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import styles from './menu.module.scss';
import About from './about';
import Contact from './contact';
import Skills from "./skills";
import ThreeDCard from "./trainerCard";

// Types
interface TabItem {
  id: number;
  text: string;
}

interface MagneticTabProps {
  item: TabItem;
  isActive: boolean;
  toggleTab: (id: number) => void;
}

// Constants
const TABS: readonly TabItem[] = [
  { id: 1, text: "Erin Jung" },
  { id: 2, text: "Design ⊕ Development" },
  { id: 3, text: "Pokemon Trainer" },
  { id: 4, text: "Contact" },
] as const;

// Utils
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// TabContent Component
const TabContent = memo(({ text, isActive, onCardToggle, resetKey }: { 
  text: string; 
  isActive: boolean; 
  onCardToggle: ((isActive: boolean) => void) | undefined;
  resetKey?: number;
}) => {
  if (!isActive) return null;
  
  switch(text) {
    case 'Erin Jung':
      return <About />;
    case 'Design ⊕ Development':
      return <Skills key={resetKey} />;
    case 'Pokemon Trainer':
      return onCardToggle ? <ThreeDCard key={resetKey} onCardToggle={onCardToggle} /> : null;
    case 'Contact':
      return <Contact />;
    default:
      return null;
  }
});

TabContent.displayName = 'TabContent';

// MagneticTab Component
const MagneticTab = memo(({ item, isActive, toggleTab }: MagneticTabProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [tabHeight, setTabHeight] = useState(0);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0, opacity: 1 });
  const [isClicked, setIsClicked] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setTabHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      setResetKey(prev => prev + 1);
      return;
    }

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
    images.forEach(img => img.addEventListener('load', updateHeight));

    contentElement.addEventListener('transitionend', updateHeight);
    contentElement.addEventListener('animationend', updateHeight);
    window.addEventListener('resize', updateHeight);

    updateHeight();

    return () => {
      observer.disconnect();
      images.forEach(img => img.removeEventListener('load', updateHeight));
      contentElement.removeEventListener('transitionend', updateHeight);
      contentElement.removeEventListener('animationend', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, [isActive, updateHeight]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobileDevice() || isClicked || isActive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setHoverPosition({ x, y, opacity: 1 });
  }, [isClicked, isActive]);

  const handleMouseLeave = useCallback(() => {
    if (!isClicked) {
      setHoverPosition({ x: 0, y: 0, opacity: 1 });
    }
  }, [isClicked]);

  const handleClick = useCallback(() => {
    toggleTab(item.id);
    setIsClicked(!isClicked);
  }, [toggleTab, item.id, isClicked]);

  useEffect(() => {
    setIsClicked(false);
  }, [isActive]);

  const buttonClassName = `${styles.tab} ${
    styles[`button${item.id}`]
  } ${isActive ? styles.active : ''}`;

  const tabClassName = `${styles.tabbackground} ${
    styles[`${['first', 'second', 'third', 'fourth'][item.id - 1]}Tab`]
  }`;

  return (
    <div className={buttonClassName}>
      <button
        className={styles.magnetictab}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          className={tabClassName}
          style={{
            transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
            opacity: hoverPosition.opacity
          }}
        >
          <div className={`${styles.tabtext} Bold`}>
            {item.text}
            <div
              ref={contentRef}
              className={`${styles.tabContent} ${isActive ? styles.active : ''} ${isCardActive ? styles.cardActive : ''}`}
              style={{ 
                maxHeight: isActive ? `${tabHeight}px` : '0',
                marginTop: isActive ? `-4rem` : '0',
              }}
            >
              <TabContent 
                text={item.text}
                isActive={isActive}
                onCardToggle={setIsCardActive}
                resetKey={resetKey}
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
});

MagneticTab.displayName = 'MagneticTab';

// MagneticTabs Component
interface MagneticTabsProps {
  setActiveTabId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const MagneticTabs: React.FC<MagneticTabsProps> = memo(({ setActiveTabId }) => {
  const [activeTabId, setLocalActiveTabId] = useState<number | null>(null);

  const toggleTab = useCallback((id: number) => {
    const newValue = activeTabId === id ? null : id;
    setLocalActiveTabId(newValue);
    setActiveTabId(newValue);
  }, [activeTabId, setActiveTabId]);

  const closeTabs = useCallback(() => {
    setLocalActiveTabId(null);
    setActiveTabId(null);
  }, [setActiveTabId]);

  return (
    <div>
      {TABS.map((item) => (
        <MagneticTab
          key={item.id}
          item={item}
          isActive={item.id === activeTabId}
          toggleTab={toggleTab}
        />
      ))}
      <div 
        className={`${styles.back} ${activeTabId !== null ? styles.active : ''}`}
        onClick={closeTabs}
      />
    </div>
  );
});

MagneticTabs.displayName = 'MagneticTabs';