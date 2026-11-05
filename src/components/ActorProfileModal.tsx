import React, { useState } from 'react';
import { Actor } from '../types';
import { useApp } from '../context/AppContext';
import { AuthenticActorImage } from './AuthenticActorImage';
import {
  X,
  Heart,
  Youtube,
  ExternalLink,
  Award,
  Calendar,
  Film,
  MapPin,
  Sparkles,
  Search,
  CheckCircle,
  Play
} from 'lucide-react';

interface ActorProfileModalProps {
  actor: Actor;
  onClose: () => void;
}

export const ActorProfileModal: React.FC<ActorProfileModalProps> = ({ actor, onClose }) => {
  const { user, toggleFavouriteActor, movies, setSelectedMovie, actors, setSelectedActor } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'filmography' | 'youtube' | 'awards'>('overview');
  const isFav = user.favouriteActorIds.includes(actor.id);

  // Related movies from database
  const relatedMovies = movies.filter(
    m => m.heroId === actor.id || m.heroName.toLowerCase().includes(actor.name.toLowerCase())
  );

  // Related peer actors from the same generation
  const relatedActors = actors.filter(a => a.generation === actor.generation && a.id !== actor.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0B0D12] rounded-xl border border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar with Close and Favourite */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-[#08090C]/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold">
              Actor Profile
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-sm font-bold text-white font-cinzel truncate max-w-xs sm:max-w-md">
              {actor.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavouriteActor(actor.id)}
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
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Top Hero Banner Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <AuthenticActorImage
                src={actor.photoUrl}
                actorName={actor.name}
                generation={actor.generation}
                aspectRatio="portrait"
                className="rounded-lg border border-stone-800 shadow-lg"
              />
              <div className="mt-3 text-center">
                <span className="text-[11px] text-stone-400 uppercase tracking-widest">
                  Verified Authentic Portrait
                </span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {actor.title}
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
                    {actor.name}
                  </h1>
                  {actor.teluguName && (
                    <span className="text-lg text-stone-400 font-sans">
                      {actor.teluguName}
                    </span>
                  )}
                </div>
              </div>

              {/* Accession Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#0F1218] border border-stone-800/80 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Generation</span>
                  <span className="text-stone-200 font-medium">{actor.generation} Era</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Debut Year</span>
                  <span className="text-stone-200 font-medium">{actor.debutYear} ({actor.debutMovie})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Birth & Origin</span>
                  <span className="text-stone-200 font-medium">{actor.birthYear} · {actor.birthPlace}</span>
                </div>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {actor.biography}
              </p>

              {/* Quick Jump Tabs */}
              <div className="flex items-center gap-1 border-b border-stone-800 pt-2">
                {(['overview', 'filmography', 'youtube', 'awards'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-2 text-xs font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-amber-400 text-amber-400 font-semibold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {tab === 'youtube' ? `Watch on YouTube` : tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Early Life */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                  Early Life & Roots
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed bg-[#0E1116] p-4 rounded-lg border border-stone-800/70">
                  {actor.earlyLife}
                </p>
              </div>

              {/* Career Milestones */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                  Key Career Milestones
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {actor.careerMilestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0E1116] border border-stone-800/70 text-xs text-stone-300 flex items-start gap-3"
                    >
                      <span className="text-amber-400 font-mono text-xs font-bold mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable Performances */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                  Landmark Performances
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {actor.notablePerformances.map((perf, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#0E1116] border border-stone-800/70 space-y-1.5"
                    >
                      <div className="flex items-baseline justify-between">
                        <h4 className="text-sm font-bold text-white font-cinzel">
                          {perf.movie}
                        </h4>
                        <span className="text-[11px] text-amber-400 font-mono">{perf.year}</span>
                      </div>
                      <p className="text-xs text-amber-300/80 font-medium">Role: {perf.role}</p>
                      <p className="text-xs text-stone-400 leading-relaxed">{perf.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Upcoming Projects */}
              {actor.upcomingProjects && actor.upcomingProjects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                    Verified Upcoming Projects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {actor.upcomingProjects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-md bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FILMOGRAPHY */}
          {activeTab === 'filmography' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                  Filmography ({actor.filmography.length} Featured Titles)
                </h3>
                <span className="text-xs text-stone-400">Chronological selection</span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-stone-800 bg-[#0E1116]">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-[#12151D] border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                    <tr>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Movie Title</th>
                      <th className="py-3 px-4">Character Role</th>
                      <th className="py-3 px-4">Director</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-sans">
                    {actor.filmography.map((film, idx) => (
                      <tr key={idx} className="hover:bg-stone-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-amber-400">{film.year}</td>
                        <td className="py-3 px-4 font-bold text-white">{film.title}</td>
                        <td className="py-3 px-4 text-stone-300">{film.role || '—'}</td>
                        <td className="py-3 px-4 text-stone-400">{film.director || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WATCH ON YOUTUBE (MAJOR PROMPT FEATURE) */}
          {activeTab === 'youtube' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Mandatory Prominent Header */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-red-950/40 via-[#12151D] to-black border border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-red-400">
                    <Youtube className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold">
                      Official YouTube Integration
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-cinzel mt-1">
                    WATCH {actor.name.toUpperCase()} ON YOUTUBE
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Browse verified trailers, press meets, interviews, and behind-the-scenes clips.
                  </p>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    `${actor.name} Telugu cinema full movie trailers interviews`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  <span>Search All on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Curated Verified Videos */}
              {actor.featuredVideos && actor.featuredVideos.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Curated Verified Videos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {actor.featuredVideos.map((vid, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0E1116] rounded-lg border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-red-500/40 transition-all"
                      >
                        <div className="relative aspect-video bg-black overflow-hidden group">
                          <img
                            src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                            alt={vid.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">
                              {vid.category}
                            </span>
                            <h5 className="text-xs font-semibold text-white line-clamp-2 mt-0.5">
                              {vid.title}
                            </h5>
                            <p className="text-[11px] text-stone-400 mt-1">{vid.channel}</p>
                          </div>

                          <a
                            href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-1.5 px-3 rounded bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Watch on YouTube</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific YouTube Search Redirection Buttons (Prompt Requirement C) */}
              <div className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono font-semibold">
                  Direct Topic Search On YouTube
                </h4>
                <p className="text-xs text-stone-400">
                  Click any category below to immediately open verified, tailored YouTube searches for {actor.name}:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      actor.youtubeSearchQueries.interviews
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 text-xs text-stone-200 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{actor.name} Interviews</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  </a>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      actor.youtubeSearchQueries.trailers
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 text-xs text-stone-200 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{actor.name} Movie Trailers & Teasers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  </a>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      actor.youtubeSearchQueries.bts
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 text-xs text-stone-200 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{actor.name} Behind the Scenes & Making</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  </a>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      actor.youtubeSearchQueries.speeches
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-red-500/50 text-xs text-stone-200 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{actor.name} Speeches & Events</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AWARDS */}
          {activeTab === 'awards' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
                Awards & Recognitions
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {actor.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#0E1116] border border-stone-800 flex items-center gap-3 text-xs text-stone-200"
                  >
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Movies in Database */}
          {relatedMovies.length > 0 && (
            <div className="pt-6 border-t border-stone-800/80 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                Featured Movies in TFI Universe
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedMovies.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      onClose();
                      setSelectedMovie(movie);
                    }}
                    className="p-3 rounded-lg bg-[#0E1116] border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <Film className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate font-cinzel">
                        {movie.title}
                      </p>
                      <p className="text-[11px] text-stone-400">
                        {movie.year} · Dir. {movie.director}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Peer Actors */}
          {relatedActors.length > 0 && (
            <div className="pt-4 border-t border-stone-800/80 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                Other {actor.generation} Generation Heroes
              </h4>
              <div className="flex flex-wrap gap-2">
                {relatedActors.map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => setSelectedActor(rel)}
                    className="px-3 py-1.5 rounded bg-stone-900 border border-stone-800 hover:border-amber-400/50 text-xs text-stone-300 hover:text-white transition-colors"
                  >
                    {rel.name}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
