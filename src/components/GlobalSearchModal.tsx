import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, User, Film, Video, BookOpen, ChevronRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    actors,
    movies,
    videos,
    setSelectedActor,
    setSelectedMovie,
    setActivePage
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global hotkey: Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedActors = cleanQuery
    ? actors.filter(
        a =>
          a.name.toLowerCase().includes(cleanQuery) ||
          a.title.toLowerCase().includes(cleanQuery) ||
          a.biography.toLowerCase().includes(cleanQuery) ||
          (a.teluguName && a.teluguName.includes(cleanQuery))
      ).slice(0, 5)
    : [];

  const matchedMovies = cleanQuery
    ? movies.filter(
        m =>
          m.title.toLowerCase().includes(cleanQuery) ||
          m.director.toLowerCase().includes(cleanQuery) ||
          m.heroName.toLowerCase().includes(cleanQuery) ||
          m.genre.some(g => g.toLowerCase().includes(cleanQuery))
      ).slice(0, 5)
    : [];

  const matchedVideos = cleanQuery
    ? videos.filter(
        v =>
          v.title.toLowerCase().includes(cleanQuery) ||
          v.category.toLowerCase().includes(cleanQuery) ||
          (v.heroName && v.heroName.toLowerCase().includes(cleanQuery))
      ).slice(0, 5)
    : [];

  const hasResults = matchedActors.length > 0 || matchedMovies.length > 0 || matchedVideos.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#0D0F14] rounded-xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-800 bg-[#090B0E]">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Telugu heroes, movies, YouTube clips, filmmaking..."
            className="w-full bg-transparent text-sm text-white placeholder-stone-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-500 hover:text-stone-300 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 rounded text-xs text-stone-400 hover:text-white bg-stone-800 border border-stone-700"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-stone-400">
                Type an actor, movie, director, or topic to search across the entire TFI Universe.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['Prabhas', 'Mahesh Babu', 'Pushpa', 'RRR', 'Storyboarding', 'Camera Angles'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 hover:border-amber-400/50 text-xs text-stone-300 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-10 text-center text-xs text-stone-400">
              No results found for "{query}". Try searching for another actor or movie.
            </div>
          ) : (
            <>
              {/* Actors Results */}
              {matchedActors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-mono">
                    Telugu Heroes ({matchedActors.length})
                  </span>
                  <div className="space-y-1">
                    {matchedActors.map(actor => (
                      <div
                        key={actor.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedActor(actor);
                        }}
                        className="p-2.5 rounded-lg bg-[#12151D] hover:bg-stone-800/80 border border-stone-800/60 hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                            {actor.name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white font-cinzel">
                              {actor.name}
                            </p>
                            <p className="text-[11px] text-stone-400">
                              {actor.title} · {actor.generation} Era
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Movies Results */}
              {matchedMovies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-mono">
                    Movies ({matchedMovies.length})
                  </span>
                  <div className="space-y-1">
                    {matchedMovies.map(movie => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedMovie(movie);
                        }}
                        className="p-2.5 rounded-lg bg-[#12151D] hover:bg-stone-800/80 border border-stone-800/60 hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Film className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-white font-cinzel">
                              {movie.title} ({movie.year})
                            </p>
                            <p className="text-[11px] text-stone-400">
                              Dir. {movie.director} · {movie.heroName}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Results */}
              {matchedVideos.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400 font-mono">
                    YouTube Videos ({matchedVideos.length})
                  </span>
                  <div className="space-y-1">
                    {matchedVideos.map(vid => (
                      <a
                        key={vid.id}
                        href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-[#12151D] hover:bg-stone-800/80 border border-stone-800/60 hover:border-red-500/40 transition-all flex items-center justify-between block"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Video className="w-4 h-4 text-red-400 shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-white truncate">
                              {vid.title}
                            </p>
                            <p className="text-[11px] text-stone-400">
                              {vid.category} · {vid.channelName}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#08090C] border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <span>Search TFI Universe Archive</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
