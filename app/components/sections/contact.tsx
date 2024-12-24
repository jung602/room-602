import React from 'react';
import styles from '../../styles/sections/contact.module.scss';
import Image from 'next/image';
import type { ContactItemProps } from '../../types/sections/contact';
import { contacts } from '../../constants/sections/contact';
import { FONT_WEIGHTS, IMAGE_DIMENSIONS } from '../../constants/styles';
import { ErrorBoundary } from '../ErrorBoundary';

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (
    <div className={styles.container}>
      <a 
        href={contact.url} 
        target='_blank' 
        rel="noopener noreferrer"
        aria-label={`${contact.text} 링크 열기`}
      >
        <div className={styles.innerContainer}>
          <div className={styles.content}>{contact.text}</div> 
          <Image 
            src={contact.icon} 
            alt={`${contact.text} 아이콘`} 
            width={IMAGE_DIMENSIONS.ICON.width} 
            height={IMAGE_DIMENSIONS.ICON.height} 
            className={styles.icon}
            priority={contact.id === 1}
          />
        </div>
      </a>
    </div>
  );
}

const Contact: React.FC = () => { 
  return (
    <ErrorBoundary>
      <div className={`${styles.box} ${FONT_WEIGHTS.REGULAR}`}>
        <div className={styles.grid}>
          {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Contact;
