import React, { useState, useEffect } from 'react';
import { MOCK_USER_PROFILE } from '../lib/constants';
import { UserProfile } from '../types';
import { PhotoGrid } from '../components/profile/PhotoGrid';
import { InterestSelector } from '../components/profile/InterestSelector';
import { MapPin, Ruler, Weight, UserCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- Local Hook for Mock Profile State ---
const useProfile = () => {
  const { user } = useAuth();
  // Initialize with MOCK_USER_PROFILE merged with Auth User for realism
  const [profile, setProfile] = useState<UserProfile>(() => ({
    ...user!, // Safety bang because we only render if auth
    ...MOCK_USER_PROFILE,
    photos: MOCK_USER_PROFILE.photos || [],
    tags: MOCK_USER_PROFILE.tags || []
  }));

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return { profile, updateProfile };
};

export const ProfileView: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

  // Simple save simulation
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-center">
      
      {/* LEFT COLUMN: LIVE PREVIEW (The "Card") */}
      <div className="w-full md:w-[400px] shrink-0 sticky top-24">
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group">
            {/* Main Image */}
            <img 
                src={profile.photos?.[0] || profile.imageUrl} 
                alt="Profile Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-end gap-3 mb-2">
                    <h1 className="text-3xl font-serif font-bold">{profile.name}</h1>
                    <span className="text-xl font-light opacity-90 mb-1">{profile.age}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-zinc-300 mb-4">
                    <MapPin size={16} className="text-brand-pink" />
                    <span>{profile.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {profile.tags?.slice(0, 3).map(tagId => {
                        // Quick lookup for preview (in real app, use a hook/selector)
                        const tag = (import('../lib/constants').then(m => m.INTEREST_TAGS)).valueOf(); 
                        return (
                            <span key={tagId} className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-medium">
                                Interest #{tagId} 
                            </span>
                        )
                    })}
                    {(profile.tags?.length || 0) > 3 && (
                        <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-xs font-medium">
                            +{profile.tags!.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className="mt-4 text-center text-xs text-zinc-500 uppercase tracking-widest">
            Live Preview
        </div>
      </div>

      {/* RIGHT COLUMN: EDITOR FORM */}
      <div className="flex-1 w-full space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
            <div>
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <p className="text-zinc-400 text-sm">Update your personal avatar details.</p>
            </div>
            <button 
                onClick={handleSave}
                className="bg-white text-black px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (
                    <>
                        <Check size={18} /> Save Changes
                    </>
                )}
            </button>
        </div>

        {/* Section: Photos */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Gallery</h3>
            <PhotoGrid 
                photos={profile.photos || []} 
                onChange={(newPhotos) => updateProfile({ photos: newPhotos })} 
            />
        </section>

        {/* Section: Basic Info */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Vital Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Display Name</label>
                    <div className="relative">
                        <UserCircle className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                        <input 
                            type="text" 
                            value={profile.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-brand-pink/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                        <input 
                            type="text" 
                            value={profile.location}
                            onChange={(e) => updateProfile({ location: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-brand-pink/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Height (cm)</label>
                    <div className="relative">
                        <Ruler className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                        <input 
                            type="text" 
                            value={profile.height}
                            onChange={(e) => updateProfile({ height: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-brand-pink/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Weight (kg)</label>
                    <div className="relative">
                        <Weight className="absolute left-4 top-3.5 text-zinc-500" size={18} />
                        <input 
                            type="text" 
                            value={profile.weight}
                            onChange={(e) => updateProfile({ weight: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-brand-pink/50 transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                <label className="text-sm text-zinc-400">Bio</label>
                <textarea 
                    value={profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    rows={4}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-pink/50 transition-colors resize-none"
                    placeholder="Tell your story..."
                />
            </div>
        </section>

        {/* Section: Interests */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-24 md:mb-0">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Interests</h3>
                <span className="text-xs text-brand-pink">{profile.tags?.length || 0}/5 Selected</span>
             </div>
             
             <InterestSelector 
                selectedIds={profile.tags || []} 
                onChange={(newTags) => updateProfile({ tags: newTags })}
             />
        </section>

      </div>
    </div>
  );
};