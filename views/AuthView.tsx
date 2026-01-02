import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';

type AuthMode = 'SIGN_IN' | 'SIGN_UP';

export const AuthView: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('SIGN_IN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'SIGN_IN') {
        await signIn(email, password);
      } else {
        await signUp(email, name, password);
      }
    } catch (err) {
      setError('Access Denied. Check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-brand-dark flex items-center justify-center relative overflow-hidden p-4">
      {/* Abstract Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-pink/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center">
          <div className="mb-8 scale-110">
            <Logo size="lg" />
          </div>

          <div className="w-full mb-6">
            <h2 className="text-2xl font-bold text-center mb-1">
              {mode === 'SIGN_IN' ? 'Welcome Back' : 'Join the Elite'}
            </h2>
            <p className="text-zinc-400 text-center text-sm">
              {mode === 'SIGN_IN' ? 'Enter the portal.' : 'Begin your journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            
            {mode === 'SIGN_UP' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-400 ml-1">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Alias"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink/50 transition-colors"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink/50 transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-400 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand-pink/50 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-6 bg-brand-gradient text-white font-medium py-3.5 rounded-xl shadow-lg shadow-brand-pink/25 hover:shadow-brand-pink/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {mode === 'SIGN_IN' ? 'Enter' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <span className="text-zinc-500">
              {mode === 'SIGN_IN' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              onClick={toggleMode}
              className="text-brand-orange hover:text-brand-pink transition-colors font-medium"
            >
              {mode === 'SIGN_IN' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Footer */}
      <div className="absolute bottom-6 text-zinc-600 text-xs flex items-center gap-2">
        <Sparkles size={12} />
        <span>Secured by NeonAuth Protocol</span>
      </div>
    </div>
  );
};