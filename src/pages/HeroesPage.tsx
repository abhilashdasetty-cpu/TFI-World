import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ActorCard } from '../components/ActorCard';
import { GenerationType } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, User } from 'lucide-react';

export const HeroesPage: React.FC = () => {
  const { actors } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'debut-asc' | 'debut-desc' | 'name-asc' | 'name-desc'>('debut-asc');

  const filteredActors = useMemo(() => {
    return actors
      .filter(actor => {
        const matchesGen = selectedGeneration === 'All' || actor.generation === selectedGeneration;
        const matchesSearch =
          searchQuery.trim().length === 0 ||
          actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          actor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (actor.teluguName && actor.teluguName.includes(searchQuery)) ||
          actor.biography.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGen && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'debut-asc') return a.debutYear - b.debutYear;
        if (sortBy === 'debut-desc') return b.debutYear - a.debutYear;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
  }, [actors, selectedGeneration, searchQuery, sortBy]);

  const generations: (GenerationType | 'All')[] = [
    'All',
    'Legendary',
    'Senior',
    'Established',
    'Contemporary'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <User className="w-4 h-4" />
          <span>Telugu Male Actor Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Telugu Heroes & Icons
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Explore the legends, superstars, and trailblazers of Telugu cinema. Every profile features authentic high-definition portraits, chronological milestones, curated filmographies, and verified YouTube video discovery.
        </p>
      </div>

      {/* Control Strip: Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E1116] p-4 rounded-xl border border-stone-800">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by actor name, title, moniker..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Generation Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {generations.map(gen => (
            <button
              key={gen}
              onClick={() => setSelectedGeneration(gen)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedGeneration === gen
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-white bg-stone-900/60'
              }`}
            >
              {gen === 'All' ? 'All Generations' : `${gen} Era`}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-stone-200 focus:outline-none focus:border-amber-400"
          >
            <option value="debut-asc">Debut Era (Oldest First)</option>
            <option value="debut-desc">Debut Era (Newest First)</option>
            <option value="name-asc">Alphabetical (A – Z)</option>
            <option value="name-desc">Alphabetical (Z – A)</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      {filteredActors.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
          <p className="text-sm font-semibold text-stone-300">No actors match your search</p>
          <p className="text-xs text-stone-500">
            Try adjusting your search terms or selecting 'All Generations'.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Showing {filteredActors.length} Telugu Heroes</span>
            <span>Click any actor card to view full biography & filmography</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredActors.map(actor => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
      )}

      {/* Generation Overview Section for Educational Depth */}
      <div className="pt-12 border-t border-stone-800 space-y-6">
        <h3 className="text-lg font-bold text-white font-cinzel">
          Understanding the Generations of Telugu Cinema
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold uppercase tracking-wider block">
              Legendary (1940s–1970s)
            </span>
            <p className="text-stone-400 leading-relaxed">
              NTR, ANR, Krishna, and Sobhan Babu defined mythological stature, refined romantic depth, introduced cowboy westerns, and relocated the entire industry to Hyderabad.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold uppercase tracking-wider block">
              Senior (1970s–1980s)
            </span>
            <p className="text-stone-400 leading-relaxed">
              Chiranjeevi, Balakrishna, Nagarjuna, and Venkatesh led the commercial expansion through breakdance mass cinema, puranic faction dramas, neo-noir technical revolutions (Siva), and family blockbusters.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold uppercase tracking-wider block">
              Established (1990s–2000s)
            </span>
            <p className="text-stone-400 leading-relaxed">
              Pawan Kalyan, Mahesh Babu, Jr. NTR, Allu Arjun, Ram Charan, and Prabhas transformed Telugu cinema from regional dominance into global Pan-Indian powerhouses.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 space-y-2">
            <span className="text-amber-400 font-mono font-bold uppercase tracking-wider block">
              Contemporary (2010s+)
            </span>
            <p className="text-stone-400 leading-relaxed">
              Nani, Vijay Deverakonda, and new wave creators bring raw naturalistic realism, bold character studies, and high-risk conceptual cinema.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
