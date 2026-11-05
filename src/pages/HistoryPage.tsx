import React, { useState } from 'react';
import { TELUGU_CINEMA_HISTORY, DecadeMilestone } from '../data/historyData';
import { History, Calendar, Film, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [selectedDecade, setSelectedDecade] = useState<DecadeMilestone>(TELUGU_CINEMA_HISTORY[1]); // Default to 1950s Golden Era

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <History className="w-4 h-4" />
          <span>Telugu Cinema Heritage Timeline</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Cinema Through the Decades
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Traverse nearly a century of cinematic triumphs: from 1931's first talkie Bhakta Prahlada, through the immortal 1950s Golden Era, the 1970s color and CinemaScope revolution, the 1980s Chiranjeevi and Siva phenomenon, to contemporary Oscar and Golden Globe victories.
        </p>
      </div>

      {/* Horizontal Decade Rail / Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800">
        {TELUGU_CINEMA_HISTORY.map(era => {
          const isSelected = selectedDecade.decade === era.decade;
          return (
            <button
              key={era.decade}
              onClick={() => setSelectedDecade(era)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex flex-col items-start ${
                isSelected
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                  : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
              }`}
            >
              <span className="font-mono text-xs">{era.decade}</span>
              <span className="text-[10px] opacity-80 truncate max-w-[130px] font-sans font-normal">
                {era.yearRange}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Era Feature Presentation */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0C0E14] border border-amber-500/30 space-y-8 animate-in fade-in duration-200">
        
        {/* Era Header */}
        <div className="space-y-2 border-b border-stone-800 pb-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-mono text-amber-400 font-bold uppercase tracking-wider">
              {selectedDecade.yearRange}
            </span>
            <span className="text-xs text-stone-500 font-mono">Epoch #{TELUGU_CINEMA_HISTORY.findIndex(e => e.decade === selectedDecade.decade) + 1}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
            {selectedDecade.eraTitle}
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed max-w-4xl pt-1">
            {selectedDecade.summary}
          </p>
        </div>

        {/* 2-Column Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Historical Milestones & Technical Evolution */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Major Historic Milestones
              </h3>
              <div className="space-y-2.5">
                {selectedDecade.keyEvents.map((evt, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-[#0E1116] border border-stone-800 text-xs text-stone-300 flex items-start gap-3 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{evt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Evolution */}
            <div className="p-4 rounded-lg bg-[#090B0E] border border-stone-800 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                Camera & Sound Technology
              </span>
              <p className="text-xs text-amber-300 leading-relaxed font-sans">
                {selectedDecade.technicalEvolution}
              </p>
            </div>
          </div>

          {/* Right Column: Iconic Films & Pioneering Filmmakers */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Landmark Films of the Decade
              </h3>
              <div className="space-y-3">
                {selectedDecade.iconicFilms.map((film, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-1"
                  >
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-bold text-white font-cinzel">
                        {film.title}
                      </h4>
                      <span className="text-xs font-mono text-amber-400">{film.year}</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {film.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pioneering Filmmakers */}
            <div className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                Pioneering Directors & Masters
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedDecade.pioneeringFilmmakers.map((maker, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-300 font-medium"
                  >
                    {maker}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
