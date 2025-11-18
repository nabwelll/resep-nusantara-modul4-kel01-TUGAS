// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Determine current page from URL
  const currentPage = location.pathname.split('/')[1] || 'home';

  const handleNavigation = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/makanan" element={<MakananPage />} />
          <Route path="/makanan/:recipeId" element={<MakananPage />} />
          <Route path="/minuman" element={<MinumanPage />} />
          <Route path="/minuman/:recipeId" element={<MinumanPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      
      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

function AppRoot() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)