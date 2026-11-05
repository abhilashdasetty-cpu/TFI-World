import React from 'react';
import { Movie } from '../types';
import { useApp } from '../context/AppContext';
import { X, Heart, Play, Award, Film, User, ExternalLink, Calendar, Video } from 'lucide-react';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  const { user, toggleFavouriteMovie, actors, setSelectedActor } = useApp();
  const isFav = user.favouriteMovieIds.includes(movie.id);

  // Check if lead hero matches an actor in our directory
  const matchedActor = actors.find(
    a => a.id === movie.heroId || movie.heroName.toLowerCase().includes(a.name.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B0D12] rounded-xl border border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-[#08090C]/90 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs">
            <span className="uppercase tracking-widest text-amber-400 font-mono font-semibold">
              Film Archive
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-sm font-bold text-white font-cinzel truncate max-w-xs sm:max-w-md">
              {movie.title} ({movie.year})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavouriteMovie(movie.id)}
              className={`p-2 rounded-md transition-colors ${
                isFav
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700'
              }`}
              title={isFav ? 'Remove from favourites' : 'Save to favourites'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Top Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1">
              <div className="rounded-lg overflow-hidden border border-stone-800 aspect-[2/3] bg-black">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {movie.youtubeTrailerId && (
                <a
                  href={`https://www.youtube.com/watch?v=${movie.youtubeTrailerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2 px-4 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Official Trailer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="sm:col-span-2 space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
                    {movie.title}
                  </h1>
                  {movie.teluguTitle && (
                    <span className="text-lg text-stone-400 font-sans">{movie.teluguTitle}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                  <span>Released {movie.releaseDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{movie.genre.join(', ')}</span>
                </div>
              </div>

              {movie.boxOfficeStatus && (
                <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium">
                  {movie.boxOfficeStatus}
                </div>
              )}

              {/* Lead Hero Link */}
              <div className="p-3.5 rounded-lg bg-[#0E1116] border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Lead Hero</span>
                  <span className="text-sm font-bold text-white">{movie.heroName}</span>
                </div>
                {matchedActor && (
                  <button
                    onClick={() => {
                      onClose();
                      setSelectedActor(matchedActor);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium underline flex items-center gap-1"
                  >
                    <span>View Actor Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Synopsis */}
              <div className="space-y-1">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                  Synopsis
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed bg-[#0E1116] p-4 rounded-lg border border-stone-800">
                  {movie.synopsis}
                </p>
              </div>

              {/* Technical Cast & Crew */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-[#0E1116] border border-stone-800 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Director</span>
                  <span className="text-white font-medium">{movie.director}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Producer</span>
                  <span className="text-white font-medium">{movie.producer}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Music Director</span>
                  <span className="text-white font-medium">{movie.musicDirector}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Cinematographer</span>
                  <span className="text-white font-medium">{movie.cinematographer}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 block text-[11px]">Editor</span>
                  <span className="text-white font-medium">{movie.editor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Awards */}
          {movie.awards && movie.awards.length > 0 && (
            <div className="pt-4 border-t border-stone-800 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Awards & Honours</span>
              </h4>
              <div className="space-y-1.5">
                {movie.awards.map((award, i) => (
                  <div
                    key={i}
                    className="p-3 rounded bg-[#0E1116] border border-stone-800 text-xs text-stone-300"
                  >
                    {award}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video Discovery Search Link for this movie */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400">Want more clips and interviews from {movie.title}?</span>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                `${movie.title} Telugu movie scenes making interview`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Search {movie.title} on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
