/**
 * TypeScript Data Model for Aaditya Mathur Portfolio
 */

export interface PersonalInfo {
  name: string;
  course: string;
  year: string;
  university: string;
  location: string;
  tagline: string;
  shortBio: string;
  statusBadge: string;
  statusDetail: string;
  avatar: string;
  avatarAlt: string;
  hudLabels: Array<{ id: string; text: string; position: string }>;
  heroChips: Array<{ id: string; label: string; color: string; category: string }>;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
  location: string;
  isCurrent: boolean;
  badgeText: string;
  description: string;
  topics: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  icon: string;
  accent: string;
  desc: string;
}

export interface MissionNode {
  step: string;
  name: string;
  status: string;
  summary: string;
  detail: string;
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholderNote: string;
  phone: string;
  phonePlaceholderNote: string;
  location: string;
  university: string;
  formNote: string;
}

export interface FooterInfo {
  name: string;
  tagline: string;
  motto: string;
  quote: string;
  copyrightYear: number;
}
