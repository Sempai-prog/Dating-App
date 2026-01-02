import { InterestTag, UserProfile } from "../types";

export const INTEREST_TAGS: InterestTag[] = [
  { id: '1', label: 'Travel', icon: '✈️', category: 'Hobby' },
  { id: '2', label: 'Photography', icon: '📸', category: 'Art' },
  { id: '3', label: 'Cooking', icon: '🍳', category: 'Lifestyle' },
  { id: '4', label: 'Gaming', icon: '🎮', category: 'Hobby' },
  { id: '5', label: 'Music', icon: '🎵', category: 'Art' },
  { id: '6', label: 'Reading', icon: '📚', category: 'Culture' },
  { id: '7', label: 'Gym', icon: '💪', category: 'Sports' },
  { id: '8', label: 'Dog Lover', icon: '🐕', category: 'Pets' },
  { id: '9', label: 'Cat Person', icon: '🐈', category: 'Pets' },
  { id: '10', label: 'Netflix', icon: '🎬', category: 'Chill' },
  { id: '11', label: 'Wine', icon: '🍷', category: 'Food & Drink' },
  { id: '12', label: 'Hiking', icon: '🥾', category: 'Sports' },
  { id: '13', label: 'Fashion', icon: '👗', category: 'Lifestyle' },
  { id: '14', label: 'Tech', icon: '💻', category: 'Work' },
  { id: '15', label: 'Startups', icon: '🚀', category: 'Work' },
];

export const MOCK_USER_PROFILE: Partial<UserProfile> = {
  name: "Elizabeth",
  age: 18,
  location: "USA, California",
  distance: "2.5 km",
  height: "178 cm",
  weight: "55 Kg",
  bio: "Hi! When a user passes on a match, the conversation would close for both users... I love Netflix, horses and books!",
  tags: ["1", "8", "6", "10"],
  photos: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&h=800&fit=crop", // Main
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&h=800&fit=crop"
  ],
  imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&h=200&fit=crop"
};