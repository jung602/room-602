import React, { useState } from 'react';
import localFont from 'next/font/local';
import styles from './contact.module.scss';
import Image from 'next/image';

const sfRegular = localFont({
  src: `url('/SF-Pro-Rounded-Semibold.otf')`,
  display: 'swap',
})

interface Contact {
  id: number;
  icon: string;
  text: string
  url: string;
}

interface ContactItemProps {
  contact: Contact;
}

const contacts: Contact[] = [
  { id: 1, icon:"./email.png", text:"E-mail", url:"mailto:602jung@gmail.com" }
  ,{ id: 2, icon:"./readcv.png", text:"ReadCV", url:"https://read.cv/602"}
  ,{ id: 3, icon:"./linkedin.png", text:"LinkedIn ", url:"https://www.linkedin.com/in/erin-jung/"}

]



  const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (

      <div className={styles.container}>
            <a href={contact.url} target='_blank'>
        <div className={styles.innerContainer}>
          
        <div className={styles.content}>{contact.text}</div> 
        <Image src={contact.icon} alt={contact.text} width={100} height={100} className={styles.icon} />
        </div>
        </a>
      </div>
  );
}


const Contact: React.FC = () => { 
  return (
    <div className={`${styles.box} ${sfRegular.className}`}>
      <div className={styles.grid}>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};


export default Contact;
