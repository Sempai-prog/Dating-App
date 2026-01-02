import React from 'react';
import { MatchProfile } from '../../types';
import { MessageCircle, HeartOff } from 'lucide-react';

interface MatchCardProps {
  match: MatchProfile;
  onUnmatch: (id: string) => void;
  onChat: (id: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onUnmatch, onChat }) => {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group bg-zinc-900 shadow-md">
      {/* Image */}
      <img 
        src={match.image} 
        alt={match.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Online Indicator */}
      {match.isOnline && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900 shadow-sm z-10" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-between items-end mb-3">
            <div>
                <h3 className="text-white font-bold text-lg leading-tight">{match.name}, {match.age}</h3>
                <span className="text-zinc-400 text-xs">{match.isOnline ? 'Online Now' : match.lastActive}</span>
            </div>
        </div>

        {/* Actions - Hidden by default on desktop, visible on hover. Always visible on mobile if needed, but lets keep it clean */}
        <div className="flex gap-2">
            <button 
                onClick={(e) => { e.stopPropagation(); onChat(match.id); }}
                className="flex-1 bg-white/10 hover:bg-brand-pink hover:text-white backdrop-blur-md border border-white/10 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
            >
                <MessageCircle size={18} />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onUnmatch(match.id); }}
                className="w-10 bg-white/5 hover:bg-zinc-800 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-red-400 py-2 rounded-lg flex items-center justify-center transition-colors"
            >
                <HeartOff size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};