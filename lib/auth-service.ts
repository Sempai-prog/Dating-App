import { UserProfile } from '../types';

const MOCK_DELAY = 800; // Simulate network latency
const STORAGE_KEY = 'neonmatch_auth_session';

// The Default "Test" User
const MOCK_USER: UserProfile = {
  id: 'user_12345',
  email: 'alex@neon.match',
  name: 'Alex Nova',
  age: 27,
  location: 'Neo Tokyo, District 9',
  imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop',
  isOnline: true,
  credits: 15, // Start with low credits to trigger upsell
  isCreator: false,
  dailyLikesCount: 0,
};

export const authService = {
  /**
   * Check for existing session in localStorage
   */
  getSession: async (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            resolve(JSON.parse(stored));
          } catch (e) {
            localStorage.removeItem(STORAGE_KEY);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      }, 500); // Shorter delay for initial load check
    });
  },

  /**
   * Simulate Sign In
   */
  signIn: async (email: string): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email.includes('@')) {
          reject(new Error('Invalid email format'));
          return;
        }
        // Persist session
        const user = { ...MOCK_USER, email };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      }, MOCK_DELAY);
    });
  },

  /**
   * Simulate Sign Up
   */
  signUp: async (email: string, name: string): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: UserProfile = { 
            ...MOCK_USER, 
            email, 
            name,
            credits: 50, // Bonus credits for new signups
            dailyLikesCount: 0
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        resolve(newUser);
      }, MOCK_DELAY);
    });
  },

  /**
   * Simulate Sign Out
   */
  signOut: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(STORAGE_KEY);
        resolve();
      }, 300); // Quick logout
    });
  }
};