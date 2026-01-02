import React from 'react';
import { CandidateProfile } from '../../types';
import { Lock, Unlock, BadgeCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreatorCardProps {
  profile: CandidateProfile;
  isUnlocked: boolean;
  onSelect: () => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ profile, isUnlocked, onSelect }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onSelect}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 hover:border-brand-pink/50 transition-all"
    >
      {/* Image */}
      <img 
        src={profile.image} 
        alt={profile.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* Badges (Top Left) */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {profile.isCreator && (
            <span className="bg-brand-dark/80 backdrop-blur-md text-brand-pink text-[10px] font-bold px-2 py-1 rounded-md border border-brand-pink/20 uppercase tracking-wider flex items-center gap-1">
                <Zap size={10} fill="currentColor" /> Creator
            </span>
        )}
      </div>

      {/* Price / Status (Top Right) */}
      <div className="absolute top-3 right-3">
        {isUnlocked ? (
            <div className="w-8 h-8 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/50 flex items-center justify-center text-green-400">
                <Unlock size={14} />
            </div>
        ) : (
             <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                <Lock size={12} className="text-zinc-400" />
                <span className="text-xs font-bold text-white">{profile.unlockCost}</span>
             </div>
        )}
      </div>

      {/* Content (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif font-bold text-lg text-white">{profile.name}</h3>
            {profile.isPremium && <BadgeCheck size={16} className="text-blue-400" fill="currentColor" stroke="black" />}
        </div>
        <p className="text-xs text-zinc-400 line-clamp-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
            {profile.bio}
        </p>
      </div>
    </motion.div>
  );
};