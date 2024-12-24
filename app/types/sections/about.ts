export interface About {
  id: number;
  year: string;
  place: string;
  position: string;
  url: string;
}

export interface AboutItemProps {
  about: About;
} 