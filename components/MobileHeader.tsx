import React from 'react';
import { Logo } from './Logo';
import { Bell, SlidersHorizontal } from 'lucide-react';
import { AppView } from '../types';
import { useAuth } from '../context/AuthContext';

interface MobileHeaderProps {
  currentView: AppView;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ currentView }) => {
  const { user } = useAuth();
  // We only show filters on Discovery view, otherwise generic actions
  const showFilters = currentView === AppView.DISCOVERY;

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-brand-dark/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-2">
         {/* User Avatar */}
         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-orange p-[2px]">
            <img 
                src={user?.imageUrl || "https://picsum.photos/100/100"} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-brand-dark"
            />
         </div>
         <Logo size="sm" />
      </div>

      <div className="flex items-center gap-3">
        {showFilters && (
            <button className="p-2 text-zinc-300 hover:text-white transition-colors bg-white/5 rounded-full">
                <SlidersHorizontal size={20} />
            </button>
        )}
        <button className="p-2 text-zinc-300 hover:text-white transition-colors">
            <Bell size={20} />
        </button>
      </div>
    </header>
  );
};