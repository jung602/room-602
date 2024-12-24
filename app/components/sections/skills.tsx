import React, { useState } from 'react';
import styles from '../../styles/sections/skills.module.scss';
import Image from 'next/image';
import type { SkillItemProps } from '../../types/sections/skills';
import { skills } from '../../constants/sections/skills';
import { FONT_WEIGHTS, IMAGE_DIMENSIONS } from '../../constants/styles';
import { ErrorBoundary } from '../ErrorBoundary';

const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(!isVisible);
    event.stopPropagation();
  };

  return (
    <div 
      className={`${styles.container} ${isVisible ? styles.containerClick : ''}`} 
      onClick={toggleVisibility}
      role="button"
      tabIndex={0}
      aria-expanded={isVisible}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleVisibility(e as any);
        }
      }}
    >
      <div className={styles.innerContainer}>
        <Image 
          src={skill.img} 
          alt={`${skill.text} 아이콘`} 
          width={IMAGE_DIMENSIONS.ICON.width} 
          height={IMAGE_DIMENSIONS.ICON.height} 
          className={styles.icon}
          priority={skill.id === 1}
        />
        <div className={styles.number}>0{skill.id}</div> 
        <div className={`${styles.content} ${FONT_WEIGHTS.MEDIUM}`}>{skill.text}</div> 

        {isVisible && (
          <div className={styles.adds}>
            <div>{skill.adds}</div>
           
            <div className={styles.tools}>
              <div className={styles.textbox}>
                <div className={styles.tooltext}>Main Tools</div>
              </div>
              {skill.keywords.map((keyword, index) => (
                <Image 
                  className={styles.toolLogo} 
                  alt={`${skill.text} 도구 아이콘 ${index + 1}`} 
                  key={index} 
                  src={keyword} 
                  width={IMAGE_DIMENSIONS.SMALL_ICON.width} 
                  height={IMAGE_DIMENSIONS.SMALL_ICON.height}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Skills: React.FC = () => { 
  return (
    <ErrorBoundary>
      <div className={`${styles.box} ${FONT_WEIGHTS.REGULAR}`}>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Skills;
