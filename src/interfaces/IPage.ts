export interface Homepage {
  title: string;
  youtubeLink: string;
  backgroundLink: string;
  textColor: string;
}
export interface Page extends Homepage {
  quote: string;
}
