import React from 'react';
import { INTEREST_TAGS } from '../../lib/constants';

interface InterestSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({ selectedIds, onChange }) => {
  
  const toggleInterest = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length >= 5) return; // Max 5 limit
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {INTEREST_TAGS.map((tag) => {
        const isSelected = selectedIds.includes(tag.id);
        
        return (
          <button
            key={tag.id}
            onClick={() => toggleInterest(tag.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              isSelected 
                ? 'bg-brand-pink text-white border-brand-pink shadow-lg shadow-brand-pink/20' 
                : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </button>
        );
      })}
    </div>
  );
};