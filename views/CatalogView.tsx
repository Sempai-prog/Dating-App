import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../lib/mock-data';
import { CreatorCard } from '../components/catalog/CreatorCard';
import { ProfileDetailModal } from '../components/discovery/ProfileDetailModal';
import { Search, Filter, Grid, Zap } from 'lucide-react';
import { CandidateProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';

export const CatalogView: React.FC = () => {
  const { user } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<CandidateProfile | null>(null);

  // Filter Logic (Simple Mock)
  const creators = MOCK_CANDIDATES; 

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 min-h-full">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
            <h1 className="text-4xl font-serif font-bold text-white mb-2">The Catalog</h1>
            <p className="text-zinc-400 text-sm flex items-center gap-2">
                <Zap size={14} className="text-brand-orange" />
                <span>You have <span className="text-white font-bold">{user?.credits || 0} Credits</span> available.</span>
            </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand-pink transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search creators..." 
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink/50 transition-all"
                />
            </div>
            <button className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:border-white/30 transition-all">
                <Filter size={20} />
            </button>
            <button className="p-3 bg-brand-pink/10 border border-brand-pink/30 rounded-xl text-brand-pink transition-all">
                <Grid size={20} />
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20">
        {creators.map((profile) => (
            <CreatorCard 
                key={profile.id}
                profile={profile}
                isUnlocked={false} // Mock state
                onSelect={() => setSelectedProfile(profile)}
            />
        ))}
        
        {/* Placeholder / Promo Card */}
        <div className="aspect-[3/4] rounded-xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center p-4 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} className="text-zinc-600 group-hover:text-brand-orange transition-colors" />
            </div>
            <h3 className="font-bold text-zinc-300 text-sm">Boost Profile</h3>
            <p className="text-xs text-zinc-500 mt-1">Get seen by 10x more people</p>
        </div>
      </div>

      {/* Modal Layer */}
      <AnimatePresence>
        {selectedProfile && (
            <ProfileDetailModal 
                candidate={selectedProfile}
                onClose={() => setSelectedProfile(null)}
                onLike={() => { console.log('Liked via Catalog'); setSelectedProfile(null); }}
                onPass={() => setSelectedProfile(null)}
            />
        )}
      </AnimatePresence>

    </div>
  );
};