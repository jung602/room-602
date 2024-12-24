export interface Contact {
  id: number;
  icon: string;
  text: string;
  url: string;
}

export interface ContactItemProps {
  contact: Contact;
} 