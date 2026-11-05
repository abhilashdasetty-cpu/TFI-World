import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ActorProfileModal } from './components/ActorProfileModal';
import { MovieDetailModal } from './components/MovieDetailModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { HeroesPage } from './pages/HeroesPage';
import { MoviesPage } from './pages/MoviesPage';
import { VideosPage } from './pages/VideosPage';
import { AcademyPage } from './pages/AcademyPage';
import { StoryboardPage } from './pages/StoryboardPage';
import { MultimediaPage } from './pages/MultimediaPage';
import { HistoryPage } from './pages/HistoryPage';
import { LearningPage } from './pages/LearningPage';
import { StudioToolsPage } from './pages/StudioToolsPage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePage, selectedActor, setSelectedActor, selectedMovie, setSelectedMovie } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#08090C] text-[#E6E8EE]">
      {/* Top Bar Header */}
      <Header />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'heroes' && <HeroesPage />}
        {activePage === 'movies' && <MoviesPage />}
        {activePage === 'videos' && <VideosPage />}
        {activePage === 'academy' && <AcademyPage />}
        {activePage === 'storyboard' && <StoryboardPage />}
        {activePage === 'multimedia' && <MultimediaPage />}
        {activePage === 'history' && <HistoryPage />}
        {activePage === 'learning' && <LearningPage />}
        {activePage === 'studio' && <StudioToolsPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'admin' && <AdminPage />}
      </main>

      {/* Modals & Dialogs */}
      {selectedActor && (
        <ActorProfileModal
          actor={selectedActor}
          onClose={() => setSelectedActor(null)}
        />
      )}

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <GlobalSearchModal />
      <ToastContainer />

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
