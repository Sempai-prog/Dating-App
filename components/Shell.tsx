import React, { PropsWithChildren } from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { MobileHeader } from './MobileHeader';
import { AppView, NavItem } from '../types';
import { Flame, MessageCircle, Heart, User, Search, Grid } from 'lucide-react';

interface ShellProps extends PropsWithChildren {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: AppView.DISCOVERY, label: 'Discovery', icon: Flame },
  { id: AppView.CATALOG, label: 'Catalog', icon: Grid }, // Added Catalog
  { id: AppView.MATCHES, label: 'Matches', icon: Heart },
  { id: AppView.MESSAGES, label: 'Messages', icon: MessageCircle },
  { id: AppView.PROFILE, label: 'Profile', icon: User },
];

export const Shell: React.FC<ShellProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans flex overflow-hidden">
      
      {/* Desktop Sidebar - Left */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate} 
        navItems={NAV_ITEMS} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative flex flex-col h-screen overflow-hidden md:pl-64">
        
        {/* Mobile Header - Top */}
        <MobileHeader currentView={currentView} />

        {/* Scrollable Content Viewport */}
        {/* pb-24 adds padding for bottom nav on mobile, pt-16 adds padding for top header on mobile */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24 pt-16 md:pt-0 md:pb-0 scroll-smooth">
          {children}
        </div>

        {/* Mobile Bottom Nav - Bottom */}
        <BottomNav 
            currentView={currentView} 
            onNavigate={onNavigate} 
            navItems={NAV_ITEMS} 
        />
        
      </main>
    </div>
  );
};