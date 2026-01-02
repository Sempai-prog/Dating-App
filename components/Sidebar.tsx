import React from 'react';
import { AppView, NavItem } from '../types';
import { Logo } from './Logo';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  navItems: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, navItems }) => {
  const { signOut } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-brand-dark z-50">
      {/* Header / Logo */}
      <div className="p-8">
        <Logo />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon 
                size={22} 
                className={`transition-colors duration-300 ${isActive ? 'text-brand-pink' : 'group-hover:text-white'}`} 
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / Account Actions */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings size={20} />
            <span>Settings</span>
        </button>
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-1"
        >
            <LogOut size={20} />
            <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};