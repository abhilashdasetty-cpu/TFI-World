import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActorCard } from '../components/ActorCard';
import { MovieCard } from '../components/MovieCard';
import { YouTubeVideoCard } from '../components/YouTubeVideoCard';
import { PRODUCTION_PIPELINE_STAGES } from '../data/academyData';
import { TELUGU_CINEMA_HISTORY } from '../data/historyData';
import {
  Film,
  Sparkles,
  ArrowRight,
  Play,
  Video,
  Layers,
  Clapperboard,
  Tv,
  Award,
  ChevronRight,
  ExternalLink,
  BookOpen,
  PenTool,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, actors, movies, videos, setSelectedActor, setSelectedMovie } = useApp();
  const [selectedPipelineStep, setSelectedPipelineStep] = useState(PRODUCTION_PIPELINE_STAGES[0]);
  const [heroGenerationFilter, setHeroGenerationFilter] = useState<'All' | 'Established' | 'Senior' | 'Legendary' | 'Contemporary'>('All');

  const filteredActors = heroGenerationFilter === 'All'
    ? actors
    : actors.filter(a => a.generation === heroGenerationFilter);

  const legendaryIcons = actors.filter(a => a.generation === 'Legendary');
  const featuredMovies = movies.filter(m => m.featured);
  const trendingVideos = videos.slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      
      {/* ============================================================ */}
      {/* 1. CINEMATIC HERO SECTION                                    */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#08090C] via-[#0D1017] to-[#08090C] border-b border-stone-800/80">
        
        {/* Background Visual Texture with Atmospheric Film Gradients */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#252a36_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Ambient Warm Golden Spotlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-8 z-10">
          
          {/* Quiet Kicker (Zero-pill discipline §1.A) */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400">
            <span>The Definitive Telugu Cinema Encyclopedia</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1931 to Global Era</span>
          </div>

          {/* Headline with Balanced Typography (§1.D) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-cinzel text-balance leading-[1.1]">
            Beyond the Screen.{' '}
            <span className="gold-gradient-text block mt-1">
              Into the World of Telugu Cinema.
            </span>
          </h1>

          {/* Brand Philosophy */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Don't just watch cinema. Understand it. Explore it. Create it. Discover legendary Telugu heroes, master filmographies, verified YouTube clips, and a full-stack digital filmmaking academy.
          </p>

          {/* Three Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('heroes')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-md transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Explore Telugu Heroes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('academy')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-200 bg-stone-900 hover:bg-stone-800 hover:text-white border border-stone-700 rounded-md transition-all flex items-center gap-2"
            >
              <Clapperboard className="w-4 h-4 text-amber-400" />
              <span>Explore Filmmaking</span>
            </button>

            <button
              onClick={() => setActivePage('videos')}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-200 bg-stone-900 hover:bg-stone-800 hover:text-white border border-stone-700 rounded-md transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-red-400" />
              <span>Discover Videos</span>
            </button>
          </div>

          {/* Operational Strip */}
          <div className="pt-8 border-t border-stone-800/60 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <span>12+ Iconic Male Telugu Superstars</span>
            <span aria-hidden="true">·</span>
            <span>100+ Verified YouTube Clips</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Storyboard Studio</span>
            <span aria-hidden="true">·</span>
            <span>3 Production Stages</span>
          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 2. FEATURED TELUGU HEROES & GENERATION SELECTOR               */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              The Titan Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel mt-1">
              Featured Telugu Heroes
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              Authentic verified portraits, filmographies, and direct YouTube discovery for Telugu male actors across four cinematic generations.
            </p>
          </div>

          {/* Interactive Filter Control (§1.A: Allowed functional button tabs) */}
          <div className="flex items-center gap-1 p-1 bg-[#12151D] border border-stone-800 rounded-lg overflow-x-auto">
            {(['All', 'Established', 'Senior', 'Legendary', 'Contemporary'] as const).map(gen => (
              <button
                key={gen}
                onClick={() => setHeroGenerationFilter(gen)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  heroGenerationFilter === gen
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {gen}
              </button>
            ))}
          </div>
        </div>

        {/* Actor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActors.slice(0, 8).map(actor => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActivePage('heroes')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-stone-900 border border-stone-800 hover:border-amber-400/50 text-xs font-semibold text-stone-200 hover:text-white transition-all"
          >
            <span>View All {actors.length} Telugu Heroes</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. LEGENDARY ICONS OF TELUGU CINEMA                          */}
      {/* ============================================================ */}
      <section className="bg-[#0A0C10] border-y border-stone-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              The Founding Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
              Legendary Icons of Telugu Cinema
            </h2>
            <p className="text-xs text-stone-400">
              The four towering stalwarts who established Telugu cinema's mythological majesty, romantic poetics, technical innovations, and cultural identity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {legendaryIcons.map(icon => (
              <div
                key={icon.id}
                onClick={() => setSelectedActor(icon)}
                className="group relative bg-[#0F1218] rounded-lg border border-stone-800 p-4 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-[3/4] rounded-md overflow-hidden bg-black border border-stone-800 relative">
                    <img
                      src={icon.photoUrl}
                      alt={icon.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent">
                      <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                        {icon.title}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-cinzel group-hover:text-amber-400 transition-colors">
                      {icon.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                      {icon.biography}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80 mt-3 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-mono text-[11px]">Debut {icon.debutYear}</span>
                  <span className="text-stone-300 group-hover:text-amber-300 flex items-center gap-1 font-medium">
                    Profile <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. POPULAR TELUGU MOVIES & MASTERPIECES                      */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              The Filmography Vault
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel mt-1">
              Popular Telugu Movies & Masterpieces
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              From Mayabazar (1957) to global phenomena like RRR and Kalki 2898 AD.
            </p>
          </div>

          <button
            onClick={() => setActivePage('movies')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
          >
            <span>Explore All Movies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMovies.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. TRENDING HERO VIDEOS & CINEMA CLIPS                       */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Video className="w-4 h-4" />
              <span>YouTube Video Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel mt-1">
              Trending Hero Videos & Cinema Clips
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Curated official interviews, making videos, and high-octane teasers directly linked to YouTube.
            </p>
          </div>

          <button
            onClick={() => setActivePage('videos')}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 shrink-0"
          >
            <span>Explore All Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingVideos.map(video => (
            <YouTubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. INTERACTIVE PRODUCTION PIPELINE (Clickable 9-stage map)   */}
      {/* ============================================================ */}
      <section className="bg-[#0A0C10] border-y border-stone-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              The 3 Stages of Film Production
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
              Interactive Production Pipeline
            </h2>
            <p className="text-xs text-stone-400">
              Click any stage below to explore how high-concept Telugu cinematic blockbusters evolve from an initial spark into a global theatrical master release.
            </p>
          </div>

          {/* Clickable Pipeline Track */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {PRODUCTION_PIPELINE_STAGES.map((step, idx) => {
              const isSelected = selectedPipelineStep.id === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedPipelineStep(step)}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-[#0E1116] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    0{idx + 1}
                  </span>
                  <div className="mt-2">
                    <p className="text-xs font-bold leading-tight font-cinzel">
                      {step.name}
                    </p>
                    <span className="text-[9px] text-stone-400 block mt-0.5 truncate">
                      {step.stageGroup}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Panel */}
          <div className="p-6 rounded-xl bg-[#0F1218] border border-stone-800 space-y-5 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                  {selectedPipelineStep.stageGroup} Stage
                </span>
                <h3 className="text-xl font-bold text-white font-cinzel mt-0.5">
                  {selectedPipelineStep.name}
                </h3>
              </div>

              <button
                onClick={() => setActivePage('academy')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Full Academy Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <p className="text-sm text-stone-300 leading-relaxed">
                  {selectedPipelineStep.detailedOverview}
                </p>

                {/* Case Study */}
                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider block">
                    Telugu Cinema Craft Example
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed italic">
                    "{selectedPipelineStep.teluguCinemaReference}"
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-[#090B0E] p-4 rounded-lg border border-stone-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block font-semibold">
                  Key Deliverables
                </span>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {selectedPipelineStep.keyToolsAndDeliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 7. INTERACTIVE STORYBOARD STUDIO PREVIEW                     */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-amber-950/20 via-[#0E1116] to-[#0A0C10] border border-amber-500/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Creative Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-cinzel leading-tight">
              Interactive Storyboard Studio
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Design professional cinematic storyboards with aspect ratio selection, shot types, camera angles, movement notations, canvas sketching, animatic playback, and instant PDF export.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs text-stone-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Full Shot Sizing & Angles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Interactive HTML5 Sketch Pad</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Real-Time Animatic Player</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Printable PDF Export</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActivePage('storyboard')}
                className="px-6 py-3 rounded-md bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Launch Storyboard Studio</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Mock Panel */}
          <div className="bg-[#090B0E] p-5 rounded-xl border border-stone-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-3">
              <span className="font-mono text-amber-400">PROJECT: Forest Ambush (Scene 14)</span>
              <span>2.39:1 Anamorphic</span>
            </div>

            <div className="aspect-[2.39/1] bg-[#12151D] rounded border border-stone-800 flex items-center justify-center relative overflow-hidden p-4">
              <div className="text-center space-y-1">
                <span className="text-xs text-amber-300 font-mono">PANEL 02 · LOW ANGLE MEDIUM SHOT</span>
                <p className="text-[11px] text-stone-400 italic">"Pushpa shifts gears into 4WD as lorry approaches the wooden ravine bridge"</p>
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-stone-500 font-mono">
                Duration: 3.5s · Lens: 50mm
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <span>Director: Sukumar</span>
              <span className="text-amber-400 font-mono">3 Panels Ready</span>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 8. TELUGU CINEMA HISTORY TIMELINE PREVIEW                   */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Centenary Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel mt-1">
              Telugu Cinema Through the Decades
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Explore the historical evolution from 1930s talkies to the Pan-Indian global era.
            </p>
          </div>

          <button
            onClick={() => setActivePage('history')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
          >
            <span>Full Decades Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TELUGU_CINEMA_HISTORY.slice(0, 3).map(era => (
            <div
              key={era.decade}
              onClick={() => setActivePage('history')}
              className="p-5 rounded-lg bg-[#0E1116] border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-3"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-amber-400 font-mono">{era.decade}</span>
                <span className="text-xs text-stone-500">{era.yearRange}</span>
              </div>
              <h3 className="text-base font-bold text-white font-cinzel">{era.eraTitle}</h3>
              <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                {era.summary}
              </p>
              <div className="pt-2 text-xs text-amber-400 font-medium flex items-center gap-1">
                <span>Explore Era</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
