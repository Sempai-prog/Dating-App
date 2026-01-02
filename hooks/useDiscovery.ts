import { useState, useRef, useMemo } from 'react';
import { CandidateProfile } from '../types';
import { MOCK_CANDIDATES } from '../lib/mock-data';
import { useMatches } from '../context/MatchesContext';

export const useDiscovery = () => {
  // --- ALGORITHM: THE HOT FLOW ---
  // Sort candidates: Boosted Creators First, then by "Hotness" (simulated by premium)
  const initialDeck = useMemo(() => {
    return [...MOCK_CANDIDATES].sort((a, b) => {
      // 1. Boosted Priority
      if (a.isBoosted && !b.isBoosted) return 1; // a comes later (on top of stack) ?? No, stack is rendered bottom-up usually? 
      // In our UI, index 0 is at the bottom, length-1 is top. 
      // So we want Boosted at end of array.
      if (a.isBoosted && !b.isBoosted) return 1;
      if (!a.isBoosted && b.isBoosted) return -1;
      return 0;
    });
  }, []);

  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialDeck);
  const [history, setHistory] = useState<CandidateProfile[]>([]);
  
  // Match Logic State
  const { addMatch } = useMatches();
  const [matchedProfile, setMatchedProfile] = useState<CandidateProfile | null>(null);
  
  // --- THE HARD WALL ---
  const DAILY_LIMIT = 3; // Aggressive demo limit
  const [likesCount, setLikesCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const removeCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const swipeRight = (candidate: CandidateProfile) => {
    // Check Limit
    if (likesCount >= DAILY_LIMIT) {
        setShowPaywall(true);
        return; // Block action
    }

    console.log(`Liked ${candidate.name}`);
    setHistory((prev) => [...prev, candidate]);
    removeCandidate(candidate.id);
    setLikesCount(prev => prev + 1);

    // Mock Match Logic: Trigger match on 2nd like for dopamine
    if ((likesCount + 1) % 2 === 0) {
        addMatch(candidate); 
        setMatchedProfile(candidate); 
    }
  };

  const swipeLeft = (candidate: CandidateProfile) => {
    console.log(`Passed on ${candidate.name}`);
    setHistory((prev) => [...prev, candidate]);
    removeCandidate(candidate.id);
  };

  const resetDeck = () => {
    setCandidates(initialDeck);
    setHistory([]);
    setLikesCount(0); // Reset limit for demo
    setShowPaywall(false);
  };
  
  const closeMatchOverlay = () => {
    setMatchedProfile(null);
  }

  return {
    candidates,
    swipeRight,
    swipeLeft,
    resetDeck,
    isEmpty: candidates.length === 0,
    matchedProfile,
    closeMatchOverlay,
    showPaywall,
    setShowPaywall,
    remainingLikes: Math.max(0, DAILY_LIMIT - likesCount)
  };
};