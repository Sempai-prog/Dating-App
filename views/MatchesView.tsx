import React from 'react';
import { useMatches } from '../context/MatchesContext';
import { MatchCard } from '../components/matches/MatchCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const MatchesView: React.FC = () => {
  const { matches, removeMatch } = useMatches();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-1">Your Matches</h1>
            <p className="text-zinc-400 text-sm">You have {matches.length} active connections.</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search matches..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-pink/50 transition-colors"
                />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
                <SlidersHorizontal size={20} />
            </button>
        </div>
      </div>

      {/* Matches Grid */}
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search size={32} />
            </div>
            <p className="text-lg">No matches yet.</p>
            <p className="text-sm">Start swiping to find your person!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-20">
            {matches.map((match, index) => (
                <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <MatchCard 
                        match={match} 
                        onUnmatch={removeMatch} 
                        onChat={(id) => console.log('Chat with', id)} 
                    />
                </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};