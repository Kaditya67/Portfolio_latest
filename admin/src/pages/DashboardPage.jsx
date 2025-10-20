import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ProjectsTab from "../components/tabs/ProjectsTab";
import SkillsTab from "../components/tabs/SkillsTab";
import LearningTab from "../components/tabs/LearningTab";
import ExperienceTab from "../components/tabs/ExperienceTab";
import CertificatesTab from "../components/tabs/CertificatesTab";
import MediaTab from "../components/tabs/MediaTab";
import ProfileTab from "../components/tabs/ProfileTab";
import AboutTab from "../components/tabs/AboutTab";
import ContactTab from "../components/tabs/ContactTab";

const TABS = [
  { id: "projects", label: "Projects", component: ProjectsTab, tooltip: "View all your projects" },
  { id: "skills", label: "Skills", component: SkillsTab, tooltip: "Showcase your skills" },
  { id: "learning", label: "Learning", component: LearningTab, tooltip: "Your learning journey" },
  { id: "experience", label: "Experience", component: ExperienceTab, tooltip: "Professional experience" },
  { id: "certificates", label: "Certificates", component: CertificatesTab, tooltip: "Certificates & badges" },
  { id: "media", label: "Media", component: MediaTab, tooltip: "Media gallery" },
  { id: "profile", label: "Profile", component: ProfileTab, tooltip: "Edit your profile" },
  { id: "about", label: "About", component: AboutTab, tooltip: "About yourself" },
  { id: "contact", label: "Contact", component: ContactTab, tooltip: "Contact details" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-900 text-foreground dark:text-white">
      <Navbar user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></span>
          <span className="ml-3 text-lg">Loading...</span>
        </div>
      ) : (
        <main className="p-6">
          <div className="rounded-lg shadow-lg bg-card dark:bg-neutral-800 border border-border dark:border-neutral-700 p-6 min-h-[60vh] transition-all">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </main>
      )}

      {/* Only add this if using the floating theme toggle pattern */}
      {/*<div className="sm:hidden fixed top-3 right-4 z-50">
        <ThemeToggle small />
      </div> */}
    </div>
  );
}
