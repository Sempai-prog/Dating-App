import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Lock, Zap } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/95 backdrop-blur-xl"
    >
      <div className="w-full max-w-sm bg-zinc-900 border border-brand-pink/30 rounded-3xl p-6 text-center shadow-2xl shadow-brand-pink/10 relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center mb-6 shadow-lg shadow-brand-pink/40">
                <Flame size={32} className="text-white fill-white" />
            </div>

            <h2 className="text-3xl font-serif font-bold text-white mb-2">Out of Fuel?</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
                You've reached your daily limit. Refill your credits to unlock instant access to <span className="text-brand-pink font-bold">The Catalog</span>.
            </p>

            {/* Pricing Options */}
            <div className="grid gap-3 w-full mb-6">
                <button className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-pink/50 hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-brand-pink font-bold text-xs">
                            50
                        </div>
                        <span className="font-medium text-white">M-Credits</span>
                    </div>
                    <span className="text-brand-pink font-bold">$4.99</span>
                </button>

                <button className="relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-brand-pink/10 to-brand-orange/10 border border-brand-pink/50 transition-all">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-pink text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Best Value
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-xs">
                            ∞
                        </div>
                        <span className="font-medium text-white">VIP Access</span>
                    </div>
                    <span className="text-brand-pink font-bold">$19.99</span>
                </button>
            </div>

            <button onClick={onClose} className="text-zinc-500 text-sm hover:text-white transition-colors">
                No thanks, I'll wait 24h
            </button>
        </div>
      </div>
    </motion.div>
  );
};