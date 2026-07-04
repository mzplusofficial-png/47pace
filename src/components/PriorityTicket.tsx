import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Share2, Sparkles, ShieldCheck, BookmarkCheck } from 'lucide-react';
import { QueueState } from '../types';

interface PriorityTicketProps {
  state: QueueState;
}

export default function PriorityTicket({ state }: PriorityTicketProps) {
  const [copied, setCopied] = useState(false);

  const [shared, setShared] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(state.referralCode);
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
      id="priority-ticket-wrapper"
    >
      {/* Visual Header Spark */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono font-medium animate-pulse">
          <ShieldCheck className="w-3.5 h-3.5" />
          ACCÈS PRIORITAIRE ACTIVÉ
        </div>
      </div>

      {/* The Holographic Pass Card */}
      <div className="relative group">
        {/* Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-md opacity-30 group-hover:opacity-45 transition duration-1000" />
        
        <div className="relative bg-[#080b15]/95 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,194,255,0.15)]">
          {/* Top holographic stripe */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

          {/* Abstract background graphics inside ticket */}
          <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-cyan-500/10 blur-[40px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-blue-600/10 blur-[40px] pointer-events-none" />

          {/* Ticket Body */}
          <div className="p-6 sm:p-8">
            
            {/* Logo and Ticket Label */}
            <div className="flex justify-between items-start mb-6 pb-5 border-b border-white/10">
              <div>
                <span className="font-display font-black text-lg tracking-widest bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                  MZ<span className="text-cyan-400 font-sans font-light text-base ml-0.5">+</span>
                </span>
                <p className="text-[9px] font-mono tracking-widest text-gray-400 mt-1 uppercase">VIP ACCESS PASS</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
                  #{state.queuePosition}
                </span>
                <p className="text-[9px] text-gray-500 font-mono">POSITION FILE D'ATTENTE</p>
              </div>
            </div>

            {/* Middle QR Code & Code Area */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between my-6">
              
              {/* Left Column: Details */}
              <div className="space-y-4 text-center sm:text-left w-full sm:w-auto">
                <div>
                  <label className="block text-[9px] font-mono text-gray-500 tracking-wider uppercase mb-1">DÉTENTEUR</label>
                  <p className="text-sm font-semibold text-gray-200 truncate max-w-[200px]">{state.email}</p>
                </div>
                
                <div>
                  <label className="block text-[9px] font-mono text-gray-500 tracking-wider uppercase mb-1">DATE DE RÉSERVATION</label>
                  <p className="text-xs text-gray-300 font-mono">{state.registeredAt}</p>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-gray-500 tracking-wider uppercase mb-1">CODE D'ACTIVATION</label>
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                    <span className="text-xs font-mono font-bold text-white tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {state.ticketNumber}
                    </span>
                    <button 
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                      title="Copier le code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Beautiful custom vector QR Code */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex-shrink-0 group-hover:border-cyan-500/20 transition-all duration-300 shadow-inner">
                <svg className="w-24 h-24 text-cyan-400" viewBox="0 0 100 100" fill="currentColor">
                  {/* Decorative QR layout with high-end tech dots */}
                  {/* Outer Frame */}
                  <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="3" rx="2" />
                  <rect x="10" y="10" width="15" height="15" fill="currentColor" rx="1" />

                  <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="3" rx="2" />
                  <rect x="75" y="10" width="15" height="15" fill="currentColor" rx="1" />

                  <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="3" rx="2" />
                  <rect x="10" y="75" width="15" height="15" fill="currentColor" rx="1" />

                  {/* Random simulated code dots */}
                  <rect x="40" y="5" width="6" height="6" rx="1" />
                  <rect x="55" y="12" width="6" height="6" rx="1" />
                  <rect x="45" y="24" width="6" height="6" rx="1" />

                  <rect x="40" y="40" width="12" height="12" rx="2" />
                  <rect x="58" y="42" width="6" height="6" rx="1" />
                  <rect x="42" y="58" width="6" height="6" rx="1" />

                  <rect x="70" y="40" width="6" height="6" rx="1" />
                  <rect x="85" y="45" width="8" height="8" rx="1.5" />
                  <rect x="72" y="60" width="6" height="6" rx="1" />

                  <rect x="40" y="72" width="6" height="6" rx="1" />
                  <rect x="52" y="80" width="10" height="10" rx="2" />
                  <rect x="45" y="88" width="6" height="6" rx="1" />

                  <rect x="75" y="75" width="12" height="12" rx="2" />
                  <rect x="90" y="88" width="5" height="5" rx="1" />
                  <rect x="70" y="90" width="6" height="6" rx="1" />
                </svg>
                <div className="text-[7px] text-center font-mono tracking-widest text-gray-500 mt-1">SECURE SCAN</div>
              </div>

            </div>

            {/* Footer Notice */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 justify-between">
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>RANG PRIORITAIRE GARANTI</span>
              </div>
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                STATUS: ACTIF
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Post Registration Advice */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
          Un email de confirmation contenant vos accès prioritaires vient de vous être envoyé. Notre équipe vous contactera en premier dès l'ouverture des serveurs.
        </p>
        
        {/* Actions under card */}
        <div className="flex gap-3 justify-center pt-2">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-200 hover:text-white rounded-xl transition duration-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copier mon code
              </>
            )}
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-400 rounded-xl transition duration-200 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            {shared ? "Lien VIP copié !" : "Partager mon lien VIP"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
