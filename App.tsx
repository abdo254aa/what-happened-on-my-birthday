import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Results from './pages/Results';
import ArticlePage from './pages/ArticlePage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import { ContentProvider } from './contexts/ContentContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AdminProvider } from './contexts/AdminContext';

const App: React.FC = () => {
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const cleanUrl = window.location.hash.slice(1);
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  return (
    <ThemeProvider>
      <AdminProvider>
        <LanguageProvider>
          <SettingsProvider>
            <ContentProvider>
                <Router>
                <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
                    <Header />
                    <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/article/:id" element={<ArticlePage />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                    </main>
                    <Footer />
                </div>
                </Router>
            </ContentProvider>
          </SettingsProvider>
        </LanguageProvider>
      </AdminProvider>
    </ThemeProvider>
  );
};

export default App;