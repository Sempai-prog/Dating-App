import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CandidateProfile } from '../../types';
import { X, Heart, MapPin, Ruler, BadgeCheck, ChevronDown, Weight } from 'lucide-react';

interface ProfileDetailModalProps {
  candidate: CandidateProfile;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({ candidate, onClose, onLike, onPass }) => {
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-brand-dark flex flex-col md:max-w-2xl md:mx-auto md:border-x md:border-white/10"
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative bg-brand-dark pb-28">
        
        {/* Close Button Floating - Adjusted for safe areas */}
        <button 
            onClick={onClose}
            className="fixed top-6 left-6 md:absolute md:top-4 md:left-4 z-50 p-3 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors shadow-lg border border-white/5"
        >
            <ChevronDown size={28} />
        </button>

        {/* Image Header - Responsive Height */}
        {/* On mobile, use 45vh to ensure some bio text is visible without scrolling */}
        <div className="relative w-full h-[45vh] md:h-[60vh]">
            <img 
                src={candidate.image} 
                alt={candidate.name} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-brand-dark" />
        </div>

        {/* Info Section */}
        <div className="px-6 -mt-16 md:-mt-20 relative z-10">
            {/* Name & Age */}
            <div className="flex items-end justify-between mb-2">
                <div className="flex items-baseline gap-3">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white shadow-black drop-shadow-md">{candidate.name}</h1>
                    <span className="text-2xl font-light text-zinc-300">{candidate.age}</span>
                </div>
                {candidate.isPremium && (
                   <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-2 rounded-full shadow-lg">
                     <BadgeCheck size={20} className="text-white" />
                   </div>
                )}
            </div>

            {/* Sub-header info */}
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 mb-8 text-sm md:text-base">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                    <MapPin size={16} className="text-brand-pink" />
                    <span>{candidate.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                    <Ruler size={16} />
                    <span>{candidate.stats.height}</span>
                </div>
                 <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                    <Weight size={16} />
                    <span>{candidate.stats.status}</span>
                </div>
            </div>

            {/* About / Bio */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">About</h3>
                <p className="text-zinc-200 leading-relaxed text-lg font-light">
                    {candidate.bio}
                </p>
            </div>

            {/* Interests / Tags */}
            <div className="mb-8">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                    {candidate.badges.map(badge => (
                        <span key={badge} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
            
             <div className="mb-8">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-[3/4] bg-white/5 rounded-xl animate-pulse" />
                    <div className="aspect-[3/4] bg-white/5 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar - Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent z-20 flex justify-center items-center gap-8 border-t border-white/5 pb-8 md:pb-6">
         {/* Nope Button */}
        <button 
            onClick={onPass}
            className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-500 shadow-lg hover:scale-105 hover:bg-red-500/10 transition-all active:scale-95"
        >
            <X size={32} strokeWidth={3} />
        </button>

        {/* Like Button */}
        <button 
            onClick={onLike}
            className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-xl shadow-brand-pink/30 hover:scale-105 hover:shadow-brand-pink/50 transition-all active:scale-95"
        >
            <Heart size={32} fill="currentColor" stroke="none" />
        </button>
      </div>

    </motion.div>
  );
};