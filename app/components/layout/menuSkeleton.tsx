import React from 'react';
import styles from '../../styles/layout/menu.module.scss';
import skeletonStyles from '../../styles/layout/menuSkeleton.module.scss';
import { TABS } from '../../constants/layout/menu';
import { TAB_POSITIONS } from '../../constants/styles';

const SkeletonTab: React.FC<{ itemId: number; text: string }> = ({ itemId, text }) => {
  const buttonClassName = `${styles.tab} ${styles[`button${itemId}`]}`;
  const tabClassName = `${styles.tabbackground} ${styles[`${TAB_POSITIONS[itemId - 1]}Tab`]} ${skeletonStyles.skeletonTab}`;

  return (
    <div className={buttonClassName}>
      <div className={styles.magnetictab}>
        <div className={tabClassName}>
          <div className={`${styles.tabtext} ${skeletonStyles.skeletonText}`}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MenuSkeleton: React.FC = () => {
  return (
    <div className={skeletonStyles.skeletonContainer}>
      {TABS.map((item) => (
        <SkeletonTab key={item.id} itemId={item.id} text={item.text} />
      ))}
    </div>
  );
};

export default MenuSkeleton; 