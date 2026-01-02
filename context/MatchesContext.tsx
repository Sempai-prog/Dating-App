import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { MatchProfile, CandidateProfile } from '../types';
import { MOCK_MATCHES } from '../lib/mock-data';

interface MatchesContextType {
  matches: MatchProfile[];
  addMatch: (candidate: CandidateProfile) => void;
  removeMatch: (id: string) => void;
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [matches, setMatches] = useState<MatchProfile[]>(MOCK_MATCHES);

  const addMatch = (candidate: CandidateProfile) => {
    // Avoid duplicates
    if (matches.find(m => m.id === candidate.id)) return;

    const newMatch: MatchProfile = {
      id: candidate.id,
      name: candidate.name,
      age: candidate.age,
      image: candidate.image,
      isOnline: true, // New matches are "online" for dopamine
      lastActive: 'Now'
    };
    
    // Add to top of list
    setMatches(prev => [newMatch, ...prev]);
  };

  const removeMatch = (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  return (
    <MatchesContext.Provider value={{ matches, addMatch, removeMatch }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
};