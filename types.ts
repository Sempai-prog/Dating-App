import { LucideIcon } from 'lucide-react';

export enum AppView {
  DISCOVERY = 'DISCOVERY', // The "Hot Flow"
  CATALOG = 'CATALOG',     // Replaces Matches for now logic-wise, but we keep Matches UI structure
  MATCHES = 'MATCHES',     // Restored for UI navigation
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE'
}

export interface NavItem {
  id: AppView;
  label: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  id: string;
  title: string;
  cost: number; // In M-Credits
  description: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  
  // Pivot Fields
  credits: number;        // M-Credits Balance
  isCreator: boolean;     // If true, has "Shop" features
  dailyLikesCount: number; // For the Hard Wall
  
  // Extended Profile Fields
  bio?: string;
  height?: string;
  weight?: string;
  distance?: string;
  tags?: string[];
  photos?: string[];
}

export interface CandidateProfile {
  id: string;
  name: string;
  age: number;
  distance: string;
  bio: string;
  image: string;
  badges: string[];
  isPremium: boolean;
  
  // Creator / Catalog Fields
  isCreator: boolean;
  isBoosted: boolean;     // Priority in Algorithm
  unlockCost: number;     // Cost to get WhatsApp/Contact
  whatsapp?: string;      // Hidden until unlocked
  services?: ServiceItem[];
  
  stats: {
    height: string;
    status: string;
  };
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  image: string;
  isOnline: boolean;
  lastActive: string;
  // If matched, contact is usually unlocked
  isUnlocked?: boolean; 
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface InterestTag {
  id: string;
  label: string;
  icon: string;
  category: string;
}