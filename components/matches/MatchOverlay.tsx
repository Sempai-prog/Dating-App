import React from 'react';
import { motion } from 'framer-motion';
import { CandidateProfile } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { MessageCircle, X } from 'lucide-react';

interface MatchOverlayProps {
  matchedProfile: CandidateProfile;
  onClose: () => void;
  onChat: () => void;
}

export const MatchOverlay: React.FC<MatchOverlayProps> = ({ matchedProfile, onClose, onChat }) => {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <img src={matchedProfile.image} className="w-full h-full object-cover blur-3xl scale-125" alt="" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
        
        {/* Title */}
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
            className="text-center mb-12"
        >
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,45,85,0.5)]">
               It's a Match!
             </h1>
             <p className="text-zinc-300 mt-2 text-lg">You and {matchedProfile.name} like each other.</p>
        </motion.div>

        {/* Avatars Collision */}
        <div className="relative h-64 w-full flex justify-center items-center mb-12">
            {/* User Avatar */}
            <motion.div
                initial={{ x: -150, rotate: -20, opacity: 0 }}
                animate={{ x: -40, rotate: -10, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                className="absolute w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10"
            >
                <img src={user?.imageUrl} alt="You" className="w-full h-full object-cover" />
            </motion.div>

            {/* Match Avatar */}
            <motion.div
                initial={{ x: 150, rotate: 20, opacity: 0 }}
                animate={{ x: 40, rotate: 10, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                className="absolute w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20"
            >
                <img src={matchedProfile.image} alt={matchedProfile.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Heart Icon in Center */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute z-30 bg-white rounded-full p-3 shadow-xl"
            >
                <div className="bg-brand-gradient rounded-full p-3">
                    <MessageCircle size={32} className="text-white fill-white" />
                </div>
            </motion.div>
        </div>

        {/* Actions */}
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-4 w-full max-w-xs"
        >
            <button 
                onClick={onChat}
                className="w-full py-4 rounded-xl bg-brand-gradient text-white font-bold text-lg shadow-lg shadow-brand-pink/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
                <MessageCircle size={20} />
                Chat Now
            </button>
            <button 
                onClick={onClose}
                className="w-full py-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/5"
            >
                <X size={20} />
                Keep Swiping
            </button>
        </motion.div>

      </div>
    </motion.div>
  );
};