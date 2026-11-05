import React from 'react';
import { Movie } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Play, ArrowRight, User } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setSelectedMovie, user, toggleFavouriteMovie } = useApp();
  const isFav = user.favouriteMovieIds.includes(movie.id);

  return (
    <div className="group relative bg-[#0D0F14] rounded-lg border border-stone-800/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/70">
      
      {/* Poster */}
      <div
        className="cursor-pointer relative overflow-hidden aspect-[2/3] bg-[#12151D]"
        onClick={() => setSelectedMovie(movie)}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Favourite Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavouriteMovie(movie.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFav
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-black/50 text-stone-300 hover:text-white border border-stone-700/50'
          }`}
          title={isFav ? 'Remove from favourites' : 'Save to favourites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Gradient Scrim */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Box Office / Year badge on bottom of poster */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px]">
          <span className="font-mono text-amber-400 font-semibold">{movie.year}</span>
          {movie.boxOfficeStatus && (
            <span className="text-stone-300 text-[10px] truncate max-w-[140px]">
              {movie.boxOfficeStatus.split('(')[0]}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3
            onClick={() => setSelectedMovie(movie)}
            className="text-base font-bold text-white font-cinzel hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {movie.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1">
            <span>Dir. {movie.director}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.heroName}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1.5 flex-wrap">
            {movie.genre.slice(0, 3).map((g, i) => (
              <span key={g}>
                {g}
                {i < Math.min(movie.genre.length, 3) - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>

          <p className="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {movie.synopsis}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
          {movie.youtubeTrailerId ? (
            <a
              href={`https://www.youtube.com/watch?v=${movie.youtubeTrailerId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Trailer</span>
            </a>
          ) : (
            <span className="text-[11px] text-stone-400">Classics</span>
          )}

          <button
            onClick={() => setSelectedMovie(movie)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
