export type GenerationType = 'Legendary' | 'Senior' | 'Established' | 'Contemporary';

export interface Actor {
  id: string;
  name: string;
  teluguName?: string;
  title: string; // e.g. "Megastar", "Rebel Star", "Superstar", "Icon Star", "Man of Masses"
  generation: GenerationType;
  birthYear: number;
  deathYear?: number;
  birthPlace: string;
  debutYear: number;
  debutMovie: string;
  photoUrl: string;
  bannerUrl?: string;
  biography: string;
  earlyLife: string;
  careerMilestones: string[];
  notablePerformances: { movie: string; year: number; role: string; notes: string }[];
  awards: string[];
  upcomingProjects?: string[];
  filmography: { title: string; year: number; role?: string; director?: string }[];
  youtubeSearchQueries: {
    interviews: string;
    trailers: string;
    bts: string;
    speeches: string;
  };
  featuredVideos?: {
    title: string;
    youtubeId: string;
    category: string;
    channel: string;
  }[];
  isFeatured?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  teluguTitle?: string;
  year: number;
  releaseDate: string;
  genre: string[];
  heroId: string;
  heroName: string;
  director: string;
  producer: string;
  musicDirector: string;
  cinematographer: string;
  editor: string;
  posterUrl: string;
  backdropUrl?: string;
  synopsis: string;
  awards: string[];
  boxOfficeStatus?: string;
  youtubeTrailerId?: string;
  featured?: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  heroName?: string;
  heroId?: string;
  youtubeId: string;
  channelName: string;
  category: 'Hero Interviews' | 'Movie Trailers' | 'Official Teasers' | 'Behind the Scenes' | 'Making Videos' | 'Promotional Events' | 'Cinema News' | 'Hero Career Highlights' | 'Filmmaking Tutorials' | 'Animation and VFX';
  duration: string;
  publishedDate?: string;
  views?: string;
  verifiedOfficial: boolean;
}

export interface ProductionStageLesson {
  id: string;
  stage: 'Pre-Production' | 'Production' | 'Post-Production';
  topic: string;
  shortSummary: string;
  fullContent: string;
  teluguCinemaCaseStudy?: {
    movie: string;
    craftsperson: string;
    craftInsight: string;
  };
  keyTakeaways: string[];
}

export interface StoryboardPanel {
  id: string;
  panelNumber: number;
  sceneNumber: number;
  shotType: 'Extreme Wide Shot' | 'Wide Shot' | 'Medium Full Shot' | 'Medium Shot' | 'Medium Close-Up' | 'Close-Up' | 'Extreme Close-Up' | 'Over-the-Shoulder' | 'Point of View' | 'Insert Shot';
  cameraAngle: 'Eye Level' | 'Low Angle' | 'High Angle' | 'Bird\'s Eye View' | 'Worm\'s Eye View' | 'Dutch Tilt';
  cameraMovement: 'Static' | 'Pan' | 'Tilt' | 'Dolly / Tracking' | 'Crane / Jib' | 'Steadicam' | 'Handheld' | 'Zoom In / Out';
  lens?: string;
  durationSeconds: number;
  sceneDescription: string;
  actionDescription: string;
  dialogue?: string;
  soundCue?: string;
  sketchDataUrl?: string; // Data URL of canvas drawing or custom sketch
}

export interface StoryboardProject {
  id: string;
  title: string;
  logline: string;
  director: string;
  aspectRatio: '16:9' | '2.39:1' | '4:3' | '9:16';
  createdAt: string;
  updatedAt: string;
  panels: StoryboardPanel[];
}

export interface ShotPlanItem {
  id: string;
  shotNumber: string;
  sceneNumber: string;
  shotType: string;
  angle: string;
  movement: string;
  lens: string;
  lightingSetup: string;
  action: string;
  estDuration: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'Telugu Cinema History' | 'Actors & Heroes' | 'Filmmaking Stages' | 'Storyboarding' | 'Cinematography' | 'Multimedia & Animation';
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Cinematography' | 'Directing' | 'Editing' | 'Sound & Music' | 'VFX & Animation' | 'Telugu Cinema Slang';
  definition: string;
  exampleInCinema: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'member' | 'admin';
  favouriteActorIds: string[];
  favouriteMovieIds: string[];
  bookmarkedLessonIds: string[];
  completedQuizIds: { quizId: string; score: number; total: number; date: string }[];
}
