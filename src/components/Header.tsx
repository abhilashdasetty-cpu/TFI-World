import React, { useState } from 'react';
import { useApp, PageId } from '../context/AppContext';
import { Search, Film, User, Shield, Bookmark, ChevronDown, Menu, X, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { activePage, setActivePage, setIsSearchOpen, user, setAdminRole } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const primaryNavItems: { id: PageId; label: string }[] = [
    { id: 'heroes', label: 'Telugu Heroes' },
    { id: 'movies', label: 'Movies' },
    { id: 'videos', label: 'Videos' },
    { id: 'academy', label: 'Filmmaking' },
    { id: 'storyboard', label: 'Storyboard Studio' },
    { id: 'studio', label: 'Tools' }
  ];

  const secondaryNavItems: { id: PageId; label: string }[] = [
    { id: 'multimedia', label: 'Multimedia & Animation' },
    { id: 'history', label: 'Cinema History' },
    { id: 'learning', label: 'Learning & Quizzes' },
    { id: 'about', label: 'About TFI Universe' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090C]/95 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Wordmark Brand Zone */}
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 text-left shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs tracking-tighter shadow-sm group-hover:shadow-amber-500/20 transition-all">
            TFI
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-cinzel whitespace-nowrap">
            TFI UNIVERSE
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
          {primaryNavItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 py-1 text-stone-300 hover:text-white transition-colors whitespace-nowrap">
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-0 mt-2 w-56 rounded-md bg-[#0F1218] border border-stone-800 shadow-xl py-2 hidden group-hover:block transition-all z-50">
              {secondaryNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                    activePage === item.id
                      ? 'text-amber-400 bg-amber-500/10 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Zone 3: Actions (Search + Profile & Admin) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Global Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700/60 text-xs text-stone-300 hover:text-white transition-colors whitespace-nowrap"
            title="Search Heroes, Movies, Lessons (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Search Universe</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-stone-800 border border-stone-700 rounded text-stone-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* User Profile / Admin Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1.5 rounded-md bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white transition-all"
              title="User Account"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs font-medium max-w-[80px] truncate">
                {user.role === 'admin' ? 'Admin' : 'Member'}
              </span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-md bg-[#0F1218] border border-stone-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-stone-800/80">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                    {user.role === 'admin' ? 'Administrator' : 'Cinema Enthusiast'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActivePage('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-stone-800 hover:text-white flex items-center gap-2"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>My Favourites & Projects</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('admin');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-stone-800 hover:text-white flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Dashboard</span>
                </button>

                <div className="border-t border-stone-800/80 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setAdminRole(user.role !== 'admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-1.5 text-[11px] text-stone-400 hover:text-stone-200"
                  >
                    Toggle Role ({user.role === 'admin' ? 'Switch to Member' : 'Switch to Admin'})
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-[#0A0C10] px-4 pt-3 pb-6 space-y-1">
          {[...primaryNavItems, ...secondaryNavItems].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activePage === item.id
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800/80 flex gap-2">
            <button
              onClick={() => {
                setActivePage('profile');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-medium rounded bg-stone-900 border border-stone-800 text-stone-200"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                setActivePage('admin');
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-medium rounded bg-amber-500 text-black font-semibold"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
