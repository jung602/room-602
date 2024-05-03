'use client'

import Image from 'next/image'
import './globals.css'
import sassy from './sassy.module.scss'
import React, { useState, useEffect } from "react";
import { MagneticTabs } from './components/menu'

export default function Home() {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);


  return (
    <>
      <main className={`${sassy.main} ${"SemiBold"}` }>
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
            <div className={sassy.contents}>
              <MagneticTabs setActiveTabId={setActiveTabId} />
            </div>
            <div className={sassy.bottom}>
              <div>Copyright © Erin Jung 2024</div>
            </div>
      </main>
    </>
  );
}