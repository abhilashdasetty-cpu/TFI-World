import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTION_LESSONS } from '../data/academyData';
import {
  User,
  Heart,
  Bookmark,
  Award,
  PenTool,
  Film,
  Camera,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const {
    user,
    actors,
    movies,
    setSelectedActor,
    setSelectedMovie,
    toggleFavouriteActor,
    toggleFavouriteMovie,
    toggleBookmarkLesson,
    projects,
    setActiveProject,
    setActivePage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'heroes' | 'movies' | 'lessons' | 'projects' | 'quizzes'>('heroes');

  const favActors = actors.filter(a => user.favouriteActorIds.includes(a.id));
  const favMovies = movies.filter(m => user.favouriteMovieIds.includes(m.id));
  const bookmarkedLessons = PRODUCTION_LESSONS.filter(l => user.bookmarkedLessonIds.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#0C0E14] border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-2xl flex items-center justify-center font-cinzel shadow-lg">
            {user.name[0]}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-cinzel">{user.name}</h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-stone-400">{user.email}</p>
          </div>
        </div>

        {/* Operational Stats Ribbon */}
        <div className="flex items-center gap-6 text-xs text-stone-300 border-t sm:border-t-0 sm:border-l border-stone-800 pt-4 sm:pt-0 sm:pl-6">
          <div className="text-center">
            <span className="font-mono text-base font-bold text-amber-400 block">
              {favActors.length}
            </span>
            <span className="text-stone-500 text-[11px]">Fav Heroes</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-base font-bold text-amber-400 block">
              {favMovies.length}
            </span>
            <span className="text-stone-500 text-[11px]">Fav Movies</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-base font-bold text-amber-400 block">
              {projects.length}
            </span>
            <span className="text-stone-500 text-[11px]">Storyboards</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-base font-bold text-amber-400 block">
              {user.completedQuizIds.length}
            </span>
            <span className="text-stone-500 text-[11px]">Quizzes</span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-800">
        <button
          onClick={() => setActiveTab('heroes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'heroes'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Favourite Heroes ({favActors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('movies')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'movies'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Favourite Movies ({favMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'lessons'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarked Lessons ({bookmarkedLessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>My Storyboards ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'quizzes'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Quiz Scores ({user.completedQuizIds.length})</span>
        </button>
      </div>

      {/* Tab 1: Favourite Heroes */}
      {activeTab === 'heroes' && (
        <div className="space-y-4">
          {favActors.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
              <p className="text-sm font-semibold text-stone-300">No favourite heroes saved yet</p>
              <button
                onClick={() => setActivePage('heroes')}
                className="text-xs text-amber-400 underline font-medium"
              >
                Browse Telugu Heroes Directory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favActors.map(actor => (
                <div
                  key={actor.id}
                  onClick={() => setSelectedActor(actor)}
                  className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-400">
                      {actor.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-cinzel">{actor.name}</h4>
                      <p className="text-[11px] text-stone-400">{actor.title}</p>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavouriteActor(actor.id);
                    }}
                    className="text-red-400 p-1 hover:text-stone-400"
                    title="Remove from favourites"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Favourite Movies */}
      {activeTab === 'movies' && (
        <div className="space-y-4">
          {favMovies.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
              <p className="text-sm font-semibold text-stone-300">No favourite movies saved yet</p>
              <button
                onClick={() => setActivePage('movies')}
                className="text-xs text-amber-400 underline font-medium"
              >
                Browse Telugu Masterpieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favMovies.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white font-cinzel">{movie.title} ({movie.year})</h4>
                    <p className="text-[11px] text-stone-400">Dir. {movie.director} · {movie.heroName}</p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavouriteMovie(movie.id);
                    }}
                    className="text-red-400 p-1 hover:text-stone-400"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Bookmarked Lessons */}
      {activeTab === 'lessons' && (
        <div className="space-y-3">
          {bookmarkedLessons.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
              <p className="text-sm font-semibold text-stone-300">No lessons bookmarked yet</p>
              <button
                onClick={() => setActivePage('academy')}
                className="text-xs text-amber-400 underline font-medium"
              >
                Explore Filmmaking Academy
              </button>
            </div>
          ) : (
            bookmarkedLessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">{lesson.stage}</span>
                  <h4 className="text-xs font-bold text-white font-cinzel mt-0.5">{lesson.topic}</h4>
                  <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{lesson.shortSummary}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePage('academy')}
                    className="px-3 py-1 rounded bg-stone-900 border border-stone-700 text-xs text-stone-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => toggleBookmarkLesson(lesson.id)}
                    className="text-amber-400 p-1"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: My Storyboards */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map(proj => (
              <div
                key={proj.id}
                className="p-5 rounded-xl bg-[#0E1116] border border-stone-800 space-y-3"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-bold text-white font-cinzel">{proj.title}</h4>
                  <span className="text-[10px] font-mono text-amber-400">{proj.aspectRatio}</span>
                </div>
                <p className="text-xs text-stone-400 line-clamp-2">{proj.logline}</p>
                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500">{proj.panels.length} Panels</span>
                  <button
                    onClick={() => {
                      setActiveProject(proj);
                      setActivePage('storyboard');
                    }}
                    className="px-3 py-1 rounded bg-amber-500 text-black font-semibold text-xs"
                  >
                    Open in Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Quiz Scores */}
      {activeTab === 'quizzes' && (
        <div className="space-y-3">
          {user.completedQuizIds.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#0E1116] border border-stone-800 space-y-2">
              <p className="text-sm font-semibold text-stone-300">No quizzes completed yet</p>
              <button
                onClick={() => setActivePage('learning')}
                className="text-xs text-amber-400 underline font-medium"
              >
                Take a Cinema Certification Quiz
              </button>
            </div>
          ) : (
            user.completedQuizIds.map(rec => (
              <div
                key={rec.quizId}
                className="p-4 rounded-lg bg-[#0E1116] border border-stone-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white uppercase font-mono">{rec.quizId.replace('quiz-', '').toUpperCase()} QUIZ</span>
                  <p className="text-xs text-stone-400">Completed on {rec.date}</p>
                </div>
                <div className="font-mono text-sm font-bold text-amber-400">
                  {rec.score} / {rec.total}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
