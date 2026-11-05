import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Film, Youtube, BookOpen, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to TFI Universe Cinema Dispatches!', 'success');
  };

  return (
    <footer className="w-full bg-[#050608] border-t border-stone-800/80 text-stone-400">
      {/* Newsletter Banner */}
      <div className="border-b border-stone-800/60 bg-gradient-to-r from-amber-950/20 via-[#0A0C10] to-amber-950/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-cinzel">
              TFI Universe Cinema Dispatch
            </h3>
            <p className="mt-1 text-sm text-stone-400">
              Receive curated filmmaking breakdowns, upcoming hero updates, and historical retrospectives directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto max-w-md gap-2">
            {!subscribed ? (
              <>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 min-w-[240px] px-3.5 py-2 text-sm bg-stone-900 border border-stone-700/80 rounded-md text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-md">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed to the Dispatch</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-amber-500 flex items-center justify-center text-black font-black text-xs">
              TFI
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-cinzel">
              TFI UNIVERSE
            </span>
          </div>
          <p className="text-sm text-stone-300 max-w-sm leading-relaxed">
            Beyond the Screen. Into the World of Telugu Cinema.
          </p>
          <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
            A comprehensive cultural archive, actor directory, and hands-on digital film academy dedicated to celebrating the artistry, technology, and legacy of Telugu cinema.
          </p>
          <div className="pt-2 text-xs text-stone-400 italic">
            "Don't just watch cinema. Understand it. Explore it. Create it."
          </div>
        </div>

        {/* Column: Cinema Encyclopedia */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold font-mono">
            Cinema Archive
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => {
                  setActivePage('heroes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Telugu Heroes Directory
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('movies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Masterpiece Movies
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('history');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Decades History Timeline
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('videos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                YouTube Video Hub
              </button>
            </li>
          </ul>
        </div>

        {/* Column: Filmmaking Academy */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold font-mono">
            Filmmaking Academy
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => {
                  setActivePage('academy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Pre-Production & Writing
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('academy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Production & Camera Work
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('academy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Post-Production & Sound
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('multimedia');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Multimedia & Animation
              </button>
            </li>
          </ul>
        </div>

        {/* Column: Creative Studio */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-stone-300 font-semibold font-mono">
            Interactive Studio
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => {
                  setActivePage('storyboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Interactive Storyboard Editor
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('studio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Camera Shot Planner
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('learning');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Camera Angle Explorer
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage('learning');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors"
              >
                Cinema Quizzes & Certification
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Quiet Copyright */}
      <div className="border-t border-stone-800/60 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div>
          © {new Date().getFullYear()} TFI UNIVERSE. All rights reserved. Built for cinema students and enthusiasts.
        </div>
        <div className="flex items-center gap-6 text-stone-400">
          <span>Telugu Cinema Heritage</span>
          <span aria-hidden="true">·</span>
          <span>Authentic Actor Archive</span>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setActivePage('admin')}
            className="hover:text-stone-200 transition-colors"
          >
            Curator Access
          </button>
        </div>
      </div>
    </footer>
  );
};
