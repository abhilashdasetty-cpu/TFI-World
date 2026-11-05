import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { YouTubeVideoCard } from '../components/YouTubeVideoCard';
import { YouTubeVideo } from '../types';
import { Video, Youtube, Search, ExternalLink, Filter, Play } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { videos, actors, setSelectedActor } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedHeroId, setSelectedHeroId] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (YouTubeVideo['category'] | 'All')[] = [
    'All',
    'Hero Interviews',
    'Movie Trailers',
    'Official Teasers',
    'Behind the Scenes',
    'Making Videos',
    'Promotional Events',
    'Cinema News',
    'Hero Career Highlights',
    'Filmmaking Tutorials',
    'Animation and VFX'
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesCat = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesHero =
        selectedHeroId === 'All' ||
        video.heroId === selectedHeroId ||
        (video.heroName && actors.find(a => a.id === selectedHeroId)?.name === video.heroName);
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.heroName && video.heroName.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesHero && matchesSearch;
    });
  }, [videos, selectedCategory, selectedHeroId, searchQuery, actors]);

  // Selected hero for tailored search query shortcuts
  const activeHeroObj = actors.find(a => a.id === selectedHeroId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
          <Youtube className="w-4 h-4" />
          <span>YouTube Cinema Discovery Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel">
          Telugu Hero Videos & Clips
        </h1>
        <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
          Watch verified official movie trailers, in-depth candid interviews, making-of featurettes, audio launch speeches, and VFX breakdowns. Every card links directly to official YouTube destinations.
        </p>
      </div>

      {/* Control Strip */}
      <div className="space-y-4 bg-[#0E1116] p-5 rounded-xl border border-stone-800">
        
        {/* Row 1: Search + Hero Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search video title, hero name, or channel..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-white placeholder-stone-500 focus:outline-none focus:border-red-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 whitespace-nowrap shrink-0">Filter by Hero:</span>
            <select
              value={selectedHeroId}
              onChange={e => setSelectedHeroId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-900 border border-stone-700/80 rounded-md text-stone-200 focus:outline-none focus:border-red-400"
            >
              <option value="All">All Telugu Heroes</option>
              {actors.map(actor => (
                <option key={actor.id} value={actor.id}>
                  {actor.name} ({actor.title})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: 10 Categories Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Direct YouTube Redirection Strip for selected hero */}
      {activeHeroObj && (
        <div className="p-4 rounded-lg bg-[#12151D] border border-red-950/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Instant YouTube Redirection for {activeHeroObj.name}
            </span>
            <span className="text-[11px] text-stone-500">Opens verified search in new tab</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                activeHeroObj.youtubeSearchQueries.interviews
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 flex items-center justify-between transition-colors"
            >
              <span className="truncate">Interviews</span>
              <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
            </a>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                activeHeroObj.youtubeSearchQueries.trailers
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 flex items-center justify-between transition-colors"
            >
              <span className="truncate">Trailers</span>
              <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
            </a>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                activeHeroObj.youtubeSearchQueries.bts
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 flex items-center justify-between transition-colors"
            >
              <span className="truncate">Behind the Scenes</span>
              <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
            </a>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                activeHeroObj.youtubeSearchQueries.speeches
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-200 flex items-center justify-between transition-colors"
            >
              <span className="truncate">Speeches</span>
              <ExternalLink className="w-3 h-3 text-red-400 shrink-0" />
            </a>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
          <p className="text-sm font-semibold text-stone-300">No videos found for this filter</p>
          <p className="text-xs text-stone-500">
            Try resetting your category or hero filter to explore more clips.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Showing {filteredVideos.length} Curated YouTube Videos</span>
            <span>Clicking any video opens YouTube in a new tab</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <YouTubeVideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
