import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages'));
const Intro = lazy(() => import('./pages/intro/index.jsx'));
const AboutPage = lazy(() => import('./pages/about/index.jsx'));
const ProjectsPage = lazy(() => import('./pages/projects/index.jsx'));
const ProjectDetail = lazy(() => import('./pages/projectDetails/index.jsx'));
const ContactPage = lazy(() => import('./pages/contact/index.jsx'));
const ExperiencePage = lazy(() => import('./pages/experience/index.jsx'));
const LearningPage = lazy(() => import('./pages/learning/index.jsx'));
const Certificates = lazy(() => import('./pages/certificates/index.jsx'));
const GalleryPage = lazy(() => import('./pages/gallery/index.jsx'));
const Resume = lazy(() => import('./pages/resume/index.jsx'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground dark:bg-neutral-900 dark:text-white font-sans">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
