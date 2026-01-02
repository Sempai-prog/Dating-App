import React, { useEffect, useState } from 'react';
import { useDiscovery } from '../hooks/useDiscovery';
import { SwipeCard } from '../components/discovery/SwipeCard';
import { ProfileDetailModal } from '../components/discovery/ProfileDetailModal';
import { MatchOverlay } from '../components/matches/MatchOverlay';
import { PaywallModal } from '../components/discovery/PaywallModal';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Flame, Info, RotateCcw, SlidersHorizontal, Zap } from 'lucide-react';
import { CandidateProfile } from '../types';

export const DiscoveryView: React.FC = () => {
  const { 
    candidates, 
    swipeLeft, 
    swipeRight, 
    resetDeck, 
    isEmpty, 
    matchedProfile, 
    closeMatchOverlay,
    showPaywall,
    setShowPaywall,
    remainingLikes 
  } = useDiscovery();
  
  const [activeTab, setActiveTab] = useState<'HOT' | 'NEW'>('HOT');
  const [selectedProfile, setSelectedProfile] = useState<CandidateProfile | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleLike = () => {
    if (isEmpty) return;
    const topCard = candidates[candidates.length - 1];
    if (selectedProfile) setSelectedProfile(null); 
    swipeRight(topCard);
  };

  const handlePass = () => {
    if (isEmpty) return;
    const topCard = candidates[candidates.length - 1];
    if (selectedProfile) setSelectedProfile(null); 
    swipeLeft(topCard);
  };

  return (
    <div className="h-full w-full flex flex-col relative max-w-md mx-auto md:max-w-2xl overflow-hidden">
      
      {/* Header Filters - The "Hot District" */}
      <div className="flex items-center justify-between px-6 py-4 md:py-6 relative z-30 shrink-0">
        <div className="flex gap-6 text-lg font-medium">
            <button 
                onClick={() => setActiveTab('HOT')}
                className={`transition-colors flex items-center gap-2 ${activeTab === 'HOT' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                <Flame size={18} className={activeTab === 'HOT' ? 'text-brand-pink fill-brand-pink' : ''} />
                Hot
            </button>
            <button 
                onClick={() => setActiveTab('NEW')}
                className={`transition-colors ${activeTab === 'NEW' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                New
            </button>
        </div>
        
        {/* Credits Counter (Teaser) */}
        <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 flex items-center gap-2">
                <Zap size={14} className="text-brand-orange fill-brand-orange" />
                <span className="text-xs font-bold text-white">{remainingLikes} Likes left</span>
            </div>
            <button className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <SlidersHorizontal size={20} />
            </button>
        </div>
      </div>

      {/* Card Stack Container */}
      <div className="flex-1 relative w-full px-4 md:px-0 flex flex-col justify-center items-center min-h-0 mb-4 md:mb-0 transition-all duration-300">
        <div className={`relative w-full transition-all duration-300 ${isMobile ? 'h-full max-h-[600px]' : 'h-[600px] w-[400px]'}`}>
            <AnimatePresence>
                {isEmpty ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-zinc-900/50 rounded-3xl border border-white/5"
                    >
                        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 animate-pulse border border-zinc-800">
                            <Flame size={40} className="text-brand-pink" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-2">Zone Empty</h3>
                        <p className="text-zinc-500 mb-8">Visit the Catalog to find more creators.</p>
                        <button 
                            onClick={resetDeck}
                            className="flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-xl font-bold uppercase tracking-wide text-sm shadow-lg shadow-brand-pink/20 hover:scale-105 transition-transform"
                        >
                            <RotateCcw size={16} />
                            Reload Zone
                        </button>
                    </motion.div>
                ) : (
                    candidates.map((candidate, index) => {
                        const isTop = index === candidates.length - 1;
                        return (
                            <SwipeCard
                                key={candidate.id}
                                candidate={candidate}
                                dragEnabled={!isMobile && !showPaywall} // Disable drag if paywall active
                                onSwipe={(dir) => dir === 'left' ? swipeLeft(candidate) : swipeRight(candidate)}
                                onDetailsClick={() => {
                                    if (isTop) setSelectedProfile(candidate);
                                }}
                                style={{
                                    zIndex: index,
                                    scale: isTop ? 1 : 1 - (candidates.length - 1 - index) * 0.05,
                                    y: isTop ? 0 : (candidates.length - 1 - index) * 10,
                                    opacity: isTop ? 1 : 1 - (candidates.length - 1 - index) * 0.3,
                                }}
                            />
                        );
                    })
                )}
            </AnimatePresence>
            
            {/* PAYWALL OVERLAY - THE HARD WALL */}
            {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
            
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 pt-2 md:pt-8 flex items-center justify-center gap-6 md:gap-8 z-30 relative shrink-0">
        <button 
            onClick={handlePass}
            disabled={isEmpty || showPaywall}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-lg hover:scale-110 hover:bg-zinc-800 hover:text-white transition-all disabled:opacity-50"
        >
            <X size={28} strokeWidth={3} />
        </button>

        <button 
            onClick={() => !isEmpty && setSelectedProfile(candidates[candidates.length - 1])}
            disabled={isEmpty || showPaywall}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${isMobile ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white'}`}
        >
            <Info size={20} strokeWidth={2.5} />
        </button>

        <button 
            onClick={handleLike}
            disabled={isEmpty || showPaywall}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-xl shadow-brand-pink/30 hover:scale-110 hover:shadow-brand-pink/50 transition-all disabled:opacity-50"
        >
            <Flame size={32} fill="currentColor" stroke="none" />
        </button>
      </div>

      {/* Modal Layers */}
      <AnimatePresence>
        {selectedProfile && (
            <ProfileDetailModal 
                candidate={selectedProfile}
                onClose={() => setSelectedProfile(null)}
                onLike={handleLike}
                onPass={handlePass}
            />
        )}
        {matchedProfile && (
            <MatchOverlay 
                matchedProfile={matchedProfile}
                onClose={closeMatchOverlay}
                onChat={() => closeMatchOverlay()}
            />
        )}
      </AnimatePresence>

    </div>
  );
};