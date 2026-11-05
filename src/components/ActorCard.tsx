import React from 'react';
import { Actor } from '../types';
import { useApp } from '../context/AppContext';
import { AuthenticActorImage } from './AuthenticActorImage';
import { Heart, Play, ArrowRight, Video } from 'lucide-react';

interface ActorCardProps {
  actor: Actor;
}

export const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const { setSelectedActor, user, toggleFavouriteActor } = useApp();
  const isFav = user.favouriteActorIds.includes(actor.id);

  return (
    <div className="group relative bg-[#0D0F14] rounded-lg border border-stone-800/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/60">
      
      {/* Top Media: Authentic Actor Portrait */}
      <div
        className="cursor-pointer relative overflow-hidden"
        onClick={() => setSelectedActor(actor)}
      >
        <AuthenticActorImage
          src={actor.photoUrl}
          actorName={actor.name}
          generation={actor.generation}
          aspectRatio="portrait"
        />

        {/* Floating Quick Action: Favourite */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavouriteActor(actor.id);
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

        {/* Moniker Ribbon */}
        {actor.title && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 drop-shadow-md">
              {actor.title}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3
              onClick={() => setSelectedActor(actor)}
              className="text-base font-bold text-white font-cinzel hover:text-amber-400 transition-colors cursor-pointer truncate"
            >
              {actor.name}
            </h3>
            {actor.teluguName && (
              <span className="text-xs text-stone-400 font-sans shrink-0">
                {actor.teluguName}
              </span>
            )}
          </div>

          {/* Clean unboxed metadata discipline (§1.A) */}
          <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
            <span>{actor.generation} Era</span>
            <span aria-hidden="true">·</span>
            <span>Debut {actor.debutYear}</span>
            {actor.deathYear && (
              <>
                <span aria-hidden="true">·</span>
                <span>1923–{actor.deathYear}</span>
              </>
            )}
          </div>

          <p className="mt-2 text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {actor.biography}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
          {/* Quick YouTube redirection link */}
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
              `${actor.name} Telugu cinema interviews trailers`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
            title={`Watch ${actor.name} on YouTube`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </a>

          {/* Profile details trigger */}
          <button
            onClick={() => setSelectedActor(actor)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group-hover:translate-x-0.5"
          >
            <span>Full Profile</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
