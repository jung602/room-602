import React,  { useState } from 'react';
import styles from './skills.module.scss';
import Image from 'next/image';


// Define a TypeScript interface for the skill
interface Skill {
  id: number;
  img: string;
  text: string;
  keywords: string[];
  adds: string;
}

// Define a TypeScript interface for the SkillItem component props
interface SkillItemProps {
  skill: Skill;
}

// No need for an interface for SkillsProps if there are no props
const skills: Skill[] = [
  { id: 1, img: "./skill1.png", text: "UI Designs", keywords: ["./Figma.png", "./AdobeCC.png", "./Blender.png"], adds:"Crafting Visual Experiences."},
  { id: 2, img: "./skill2.png", text: "Interaction Designs", keywords: ["./Figma.png", "./Protopie.png", "./AE.png", "./framer.png"], adds:"Choreographing Digital Responses."},
  { id: 3, img: "./skill3.png", text: "Virtual Designs", keywords: ["./Blender.png", "./Unity.png", "./Unreal.png"], adds:"Creating Immersive Environments."},
  { id: 4, img: "./skill4.png", text: "Developments", keywords: ["./React.png", "./Next.png", "./python.png", "./Csharp.png"], adds:"Making Tangible Outcomes."},
];


const SkillItem: React.FC<SkillItemProps> = ({ skill }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(!isVisible);
    event.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.containerClick : ''}`} onClick={toggleVisibility}>
     <div className={styles.innerContainer}>
      <Image src={skill.img} alt={skill.text} width={100} height={100} className={styles.icon} />
      <div className={styles.number}>0{skill.id}</div> 
      <div className={`${styles.content} ${"Medium"}`}>{skill.text}</div> 

      {isVisible && (
          <div className={styles.adds}>
            <div>{skill.adds}</div>
           
            <div className={styles.tools}>
               <div className={styles.textbox}><div className={styles.tooltext}>Main Tools</div></div>
              {skill.keywords.map((keyword, index) => (
                <Image className={styles.toolLogo} alt={skill.text} key={index} src={keyword} width={50} height={50} />
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
    <div className={`${styles.box} ${"Regular"}`}>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <SkillItem key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
