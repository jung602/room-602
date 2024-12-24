export interface Skill {
  id: number;
  img: string;
  text: string;
  keywords: string[];
  adds: string;
}

export interface SkillItemProps {
  skill: Skill;
} 