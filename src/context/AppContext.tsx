import React, { createContext, useContext, useState, useEffect } from 'react';
import { Actor, Movie, YouTubeVideo, StoryboardProject, ShotPlanItem, UserProfile } from '../types';
import { ACTORS_DATA } from '../data/actorsData';
import { MOVIES_DATA } from '../data/moviesData';
import { VIDEOS_DATA } from '../data/videosData';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { QUIZZES_DATA } from '../data/quizzesData';

export type PageId =
  | 'home'
  | 'heroes'
  | 'movies'
  | 'videos'
  | 'academy'
  | 'storyboard'
  | 'multimedia'
  | 'history'
  | 'learning'
  | 'studio'
  | 'about'
  | 'profile'
  | 'admin';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedActor: Actor | null;
  setSelectedActor: (actor: Actor | null) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Data
  actors: Actor[];
  movies: Movie[];
  videos: YouTubeVideo[];
  updateActor: (actor: Actor) => void;
  addActor: (actor: Actor) => void;
  deleteActor: (id: string) => void;
  updateMovie: (movie: Movie) => void;
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: string) => void;
  addVideo: (video: YouTubeVideo) => void;
  deleteVideo: (id: string) => void;

  // User & Favourites
  user: UserProfile;
  toggleFavouriteActor: (actorId: string) => void;
  toggleFavouriteMovie: (movieId: string) => void;
  toggleBookmarkLesson: (lessonId: string) => void;
  saveQuizResult: (quizId: string, score: number, total: number) => void;
  setAdminRole: (isAdmin: boolean) => void;

  // Storyboard Projects
  projects: StoryboardProject[];
  activeProject: StoryboardProject | null;
  setActiveProject: (p: StoryboardProject | null) => void;
  saveProject: (project: StoryboardProject) => void;
  deleteProject: (id: string) => void;

  // Shot Planner
  shotList: ShotPlanItem[];
  addShot: (shot: ShotPlanItem) => void;
  deleteShot: (id: string) => void;

  // Production Checklist
  checklistState: Record<string, boolean>;
  toggleChecklistItem: (key: string) => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial sample storyboard project
const SAMPLE_STORYBOARD: StoryboardProject = {
  id: 'sample-project-1',
  title: 'The Forest Ambush — Action Sequence',
  logline: 'Pushpa and his truck convoy navigate through a treacherous ravine at dusk when forest guards set up a road spike blockade.',
  director: 'Sukumar',
  aspectRatio: '2.39:1',
  createdAt: '2025-01-15',
  updatedAt: '2025-01-20',
  panels: [
    {
      id: 'panel-1',
      panelNumber: 1,
      sceneNumber: 14,
      shotType: 'Extreme Wide Shot',
      cameraAngle: 'High Angle',
      cameraMovement: 'Static',
      lens: '24mm Prime',
      durationSeconds: 4,
      sceneDescription: 'EXT. Seshachalam Ravine — Dusk. The red-dusted lorry winds slowly down the hairpin bend surrounded by ancient teak trees.',
      actionDescription: 'Heavy fog rolls over the mountain pass. Distant bird flock scatters.',
      dialogue: 'Radio static crackles.',
      soundCue: 'Distant truck diesel rumble, night crickets.'
    },
    {
      id: 'panel-2',
      panelNumber: 2,
      sceneNumber: 14,
      shotType: 'Medium Close-Up',
      cameraAngle: 'Low Angle',
      cameraMovement: 'Dolly / Tracking',
      lens: '50mm Anamorphic',
      durationSeconds: 3,
      sceneDescription: 'INT. Truck Cabin — Dusk. Pushpa sits behind the wheel, steering with his left hand, adjusting his shoulder tilt.',
      actionDescription: 'Pushpa spots the spike strip reflected in his side rearview mirror.',
      dialogue: 'Pushpa: "Keshava... clutch pattuko."',
      soundCue: 'Gearbox grind and heavy intake of breath.'
    },
    {
      id: 'panel-3',
      panelNumber: 3,
      sceneNumber: 14,
      shotType: 'Close-Up',
      cameraAngle: 'Worm\'s Eye View',
      cameraMovement: 'Handheld',
      lens: '35mm',
      durationSeconds: 2,
      sceneDescription: 'EXT. Dirt Road — Dusk. Iron spike strip deployed across dry red soil.',
      actionDescription: 'The massive truck tires screech and lock as brake dust billows into the camera lens.',
      dialogue: 'Shouting in distance: "Nillu! Aagu!"',
      soundCue: 'Tire screech impact, metallic tire iron hiss.'
    }
  ]
};

