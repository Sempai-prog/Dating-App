import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { CandidateProfile } from '../../types';
import { MapPin, BadgeCheck, Ruler } from 'lucide-react';

interface SwipeCardProps {
  candidate: CandidateProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  onDetailsClick?: () => void;
  style?: any;
  dragEnabled?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ 
  candidate, 
  onSwipe, 
  style, 
  dragEnabled = true,
  onDetailsClick
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacityLike = useTransform(x, [50, 150], [0, 1]);
  const opacityNope = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate, ...style }}
      drag={dragEnabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={onDetailsClick}
      className={`absolute inset-0 w-full h-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 origin-bottom ${dragEnabled ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileTap={dragEnabled ? { scale: 1.02 } : undefined}
    >
      {/* Background Image */}
      <img
        src={candidate.image}
        alt={candidate.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Decision Overlays */}
      <motion.div 
        style={{ opacity: opacityLike }}
        className="absolute top-8 left-8 border-4 border-green-400 rounded-lg px-4 py-2 rotate-[-15deg] z-20 pointer-events-none"
      >
        <span className="text-4xl font-black text-green-400 uppercase tracking-widest">Like</span>
      </motion.div>

      <motion.div 
        style={{ opacity: opacityNope }}
        className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[15deg] z-20 pointer-events-none"
      >
        <span className="text-4xl font-black text-red-500 uppercase tracking-widest">Nope</span>
      </motion.div>

      {/* Content Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Card Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10 pointer-events-none">
        
        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 mb-3">
            {candidate.isPremium && (
                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-amber-900/20">
                    <BadgeCheck size={12} fill="currentColor" className="text-white" />
                    PREMIUM
                </span>
            )}
            {candidate.badges.map(badge => (
                <span key={badge} className="bg-white/20 backdrop-blur-md text-xs font-medium px-2.5 py-1 rounded-full">
                    {badge}
                </span>
            ))}
        </div>

        {/* Main Title */}
        <div className="flex items-baseline gap-3 mb-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold shadow-black drop-shadow-lg">{candidate.name}</h2>
            <span className="text-2xl font-light opacity-90">{candidate.age}</span>
        </div>

        {/* Location & Stats */}
        <div className="flex items-center gap-4 text-sm text-zinc-300 mb-4 font-medium">
            <div className="flex items-center gap-1">
                <MapPin size={16} className="text-brand-pink" />
                <span>{candidate.distance}</span>
            </div>
            <div className="flex items-center gap-1">
                <Ruler size={16} className="text-zinc-500" />
                <span>{candidate.stats.height}</span>
            </div>
        </div>

        {/* Bio Snippet */}
        <p className="text-zinc-300 text-sm line-clamp-2 leading-relaxed opacity-90">
            {candidate.bio}
        </p>
      </div>
    </motion.div>
  );
};