'use client'

import Head from 'next/head'
import Image from 'next/image'
import './globals.css'
import sassy from './sassy.module.scss'
import React, { useState, useEffect } from "react";
import { MagneticTabs } from './components/menu'

export default function Home() {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);


  return (
    <>
      <Head>

          <title>Room602</title>
          <link rel="icon" href="https://erin-jung.com/favicon.ico" sizes="any" />
          <meta name="title" content="Room602" />
          <meta name="description" content="Virtual Designer Based in Delulu" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://erin-jung.com/" />
          <meta property="og:title" content="Room602" />
          <meta property="og:description" content="Virtual Designer Based in Delulu" />
          <meta property="og:image" content="https://erin-jung.com/og.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://erin-jung.com/" />
          <meta property="twitter:title" content="Room602" />
          <meta property="twitter:description" content="Virtual Designer Based in Delulu" />
          <meta property="twitter:image" content="https://erin-jung.com/og.jpg" />

      </Head>
      <main className={`${sassy.main} ${"Semibold"}` }>
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