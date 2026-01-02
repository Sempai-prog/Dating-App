import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MatchesProvider } from './context/MatchesContext';
import { Shell } from './components/Shell';
import { AuthView } from './views/AuthView';
import { AppView } from './types';
import { DiscoveryView } from './views/DiscoveryView';
import { ProfileView } from './views/ProfileView';
import { MatchesView } from './views/MatchesView';
import { CatalogView } from './views/CatalogView'; // Import
import { Loader2 } from 'lucide-react';

const PlaceholderView: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500 p-8 text-center">
    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <span className="text-4xl">🚧</span>
    </div>
    <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
    <p>This module is locked until Phase [X] is initiated.</p>
  </div>
);

const NeonMatchApp: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>(AppView.DISCOVERY);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-8 h-8 text-brand-pink animate-spin" />
           <p className="text-zinc-500 text-sm tracking-widest uppercase">Initializing Core...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthView />;
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.DISCOVERY:
        return <DiscoveryView />;
      case AppView.CATALOG:
        return <CatalogView />; // Added
      case AppView.MATCHES:
        return <MatchesView />;
      case AppView.MESSAGES:
        return <PlaceholderView title="Real-time Messaging" />;
      case AppView.PROFILE:
        return <ProfileView />;
      default:
        return <DiscoveryView />;
    }
  };

  return (
    <Shell currentView={currentView} onNavigate={setCurrentView}>
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 h-full">
        {renderContent()}
      </div>
    </Shell>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MatchesProvider>
        <NeonMatchApp />
      </MatchesProvider>
    </AuthProvider>
  );
};

export default App;