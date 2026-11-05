import React from 'react';
import { YouTubeVideo } from '../types';
import { useApp } from '../context/AppContext';
import { Play, ExternalLink, Video } from 'lucide-react';

interface YouTubeVideoCardProps {
  video: YouTubeVideo;
}

export const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({ video }) => {
  const { setSelectedActor, actors } = useApp();

  const matchedActor = video.heroId
    ? actors.find(a => a.id === video.heroId)
    : video.heroName
    ? actors.find(a => a.name.toLowerCase().includes(video.heroName!.toLowerCase()))
    : null;

  return (
    <div className="group bg-[#0D0F14] rounded-lg border border-stone-800/80 hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/70">
      
      {/* Thumbnail */}
      <a
        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video bg-black overflow-hidden block"
        title={`Watch ${video.title} on YouTube`}
      >
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
            {video.duration}
          </div>
        )}
      </a>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Hero Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <span className="text-amber-400 font-mono uppercase tracking-wider">{video.category}</span>
            {matchedActor && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setSelectedActor(matchedActor)}
                  className="hover:text-white transition-colors underline"
                >
                  {matchedActor.name}
                </button>
              </>
            )}
          </div>

          <h3 className="text-sm font-semibold text-white line-clamp-2 mt-1.5 leading-snug group-hover:text-red-400 transition-colors">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {video.title}
            </a>
          </h3>

          <p className="text-xs text-stone-400 mt-1">
            {video.channelName} {video.views ? `· ${video.views} views` : ''}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-stone-800/80">
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded bg-red-600/15 hover:bg-red-600 text-red-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
