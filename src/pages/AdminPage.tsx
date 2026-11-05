import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Actor, Movie, YouTubeVideo } from '../types';
import {
  Shield,
  Plus,
  Trash2,
  Edit,
  User,
  Film,
  Video,
  CheckCircle2,
  RotateCcw,
  Search
} from 'lucide-react';
import { ACTORS_DATA } from '../data/actorsData';
import { MOVIES_DATA } from '../data/moviesData';
import { VIDEOS_DATA } from '../data/videosData';

export const AdminPage: React.FC = () => {
  const {
    user,
    actors,
    movies,
    videos,
    addActor,
    updateActor,
    deleteActor,
    addMovie,
    updateMovie,
    deleteMovie,
    addVideo,
    deleteVideo,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'actors' | 'movies' | 'videos'>('actors');

  // Actor Form Modal
  const [editingActor, setEditingActor] = useState<Actor | null>(null);
  const [isNewActor, setIsNewActor] = useState(false);

  // Movie Form Modal
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isNewMovie, setIsNewMovie] = useState(false);

  // Video Form Modal
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [vidTitle, setVidTitle] = useState('');
  const [vidYoutubeId, setVidYoutubeId] = useState('');
  const [vidChannel, setVidChannel] = useState('');
  const [vidCategory, setVidCategory] = useState<YouTubeVideo['category']>('Hero Interviews');
  const [vidHeroName, setVidHeroName] = useState('');

  // Handle Actor Save
  const handleSaveActor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActor) return;
    if (!editingActor.name.trim()) {
      showToast('Actor name is required', 'error');
      return;
    }

    if (isNewActor) {
      addActor(editingActor);
    } else {
      updateActor(editingActor);
    }
    setEditingActor(null);
    setIsNewActor(false);
  };

  // Handle Movie Save
  const handleSaveMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;
    if (!editingMovie.title.trim()) {
      showToast('Movie title is required', 'error');
      return;
    }

    if (isNewMovie) {
      addMovie(editingMovie);
    } else {
      updateMovie(editingMovie);
    }
    setEditingMovie(null);
    setIsNewMovie(false);
  };

  // Handle Video Save
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle.trim() || !vidYoutubeId.trim()) {
      showToast('Title and YouTube ID are required', 'error');
      return;
    }

    const newVid: YouTubeVideo = {
      id: 'vid-' + Date.now(),
      title: vidTitle,
      youtubeId: vidYoutubeId.trim(),
      channelName: vidChannel.trim() || 'Official YouTube Channel',
      category: vidCategory,
      heroName: vidHeroName.trim() || undefined,
      duration: '3:30',
      verifiedOfficial: true
    };
    addVideo(newVid);
    setVidTitle('');
    setVidYoutubeId('');
    setVidChannel('');
    setVidHeroName('');
    setIsAddingVideo(false);
  };

  // Reset to Factory Default Data
  const handleResetDatabase = () => {
    if (confirm('Are you sure you want to reset all data to authentic factory defaults? Any custom edits will be restored.')) {
      localStorage.removeItem('tfi_actors');
      localStorage.removeItem('tfi_movies');
      localStorage.removeItem('tfi_videos');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            <Shield className="w-4 h-4" />
            <span>Administrative Management Console</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-cinzel mt-1">
            Curator & Admin Dashboard
          </h1>
          <p className="text-sm text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Manage authentic actor biographies, verify high-resolution portraits, catalog movies, and update verified YouTube links with real-time state persistence.
          </p>
        </div>

        <button
          onClick={handleResetDatabase}
          className="px-3.5 py-2 rounded-md bg-stone-900 hover:bg-stone-800 border border-stone-700 text-xs text-stone-300 hover:text-white flex items-center gap-1.5 self-start"
          title="Restore original factory datasets"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Restore Factory Data</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('actors')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'actors'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Manage Actors ({actors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('movies')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'movies'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Manage Movies ({movies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            activeTab === 'videos'
              ? 'bg-amber-500 text-black'
              : 'bg-[#0E1116] border border-stone-800 text-stone-400 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Manage Videos ({videos.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. ACTORS MANAGEMENT                                     */}
      {/* ======================================================== */}
      {activeTab === 'actors' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-cinzel">
              Telugu Male Heroes Registry
            </h3>

            <button
              onClick={() => {
                setEditingActor({
                  id: 'actor-' + Date.now(),
                  name: '',
                  teluguName: '',
                  title: '',
                  generation: 'Established',
                  birthYear: 1980,
                  birthPlace: '',
                  debutYear: 2005,
                  debutMovie: '',
                  photoUrl: '',
                  biography: '',
                  earlyLife: '',
                  careerMilestones: ['Enter milestone 1'],
                  notablePerformances: [],
                  awards: [],
                  filmography: [],
                  youtubeSearchQueries: {
                    interviews: '',
                    trailers: '',
                    bts: '',
                    speeches: ''
                  }
                });
                setIsNewActor(true);
              }}
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Actor</span>
            </button>
          </div>

          {/* Actor Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0E1116]">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#12151D] border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                <tr>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Moniker / Title</th>
                  <th className="py-3 px-4">Generation</th>
                  <th className="py-3 px-4">Debut</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {actors.map(actor => (
                  <tr key={actor.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-[10px] text-amber-400">
                        {actor.name[0]}
                      </div>
                      <span>{actor.name}</span>
                    </td>
                    <td className="py-3 px-4 text-amber-300">{actor.title}</td>
                    <td className="py-3 px-4 text-stone-400">{actor.generation} Era</td>
                    <td className="py-3 px-4 font-mono text-stone-300">{actor.debutYear} ({actor.debutMovie})</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingActor(actor);
                            setIsNewActor(false);
                          }}
                          className="text-stone-400 hover:text-white p-1"
                          title="Edit Actor"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${actor.name}?`)) {
                              deleteActor(actor.id);
                            }
                          }}
                          className="text-stone-500 hover:text-red-400 p-1"
                          title="Delete Actor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MOVIES MANAGEMENT                                     */}
      {/* ======================================================== */}
      {activeTab === 'movies' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-cinzel">
              Masterpiece Films Registry
            </h3>

            <button
              onClick={() => {
                setEditingMovie({
                  id: 'movie-' + Date.now(),
                  title: '',
                  year: new Date().getFullYear(),
                  releaseDate: '1 January 2025',
                  genre: ['Action', 'Drama'],
                  heroId: actors[0]?.id || 'prabhas',
                  heroName: actors[0]?.name || 'Prabhas',
                  director: '',
                  producer: '',
                  musicDirector: '',
                  cinematographer: '',
                  editor: '',
                  posterUrl: '',
                  synopsis: '',
                  awards: []
                });
                setIsNewMovie(true);
              }}
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Movie</span>
            </button>
          </div>

          {/* Movie Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0E1116]">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#12151D] border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                <tr>
                  <th className="py-3 px-4">Movie Title</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Lead Hero</th>
                  <th className="py-3 px-4">Director</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {movies.map(movie => (
                  <tr key={movie.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{movie.title}</td>
                    <td className="py-3 px-4 font-mono text-amber-400">{movie.year}</td>
                    <td className="py-3 px-4 text-stone-300">{movie.heroName}</td>
                    <td className="py-3 px-4 text-stone-400">{movie.director}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingMovie(movie);
                            setIsNewMovie(false);
                          }}
                          className="text-stone-400 hover:text-white p-1"
                          title="Edit Movie"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete movie ${movie.title}?`)) {
                              deleteMovie(movie.id);
                            }
                          }}
                          className="text-stone-500 hover:text-red-400 p-1"
                          title="Delete Movie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VIDEOS MANAGEMENT                                     */}
      {/* ======================================================== */}
      {activeTab === 'videos' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-cinzel">
              Curated YouTube Videos Registry
            </h3>

            <button
              onClick={() => setIsAddingVideo(!isAddingVideo)}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Video Link</span>
            </button>
          </div>

          {/* Add Video Form */}
          {isAddingVideo && (
            <form
              onSubmit={handleSaveVideo}
              className="p-5 rounded-xl bg-[#0E1116] border border-red-500/40 space-y-4 text-xs animate-in fade-in duration-150"
            >
              <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                Add Curated YouTube Video
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-400 block">Video Title</label>
                  <input
                    type="text"
                    value={vidTitle}
                    onChange={e => setVidTitle(e.target.value)}
                    placeholder="e.g. Kalki 2898 AD Official Trailer"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">YouTube Video ID (11 characters)</label>
                  <input
                    type="text"
                    value={vidYoutubeId}
                    onChange={e => setVidYoutubeId(e.target.value)}
                    placeholder="e.g. kQDd1AhGIHk"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Category</label>
                  <select
                    value={vidCategory}
                    onChange={e => setVidCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    <option value="Hero Interviews">Hero Interviews</option>
                    <option value="Movie Trailers">Movie Trailers</option>
                    <option value="Official Teasers">Official Teasers</option>
                    <option value="Behind the Scenes">Behind the Scenes</option>
                    <option value="Making Videos">Making Videos</option>
                    <option value="Promotional Events">Promotional Events</option>
                    <option value="Cinema News">Cinema News</option>
                    <option value="Hero Career Highlights">Hero Career Highlights</option>
                    <option value="Filmmaking Tutorials">Filmmaking Tutorials</option>
                    <option value="Animation and VFX">Animation and VFX</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 block">Official Channel Name</label>
                  <input
                    type="text"
                    value={vidChannel}
                    onChange={e => setVidChannel(e.target.value)}
                    placeholder="e.g. Vyjayanthi Movies"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingVideo(false)}
                  className="px-4 py-1.5 rounded bg-stone-800 text-stone-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                >
                  Save Video
                </button>
              </div>
            </form>
          )}

          {/* Videos Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#0E1116]">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-[#12151D] border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-400 font-mono">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">YouTube ID</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-sans">
                {videos.map(video => (
                  <tr key={video.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white max-w-sm truncate">{video.title}</td>
                    <td className="py-3 px-4 text-amber-400">{video.category}</td>
                    <td className="py-3 px-4 font-mono text-stone-400">{video.youtubeId}</td>
                    <td className="py-3 px-4 text-stone-400">{video.channelName}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          if (confirm(`Remove video ${video.title}?`)) {
                            deleteVideo(video.id);
                          }
                        }}
                        className="text-stone-500 hover:text-red-400 p-1"
                        title="Delete Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACTOR EDIT MODAL                                         */}
      {/* ======================================================== */}
      {editingActor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveActor}
            className="bg-[#0E1116] rounded-xl border border-stone-800 p-6 max-w-2xl w-full space-y-4 my-auto max-h-[90vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-cinzel">
                {isNewActor ? 'Add New Telugu Hero' : `Edit Profile: ${editingActor.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingActor(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-stone-400 block">Actor Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingActor.name}
                  onChange={e => setEditingActor({ ...editingActor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Telugu Script Name</label>
                <input
                  type="text"
                  value={editingActor.teluguName || ''}
                  onChange={e => setEditingActor({ ...editingActor, teluguName: e.target.value })}
                  placeholder="e.g. మహేష్ బాబు"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Moniker / Title</label>
                <input
                  type="text"
                  value={editingActor.title}
                  onChange={e => setEditingActor({ ...editingActor, title: e.target.value })}
                  placeholder="e.g. Rebel Star / Megastar"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Generation</label>
                <select
                  value={editingActor.generation}
                  onChange={e => setEditingActor({ ...editingActor, generation: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                >
                  <option value="Legendary">Legendary (NTR, ANR, Krishna, Sobhan Babu)</option>
                  <option value="Senior">Senior (Chiranjeevi, Balakrishna, Nagarjuna, Venkatesh)</option>
                  <option value="Established">Established (Prabhas, Mahesh, Jr NTR, Allu Arjun, Charan, PK)</option>
                  <option value="Contemporary">Contemporary (Nani, Vijay Deverakonda)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Debut Year</label>
                <input
                  type="number"
                  value={editingActor.debutYear}
                  onChange={e => setEditingActor({ ...editingActor, debutYear: parseInt(e.target.value) || 2000 })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Debut Movie</label>
                <input
                  type="text"
                  value={editingActor.debutMovie}
                  onChange={e => setEditingActor({ ...editingActor, debutMovie: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Verified Authentic Photograph URL *</label>
                <input
                  type="url"
                  value={editingActor.photoUrl}
                  onChange={e => setEditingActor({ ...editingActor, photoUrl: e.target.value })}
                  placeholder="https://upload.wikimedia.org/... or official high-res portrait"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                />
                <span className="text-[10px] text-stone-500">
                  Strict Requirement: Must be a genuine photograph of the real actor.
                </span>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Biography</label>
                <textarea
                  rows={3}
                  value={editingActor.biography}
                  onChange={e => setEditingActor({ ...editingActor, biography: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingActor(null)}
                className="px-4 py-2 rounded bg-stone-800 text-stone-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-amber-500 text-black font-semibold"
              >
                Save Actor Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* MOVIE EDIT MODAL                                         */}
      {/* ======================================================== */}
      {editingMovie && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveMovie}
            className="bg-[#0E1116] rounded-xl border border-stone-800 p-6 max-w-2xl w-full space-y-4 my-auto max-h-[90vh] overflow-y-auto text-xs"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-cinzel">
                {isNewMovie ? 'Add Masterpiece Movie' : `Edit Movie: ${editingMovie.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingMovie(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-stone-400 block">Movie Title *</label>
                <input
                  type="text"
                  required
                  value={editingMovie.title}
                  onChange={e => setEditingMovie({ ...editingMovie, title: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Release Year</label>
                <input
                  type="number"
                  value={editingMovie.year}
                  onChange={e => setEditingMovie({ ...editingMovie, year: parseInt(e.target.value) || 2024 })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Lead Hero</label>
                <input
                  type="text"
                  value={editingMovie.heroName}
                  onChange={e => setEditingMovie({ ...editingMovie, heroName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 block">Director</label>
                <input
                  type="text"
                  value={editingMovie.director}
                  onChange={e => setEditingMovie({ ...editingMovie, director: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Poster URL</label>
                <input
                  type="url"
                  value={editingMovie.posterUrl}
                  onChange={e => setEditingMovie({ ...editingMovie, posterUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-stone-400 block">Synopsis</label>
                <textarea
                  rows={3}
                  value={editingMovie.synopsis}
                  onChange={e => setEditingMovie({ ...editingMovie, synopsis: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingMovie(null)}
                className="px-4 py-2 rounded bg-stone-800 text-stone-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-amber-500 text-black font-semibold"
              >
                Save Movie Record
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
