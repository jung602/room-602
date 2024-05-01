'use client'

import Image from 'next/image'
import './globals.css'
import sassy from './sassy.module.scss'
import React, { useState, useEffect, useRef } from "react";
import { MagneticTabs } from './components/menu'

export default function Home() {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null); // Ref for the tabs container with a specific type

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is a node and not contained within the tabsRef element
      if (tabsRef.current && !tabsRef.current.contains(event.target as Node)) {
        setActiveTabId(null); // Reset the active tab if clicked outside of the tabs
      }
    };

    // Add the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
      <>
          <main className={sassy.main}>
          <div className={sassy.top}>
           <div>
            <div className={sassy.image}>
           <Image
              src="./boundary.png"
              width={32}
              height={32}
              alt="Comming Soon"
            />
            </div>
            <span>Running minimal </span>
            <span> for a bit.</span>
            </div>
          </div>
          <div className={sassy.contents} ref={tabsRef}>
          <MagneticTabs setActiveTabId={setActiveTabId} />
          </div>
          <div className={sassy.bottom}>
           <div>Copyright ©️ Erin Jung 2024</div>
          </div>
          </main>
      </>
  )
}
