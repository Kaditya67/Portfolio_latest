import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
 
import AboutPage from './pages/about/index.jsx'
import ProjectsPage from './pages/projects/index.jsx'

import HomePage from './pages'
import ProjectDetail from './pages/projectDetails/index.jsx'
import ContactPage from './pages/contact/index.jsx'
import ExperiencePage from './pages/experience/index.jsx'
import LearningPage from './pages/learning/index.jsx'
import Resume from './pages/resume/index.jsx'
import Intro from './pages/intro/index.jsx'
import Certificates from './pages/certificates/index.jsx'
import GalleryPage from './pages/gallery/index.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground dark:bg-neutral-900 dark:text-white font-sans">
        <Navbar />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
