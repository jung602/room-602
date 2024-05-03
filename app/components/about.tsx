import React, { useState } from 'react';
import localFont from 'next/font/local';
import styles from './about.module.scss';

const sfRegular = localFont({
  src: './SF-Pro-Rounded-Medium.otf',
  display: 'swap',
})
const sfMid= localFont({
  src: './SF-Pro-Rounded-Semibold.otf',
  display: 'swap',
})

interface About {
  id: number;
  year: string;
  place: string
  position: string;
  url: string;
}

interface AboutItemProps {
  about: About;
}

const abouts: About[] = [
  { id: 1, year:"Currently", place:"Samsung Electronics", url:"https://design.samsung.com/global/", position:"Virtual Designer" }
  ,{ id: 2, year:"2018.3 - 2023.2", place:"Hongik Univ. B.A.", url:"https://sidi.hongik.ac.kr/", position:"Dept. of Visual Communication Design" }
  ]


  const AboutItem: React.FC<AboutItemProps> = ({ about }) => {
  return (

      <div className={styles.container}>
            <a href={about.url} target='_blank'>
        <div className={styles.innerContainer}>
          <div className={styles.number}>{about.year}</div> 
          <div className={`${styles.content} ${sfMid.className}`}>{about.place}</div> 
          <div className={styles.content}>{about.position}</div> 
        </div>
        </a>
      </div>
  );
}


const About: React.FC = () => { 
  return (
    <div className={`${styles.box} ${sfRegular.className}`}>
      <div className={styles.grid}>
        {abouts.map((about) => (
          <AboutItem key={about.id} about={about} />
        ))}
      </div>
    </div>
  );
};


export default About;
