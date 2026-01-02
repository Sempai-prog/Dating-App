import { CandidateProfile, MatchProfile } from "../types";

export const MOCK_CANDIDATES: CandidateProfile[] = [
  {
    id: '101',
    name: 'Sarah',
    age: 24,
    distance: '12 km',
    bio: "Model & Art Student. Unlock for private gallery.",
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&h=800&fit=crop',
    badges: ['Verified', 'Model'],
    isPremium: true,
    isCreator: true,
    isBoosted: true, // Will appear first
    unlockCost: 50,
    services: [
        { id: 's1', title: 'Private Chat', cost: 20, description: 'Direct WhatsApp Access' },
        { id: 's2', title: 'Dinner Date', cost: 500, description: 'Reservation only' }
    ],
    stats: { height: '165 cm', status: 'Single' }
  },
  {
    id: '104',
    name: 'Jade',
    age: 21,
    distance: '2 km',
    bio: "Just here for fun. No drama.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop',
    badges: ['New'],
    isPremium: false,
    isCreator: false, // Standard User
    isBoosted: false,
    unlockCost: 0,
    stats: { height: '170 cm', status: 'Single' }
  },
  {
    id: '102',
    name: 'David',
    age: 29,
    distance: '5 km',
    bio: "Entrepreneur tech. Toujours en mouvement 🚀",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&h=800&fit=crop',
    badges: ['Tech', 'Startup', 'Coffee'],
    isPremium: false,
    isCreator: false,
    isBoosted: false,
    unlockCost: 0,
    stats: { height: '182 cm', status: 'Single' }
  },
  {
    id: '103',
    name: 'Elena',
    age: 22,
    distance: '25 km',
    bio: "Étudiante en médecine. Pas beaucoup de temps libre mais je le rends bien.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&h=800&fit=crop',
    badges: ['Medicine', 'Travel'],
    isPremium: false,
    isCreator: true,
    isBoosted: true, // Will appear second
    unlockCost: 30,
    stats: { height: '170 cm', status: 'Single' }
  }
];

export const MOCK_MATCHES: MatchProfile[] = [
  {
    id: '201',
    name: 'Jacob',
    age: 28,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=800&fit=crop',
    isOnline: true,
    lastActive: 'Now'
  },
  {
    id: '202',
    name: 'Martin',
    age: 24,
    image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=600&h=800&fit=crop',
    isOnline: false,
    lastActive: '15 min ago'
  }
];