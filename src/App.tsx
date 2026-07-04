import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Send, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

import AmbientBackground from './components/AmbientBackground';
import PriorityTicket from './components/PriorityTicket';
import { QueueState } from './types';

export default function App() {
  const placesLeft = 47;
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [queueState, setQueueState] = useState<QueueState | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('mz_priority_access');
      if (savedState) {
        const parsed = JSON.parse(savedState) as QueueState;
        setQueueState(parsed);
      }
    } catch (e) {
      console.warn('Unable to access localStorage on load:', e);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Veuillez saisir votre adresse email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Veuillez saisir une adresse email valide.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API call with timeout
    setTimeout(() => {
      const uniqueCode = `VIP-MZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomPosition = Math.floor(62 + Math.random() * 32);
      const now = new Date();
      const formattedDate = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }) + ` à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

      const newState: QueueState = {
        isRegistered: true,
        email: email,
        ticketNumber: uniqueCode,
        registeredAt: formattedDate,
        queuePosition: randomPosition,
        referralCode: `https://mzplus.app/vip/${uniqueCode.toLowerCase()}`
      };

      try {
        localStorage.setItem('mz_priority_access', JSON.stringify(newState));
      } catch (e) {
        console.warn('Unable to save to localStorage:', e);
      }
      setQueueState(newState);

      setIsSubmitting(false);
      setShowEmailForm(false);
    }, 1500);
  };

  // Dynamic progress percentage calculation based on original 1500 limit
  const baseLimit = 1500;
  const currentAssigned = baseLimit - placesLeft;
  const progressPercentage = parseFloat(((currentAssigned / baseLimit) * 100).toFixed(1));

  // Visual representation of progress using character blocks: ██████████████░░
  const totalBlocks = 16;
  const filledBlocks = Math.min(totalBlocks, Math.round((progressPercentage / 100) * totalBlocks));
  const emptyBlocks = totalBlocks - filledBlocks;
  const progressBlocks = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none" id="app-root-container">
      {/* Premium Ambient Light Background */}
      <AmbientBackground />

      {/* 1. Logo Centered Top */}
      <header className="flex justify-center pt-4 sm:pt-6 pb-2" id="app-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03 }}
          className="relative inline-flex items-center justify-center px-6 py-2.5 bg-[#030712]/90 border border-cyan-400/25 rounded-2xl shadow-[0_0_20px_rgba(0,194,255,0.12)] backdrop-blur-xl cursor-pointer"
        >
          <span className="font-display font-black text-xl sm:text-2xl tracking-widest text-white">
            MZ<span className="text-cyan-400 font-sans font-light text-lg sm:text-xl ml-0.5">+</span>
          </span>
          {/* Subtle logo shine effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </motion.div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col justify-center max-w-4xl w-full mx-auto my-8 space-y-8 sm:space-y-12" id="app-main-content">
        
        {/* Top Text Cluster (Badge, Large Title, Explication) */}
        <div className="space-y-5 text-center">
          
          {/* 2. Badge: AFFLUENCE EXCEPTIONNELLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block"
            id="exceptional-badge-container"
          >
            <motion.div
              animate={{ 
                borderColor: ['rgba(6, 182, 212, 0.25)', 'rgba(6, 182, 212, 0.65)', 'rgba(6, 182, 212, 0.25)'],
                boxShadow: [
                  '0 0 10px rgba(6, 182, 212, 0.05)', 
                  '0 0 20px rgba(6, 182, 212, 0.2)', 
                  '0 0 10px rgba(6, 182, 212, 0.05)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/20 border border-cyan-500/35 rounded-full text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              ⚡ Affluence exceptionnelle
            </motion.div>
          </motion.div>

          {/* 3. Gros titre */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-center max-w-3xl mx-auto leading-[1.15] text-white"
            id="main-title"
          >
            🚧 Oups… Nous rencontrons actuellement une forte affluence.
          </motion.h1>

          {/* 4. Explication */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4 text-center max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-400 font-sans leading-relaxed font-light"
            id="explication-paragraphs"
          >
            <p>
              Des milliers de personnes tentent actuellement d'accéder à <span className="text-cyan-400 font-semibold">MZ+</span> en même temps.
            </p>
            <p>
              Cette forte demande a momentanément saturé une partie de notre infrastructure. Notre équipe technique travaille activement pour rétablir la situation dans les meilleurs délais.
            </p>
            <p className="font-semibold text-cyan-300 bg-cyan-950/20 border border-cyan-500/10 py-2.5 px-4 rounded-xl inline-block">
              🎯 Bonne nouvelle : il reste encore {placesLeft} places disponibles pour cette ouverture.
            </p>
            <p>
              Dès que l'accès sera rétabli, nous te préviendrons immédiatement afin que tu puisses finaliser ton inscription avant que les dernières places ne soient attribuées.
            </p>
            <p className="text-gray-300 font-medium pt-1">
              Merci pour ta patience. ❤️
            </p>
          </motion.div>

        </div>

        {/* Dynamic Card Area (Places or Priority Ticket) */}
        <AnimatePresence mode="wait">
          {!queueState ? (
            <motion.div
              key="main-card-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-md w-full mx-auto"
            >
              {/* 5. Carte des places restantes */}
              <div className="relative group" id="places-left-card">
                {/* Back glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/25 to-blue-600/25 rounded-3xl blur-md group-hover:opacity-100 transition duration-700" />
                
                <div className="relative bg-[#070b14]/90 border border-cyan-500/25 p-6 sm:p-8 rounded-3xl shadow-[0_0_40px_rgba(0,194,255,0.12)] text-center backdrop-blur-xl">
                  {/* Fire Icon Pulsing */}
                  <div className="flex justify-center mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-3xl select-none"
                    >
                      🔥
                    </motion.div>
                  </div>
                  
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-cyan-400 font-mono font-medium">
                    Il reste encore
                  </p>
                  
                  {/* Huge Number */}
                  <motion.div 
                    key={placesLeft}
                    initial={{ scale: 0.85, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white my-3 tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,194,255,0.45)]"
                    id="places-count"
                  >
                    {placesLeft} places
                  </motion.div>
                  
                  <p className="text-[11px] sm:text-xs text-gray-400 font-sans leading-relaxed max-w-[260px] mx-auto italic">
                    "Une fois ces places attribuées, les inscriptions seront temporairement fermées."
                  </p>
                </div>
              </div>

              {/* 6. Barre de progression */}
              <div className="space-y-2 max-w-sm mx-auto" id="progress-bar-container">
                <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-gray-500">
                  <span className="text-cyan-400 font-semibold">{progressPercentage}%</span>
                  <span>PLACES ATTRIBUÉES</span>
                </div>
                
                {/* Blocks Display requested */}
                <div className="font-mono text-xs sm:text-sm text-cyan-500/80 tracking-widest text-center select-none bg-white/[0.01] py-1 border border-white/[0.03] rounded-md">
                  {progressBlocks}
                </div>

                <div className="text-[10px] sm:text-xs text-center text-gray-400 font-sans">
                  {progressPercentage}% des places prioritaires déjà attribuées
                </div>
              </div>

              {/* 7. Bouton principal & Email signup toggle */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {!showEmailForm ? (
                    <motion.button
                      key="cta-main-button"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0, 194, 255, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowEmailForm(true)}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_20px_rgba(0,194,255,0.2)] border border-cyan-400/30 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                      id="notify-reopen-btn"
                    >
                      <span className="text-base sm:text-lg">🔔</span> Me prévenir dès la réouverture
                    </motion.button>
                  ) : (
                    <motion.form
                      key="email-form-view"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      onSubmit={handleSubscribe}
                      className="space-y-4 p-5 rounded-2xl bg-[#090d18] border border-cyan-500/20 shadow-inner"
                      id="subscription-email-form"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-mono text-cyan-400 tracking-wider">RESERVER MON ACCÈS PRIORITAIRE</label>
                        <button 
                          type="button" 
                          onClick={() => setShowEmailForm(false)} 
                          className="text-[10px] text-gray-500 hover:text-white"
                        >
                          Annuler
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Saisissez votre adresse email..."
                          className="block w-full pl-10 pr-4 py-3 bg-[#03060d] border border-white/10 hover:border-cyan-500/30 focus:border-cyan-500 rounded-xl text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                          autoFocus
                          disabled={isSubmitting}
                          id="email-input-field"
                        />
                      </div>

                      {formError && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 font-sans" id="form-error-msg">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition duration-200 cursor-pointer disabled:opacity-50"
                        id="submit-priority-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Validation de la priorité...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Générer mon Pass Prioritaire VIP
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center gap-1.5 justify-center text-[9px] text-gray-500">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>Gratuit • Protection des données garantie par MZ+</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Digital VIP Pass Ticket is revealed */
            <motion.div key="ticket-view" className="w-full">
              <PriorityTicket state={queueState!} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 9. Message de confiance en bas */}
      <footer className="pt-8 pb-4 text-center space-y-2 border-t border-white/[0.03] max-w-xl mx-auto w-full" id="app-footer">
        <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
          Notre équipe technique travaille activement afin de rétablir l'accès complet. 
          Tu seras informé personnellement par email dès que les inscriptions régulières reprendront.
        </p>
        <div className="text-[8px] font-mono text-gray-600 tracking-wider">
          MZ+ NETWORK OPERATIONS CENTER • © 2026 MZ+
        </div>
      </footer>
    </div>
  );
}
