import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';
import { Film, Search, Filter, ArrowUpDown } from 'lucide-react';

export const MoviesPage: React.FC = () => {
  const { movies } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'title-asc'>('year-desc');

  // Extract unique genres
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach(m => m.genre.forEach(g => set.add(g)));
    return ['All', ...Array.from(set)];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies
      .filter(movie => {
        const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
        const matchesSearch =
          searchQuery.trim().length === 0 ||
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.heroName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'year-asc') return a.year - b.year;
        return a.title.localeCompare(b.title);
      });
  }, [movies, selectedGenre, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
          <Film className="w-4 h-4" />
          <span>Telugu Film Database</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Telugu Cinema Masterpieces
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          From legendary 1957 classics that founded cinematic grammar to modern Pan-Indian blockbusters that conquered the Academy Awards and global box office.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0E1116] p-4 rounded-xl border border-stone-800">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, director, lead hero..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Genre Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {allGenres.slice(0, 7).map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedGenre === genre
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'text-stone-400 hover:text-white bg-stone-900/60'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-stone-200 focus:outline-none focus:border-amber-400"
          >
            <option value="year-desc">Release Year (Newest First)</option>
            <option value="year-asc">Release Year (Oldest First)</option>
            <option value="title-asc">Movie Title (A – Z)</option>
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
          <p className="text-sm font-semibold text-stone-300">No movies match your criteria</p>
          <p className="text-xs text-stone-500">Try clearing the search query or selecting 'All' genres.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Showing {filteredMovies.length} Masterpiece Titles</span>
            <span>Click any poster to view full crew credits, synopsis & trailer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