const SAMPLE_SHOTS: ShotPlanItem[] = [
  {
    id: 'shot-1',
    shotNumber: '1A',
    sceneNumber: '1',
    shotType: 'Extreme Wide Shot',
    angle: 'Eye Level',
    movement: 'Slow Dolly In',
    lens: '28mm Master Prime',
    lightingSetup: 'Early Morning Golden Hour Natural rim',
    action: 'Hero walks towards the ancient temple entrance in silhouette.',
    estDuration: '6s'
  },
  {
    id: 'shot-2',
    shotNumber: '1B',
    sceneNumber: '1',
    shotType: 'Low Angle Close-Up',
    angle: 'Low Angle',
    movement: 'Static',
    lens: '85mm Anamorphic',
    lightingSetup: 'Diffused Key + Gold Reflector bounce',
    action: 'Hero raises his head; eyes reveal intense resolve.',
    estDuration: '4s'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Persistence: Actors
  const [actors, setActors] = useState<Actor[]>(() => {
    try {
      const saved = localStorage.getItem('tfi_actors');
      return saved ? JSON.parse(saved) : ACTORS_DATA;
    } catch {
      return ACTORS_DATA;
    }
  });

  // Movies
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('tfi_movies');
      return saved ? JSON.parse(saved) : MOVIES_DATA;
    } catch {
      return MOVIES_DATA;
    }
  });

  // Videos
  const [videos, setVideos] = useState<YouTubeVideo[]>(() => {
    try {
      const saved = localStorage.getItem('tfi_videos');
      return saved ? JSON.parse(saved) : VIDEOS_DATA;
    } catch {
      return VIDEOS_DATA;
    }
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tfi_user_profile');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Cinema Explorer',
            email: 'cinephile@tfiuniverse.com',
            role: 'member',
            favouriteActorIds: ['prabhas', 'mahesh-babu', 'allu-arjun', 'jr-ntr'],
            favouriteMovieIds: ['rrr', 'mayabazar', 'kalki-2898-ad'],
            bookmarkedLessonIds: ['pre-1', 'prod-1'],
            completedQuizIds: []
          };
    } catch {
      return {
        name: 'Cinema Explorer',
        email: 'cinephile@tfiuniverse.com',
        role: 'member',
        favouriteActorIds: ['prabhas', 'mahesh-babu', 'allu-arjun'],
        favouriteMovieIds: ['rrr', 'mayabazar'],
        bookmarkedLessonIds: [],
        completedQuizIds: []
      };
    }
  });

  // Storyboard Projects
  const [projects, setProjects] = useState<StoryboardProject[]>(() => {
    try {
      const saved = localStorage.getItem('tfi_storyboard_projects');
      return saved ? JSON.parse(saved) : [SAMPLE_STORYBOARD];
    } catch {
      return [SAMPLE_STORYBOARD];
    }
  });
  const [activeProject, setActiveProject] = useState<StoryboardProject | null>(SAMPLE_STORYBOARD);

  // Shot Planner
  const [shotList, setShotList] = useState<ShotPlanItem[]>(() => {
    try {
      const saved = localStorage.getItem('tfi_shot_list');
      return saved ? JSON.parse(saved) : SAMPLE_SHOTS;
    } catch {
      return SAMPLE_SHOTS;
    }
  });

  // Checklist
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tfi_checklist_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tfi_actors', JSON.stringify(actors));
  }, [actors]);

  useEffect(() => {
    localStorage.setItem('tfi_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('tfi_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('tfi_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tfi_storyboard_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tfi_shot_list', JSON.stringify(shotList));
  }, [shotList]);

  useEffect(() => {
    localStorage.setItem('tfi_checklist_state', JSON.stringify(checklistState));
  }, [checklistState]);

  // Actions
  const updateActor = (updated: Actor) => {
    setActors(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    if (selectedActor?.id === updated.id) {
      setSelectedActor(updated);
    }
    showToast(`Updated details for ${updated.name}`, 'success');
  };

  const addActor = (newActor: Actor) => {
    setActors(prev => [newActor, ...prev]);
    showToast(`Added ${newActor.name} to Telugu Heroes directory`, 'success');
  };

  const deleteActor = (id: string) => {
    const actorToDelete = actors.find(a => a.id === id);
    setActors(prev => prev.filter(a => a.id !== id));
    if (selectedActor?.id === id) {
      setSelectedActor(null);
    }
    showToast(`Removed ${actorToDelete?.name || 'Actor'} from database`, 'info');
  };

  const updateMovie = (updated: Movie) => {
    setMovies(prev => prev.map(m => (m.id === updated.id ? updated : m)));
    if (selectedMovie?.id === updated.id) {
      setSelectedMovie(updated);
    }
    showToast(`Updated movie: ${updated.title}`, 'success');
  };

  const addMovie = (newMovie: Movie) => {
    setMovies(prev => [newMovie, ...prev]);
    showToast(`Added movie: ${newMovie.title}`, 'success');
  };

  const deleteMovie = (id: string) => {
    const movieToDelete = movies.find(m => m.id === id);
    setMovies(prev => prev.filter(m => m.id !== id));
    if (selectedMovie?.id === id) {
      setSelectedMovie(null);
    }
    showToast(`Removed movie ${movieToDelete?.title || ''}`, 'info');
  };

  const addVideo = (newVideo: YouTubeVideo) => {
    setVideos(prev => [newVideo, ...prev]);
    showToast(`Added video: ${newVideo.title.slice(0, 30)}...`, 'success');
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    showToast('Removed video from registry', 'info');
  };

  // User Actions
  const toggleFavouriteActor = (actorId: string) => {
    setUser(prev => {
      const exists = prev.favouriteActorIds.includes(actorId);
      const next = exists
        ? prev.favouriteActorIds.filter(id => id !== actorId)
        : [...prev.favouriteActorIds, actorId];
      const actor = actors.find(a => a.id === actorId);
      showToast(
        exists ? `Removed ${actor?.name || 'actor'} from favourites` : `Added ${actor?.name || 'actor'} to favourites!`,
        'success'
      );
      return { ...prev, favouriteActorIds: next };
    });
  };

  const toggleFavouriteMovie = (movieId: string) => {
    setUser(prev => {
      const exists = prev.favouriteMovieIds.includes(movieId);
      const next = exists
        ? prev.favouriteMovieIds.filter(id => id !== movieId)
        : [...prev.favouriteMovieIds, movieId];
      const movie = movies.find(m => m.id === movieId);
      showToast(
        exists ? `Removed ${movie?.title || 'movie'} from favourites` : `Added ${movie?.title || 'movie'} to favourites!`,
        'success'
      );
      return { ...prev, favouriteMovieIds: next };
    });
  };

  const toggleBookmarkLesson = (lessonId: string) => {
    setUser(prev => {
      const exists = prev.bookmarkedLessonIds.includes(lessonId);
      const next = exists
        ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
        : [...prev.bookmarkedLessonIds, lessonId];
      showToast(exists ? 'Removed lesson bookmark' : 'Bookmarked academy lesson!', 'success');
      return { ...prev, bookmarkedLessonIds: next };
    });
  };

  const saveQuizResult = (quizId: string, score: number, total: number) => {
    setUser(prev => {
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const next = [
        ...prev.completedQuizIds.filter(q => q.quizId !== quizId),
        { quizId, score, total, date }
      ];
      return { ...prev, completedQuizIds: next };
    });
  };

  const setAdminRole = (isAdmin: boolean) => {
    setUser(prev => ({ ...prev, role: isAdmin ? 'admin' : 'member' }));
    showToast(isAdmin ? 'Switched to Admin privileges' : 'Switched to Member view', 'info');
  };

  // Storyboard Actions
  const saveProject = (project: StoryboardProject) => {
    setProjects(prev => {
      const exists = prev.some(p => p.id === project.id);
      if (exists) {
        return prev.map(p => (p.id === project.id ? project : p));
      }
      return [project, ...prev];
    });
    setActiveProject(project);
    showToast(`Saved storyboard: ${project.title}`, 'success');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProject?.id === id) {
      setActiveProject(projects.find(p => p.id !== id) || null);
    }
    showToast('Storyboard project deleted', 'info');
  };

  // Shot Planner
  const addShot = (shot: ShotPlanItem) => {
    setShotList(prev => [...prev, shot]);
    showToast(`Added Shot #${shot.shotNumber}`, 'success');
  };

  const deleteShot = (id: string) => {
    setShotList(prev => prev.filter(s => s.id !== id));
    showToast('Shot removed from list', 'info');
  };

  // Checklist
  const toggleChecklistItem = (key: string) => {
    setChecklistState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedActor,
        setSelectedActor,
        selectedMovie,
        setSelectedMovie,
        isSearchOpen,
        setIsSearchOpen,
        actors,
        movies,
        videos,
        updateActor,
        addActor,
        deleteActor,
        updateMovie,
        addMovie,
        deleteMovie,
        addVideo,
        deleteVideo,
        user,
        toggleFavouriteActor,
        toggleFavouriteMovie,
        toggleBookmarkLesson,
        saveQuizResult,
        setAdminRole,
        projects,
        activeProject,
        setActiveProject,
        saveProject,
        deleteProject,
        shotList,
        addShot,
        deleteShot,
        checklistState,
        toggleChecklistItem,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
