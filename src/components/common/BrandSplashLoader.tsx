import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BrandSplashLoaderProps {
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

export const BrandSplashLoader: React.FC<BrandSplashLoaderProps> = ({
  onComplete,
  duration = 2000,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing SmartSalt AI Platform...');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusText('Initializing SmartSalt AI Platform...');
      } else if (currentProgress < 65) {
        setStatusText('Connecting to LoRa Mesh Hardware Nodes...');
      } else if (currentProgress < 90) {
        setStatusText('Calibrating Salinity & Crystallization AI...');
      } else {
        setStatusText('System Ready');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 via-white to-slate-50 font-sans selection:bg-cyan-500 selection:text-white"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-8">
        {/* Animated Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-2 flex items-center justify-center"
        >
          {/* Subtle logo background glow */}
          <div className="absolute inset-0 bg-teal-500/15 rounded-full blur-xl animate-pulse pointer-events-none" />

          <img
            src="/sslogo-transparent.png"
            alt="SmartSalt AI"
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-md relative z-10"
          />
        </motion.div>

        {/* Progress Bar & Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full space-y-3"
        >
          {/* Progress Track */}
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-200/60">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full shadow-xs"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Status Label & Percentage */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span className="truncate max-w-[240px] text-left">{statusText}</span>
            <span className="font-mono font-bold text-teal-600 shrink-0">{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-8 text-[11px] font-semibold text-slate-400 uppercase tracking-widest"
      >
        Intelligent Salt Pan Telemetry
      </motion.div>
    </motion.div>
  );
};
