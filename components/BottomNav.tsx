import React from 'react';
import { AppView, NavItem } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  navItems: NavItem[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, navItems }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none">
      <nav className="pointer-events-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex justify-around items-center px-2 py-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative p-3 rounded-full transition-all duration-300 group"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <span className="absolute inset-0 bg-brand-gradient opacity-20 blur-md rounded-full" />
              )}
              
              <item.icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`relative z-10 transition-all duration-300 ${
                  isActive 
                    ? 'text-brand-pink scale-110' 
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`} 
              />
              
              {/* Dot indicator for active state */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-pink rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};