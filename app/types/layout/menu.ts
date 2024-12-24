import { Dispatch, SetStateAction } from 'react';

export interface TabItem {
  id: number;
  text: string;
}

export interface MagneticTabProps {
  item: TabItem;
  isActive: boolean;
  toggleTab: (id: number) => void;
}

export interface TabContentProps {
  text: string;
  isActive: boolean;
  onCardToggle: ((isActive: boolean) => void) | undefined;
  resetKey?: number;
}

export interface MagneticTabsProps {
  setActiveTabId: Dispatch<SetStateAction<number | null>>;
} 