export interface Project {
  id: string;
  name: string;
  description: string;
  preview?: string;
  URL: string;
  technologies?: string[];
}

export interface SkillIcon {
  src: string;
  alt: string;
  name?: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  imgSrc?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
} 