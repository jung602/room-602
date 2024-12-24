import React, { useState } from 'react';
import styles from '../../styles/sections/about.module.scss';
import type { About, AboutItemProps } from '../../types/sections/about';

const abouts: About[] = [
  { id: 1, year:"Currently", place:"Samsung Electronics", url:"https://design.samsung.com/global/", position:"Virtual Designer" }
  ,{ id: 2, year:"2018.3 - 2023.2", place:"Hongik Univ. B.A.", url:"https://sidi.hongik.ac.kr/", position:"Dept. of Visual Communication Design" }
]

const AboutItem: React.FC<AboutItemProps> = ({ about }) => {
  return (
      <div className={styles.container}>
            <a 
              href={about.url} 
              target='_blank'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
        <div className={styles.innerContainer}>
          <div className={styles.number}>{about.year}</div> 
          <div className={`${styles.content} ${"Medium"}`}>{about.place}</div> 
          <div className={styles.content}>{about.position}</div> 
        </div>
        </a>
      </div>
  );
}

const About: React.FC = () => { 
  return (
    <div className={`${styles.box} ${"Regular"}`}>
      <div className={styles.grid}>
        {abouts.map((about) => (
          <AboutItem key={about.id} about={about} />
        ))}
      </div>
    </div>
  );
};

export default About;
