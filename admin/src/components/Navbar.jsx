import ThemeToggle from "./ThemeToggle";
import {
  FiUser, FiBriefcase, FiTool, FiBookOpen, FiAward,
  FiImage, FiInfo, FiMail, FiLayers, FiLogOut,
  FiChevronDown
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const TABS = [
  { label: "Projects", icon: FiBriefcase, color: "text-emerald-500" },
  { label: "Experience", icon: FiLayers, color: "text-amber-500" },
  { label: "Learning", icon: FiBookOpen, color: "text-purple-500" },
  { label: "Skills", icon: FiTool, color: "text-blue-500" },
  { label: "Certificates", icon: FiAward, color: "text-red-500" },
  { label: "Media", icon: FiImage, color: "text-pink-500" },
  { label: "Profile", icon: FiUser, color: "text-cyan-500" },
  { label: "About", icon: FiInfo, color: "text-indigo-500" },
  { label: "Contact", icon: FiMail, color: "text-green-500" },
];

export default function Navbar({ user, activeTab, setActiveTab, onLogout }) {
  const [showDesktopMore, setShowDesktopMore] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(TABS);
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const navRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const desktopMoreRef = useRef(null);
  const mobileMoreRef = useRef(null);

  const initials =
    user?.email
      ? user.email.split("@")[0].split(/[.\-_]/).map((s) => s[0]?.toUpperCase() || "").join("").slice(0, 2)
      : "?";

  const MOBILE_TAB_COUNT = 4;

  // Desktop tab calculation
  useEffect(() => {
    const updateTabs = () => {
      if (!navRef.current) return;

      const navWidth = navRef.current.offsetWidth;
      // Generous buffer for brand + theme toggle + user badge + logout button
      const brandWidth = window.innerWidth >= 768 ? 190 : 150;
      const userSectionWidth = window.innerWidth >= 1024 ? 160 : 0;
      const actionsBaseWidth = 100; // theme toggle + logout + gaps
      const actionsWidth = actionsBaseWidth + userSectionWidth;
      const tabsArea = navWidth - brandWidth - actionsWidth - 40;
      const moreButtonWidth = 90;

      let availableWidth = tabsArea - moreButtonWidth;

      // Realistic tab width with icon + label + padding
      const getTabWidth = (label) => 65 + label.length * 9;
      let usedWidth = 0;
      let vis = [];
      let hid = [];

      for (const tab of TABS) {
        const tabWidth = getTabWidth(tab.label);
        if (usedWidth + tabWidth <= availableWidth) {
          vis.push(tab);
          usedWidth += tabWidth;
        } else {
          hid.push(tab);
        }
      }

      // Ensure at least 1 tab is visible if possible
      if (vis.length === 0 && TABS.length > 0) {
        vis.push(TABS[0]);
        hid = TABS.slice(1);
      }

      setVisibleTabs(vis);
      setHiddenTabs(hid);
    };

    updateTabs();
    window.addEventListener("resize", updateTabs);
    return () => window.removeEventListener("resize", updateTabs);
  }, []);

  // Click outside for desktop more menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopMoreRef.current && !desktopMoreRef.current.contains(event.target)) {
        setShowDesktopMore(false);
      }
      if (mobileMoreRef.current && !mobileMoreRef.current.contains(event.target)) {
        setShowMobileMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        ref={navRef}
        className="hidden sm:flex items-center justify-between px-3 md:px-5 lg:px-6 py-2 sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm border-b border-gray-200/70 dark:border-gray-700/60 w-full"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0 min-w-0 pr-2">
          <div className="relative flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm md:text-base text-gray-900 dark:text-white leading-tight tracking-tight">Portfolio</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">Admin</span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-0.5 hidden md:inline">Console & Content</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex justify-center mx-2 min-w-0" ref={tabsContainerRef}>
          <div className="flex items-center gap-0.5 flex-nowrap">
            {visibleTabs.map(({ label, icon: Icon, color }) => {
              const isActive = activeTab === label.toLowerCase();
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(label.toLowerCase())}
                  className={`group relative px-2 py-1.5 flex items-center gap-1.5 font-medium text-xs transition-all focus:outline-none whitespace-nowrap border-b-2 flex-shrink-0
                    ${isActive
                      ? `border-blue-500 text-blue-600 dark:text-blue-400`
                      : `border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:border-blue-400`
                    }`}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={0}
                >
                  <Icon
                    className={`text-base flex-shrink-0 transition-colors duration-200 ${
                      isActive
                        ? color
                        : "text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    }`}
                  />
                  <span>{label}</span>

                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full bg-blue-500 transition-all duration-300 ease-out transform ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-0"
                    } origin-left`}
                  ></span>
                </button>
              );
            })}

            {hiddenTabs.length > 0 && (
              <div className="relative flex-shrink-0" ref={desktopMoreRef}>
                <button
                  type="button"
                  onClick={() => setShowDesktopMore((prev) => !prev)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-xs font-medium cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={showDesktopMore ? "true" : "false"}
                  tabIndex={0}
                >
                  <FiChevronDown className={`text-xs transition-transform duration-200 ${showDesktopMore ? "rotate-180" : ""}`} />
                  <span>More ({hiddenTabs.length})</span>
                </button>

                {showDesktopMore && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1.5 z-[100]">
                    {hiddenTabs.map(({ label, icon: Icon, color }) => {
                      const isActive = activeTab === label.toLowerCase();
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            setActiveTab(label.toLowerCase());
                            setShowDesktopMore(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition hover:bg-blue-50 dark:hover:bg-blue-900/50 cursor-pointer
                            ${isActive ? 'bg-blue-50 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}
                          tabIndex={0}
                        >
                          <Icon className={`text-base flex-shrink-0 ${color}`} />
                          <span className="truncate">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User + Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 justify-end ml-auto">
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 max-w-[160px]">
            <div className="h-7 w-7 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-800 dark:text-blue-200 font-bold text-xs uppercase flex-shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-tight truncate">
                {user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow hover:shadow-lg flex-shrink-0"
            aria-label="Logout"
            title="Log out"
            tabIndex={0}
          >
            <FiLogOut className="text-base" />
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 w-[96vw] max-w-sm">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700/80 px-2 py-1.5">
          <div className="flex items-center justify-between gap-1">
            {/* Tabs */}
            <div className="flex items-center justify-evenly flex-1 gap-1 min-w-0">
              {TABS.slice(0, 3).map(({ label, icon: Icon, color }) => {
                const isActive = activeTab === label.toLowerCase();
                return (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label.toLowerCase())}
                    className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition flex-1 min-w-0
                      ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm" 
                                 : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    aria-label={label}
                    tabIndex={0}
                  >
                    <Icon className={`text-base ${isActive ? color : "text-gray-400"}`} />
                    <span className="text-[9px] mt-0.5 font-medium truncate max-w-full">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile More + Logout */}
            <div className="flex items-center gap-1 flex-shrink-0 pl-1 border-l border-gray-200 dark:border-gray-700">
              <div className="relative" ref={mobileMoreRef}>
                <button
                  onClick={() => setShowMobileMore(!showMobileMore)}
                  className="flex flex-col items-center py-1 px-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-haspopup="true"
                  aria-expanded={showMobileMore ? "true" : "false"}
                  tabIndex={0}
                >
                  <FiChevronDown className={`text-base transition ${showMobileMore ? "rotate-180" : ""}`} />
                  <span className="text-[9px] mt-0.5 font-medium">More</span>
                </button>

                {showMobileMore && (
                  <div className="absolute bottom-full mb-3 right-0 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1.5 z-[9999] pointer-events-auto max-h-[70vh] overflow-y-auto">
                    {TABS.slice(3).map(({ label, icon: Icon, color }) => {
                      const isActive = activeTab === label.toLowerCase();
                      return (
                        <button
                          key={label}
                          onClick={() => {
                            setActiveTab(label.toLowerCase());
                            setShowMobileMore(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded
                            ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                                      : "text-gray-600 dark:text-gray-300"}`}
                          tabIndex={0}
                        >
                          <Icon className={`text-base ${color}`} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                    <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-1 flex items-center justify-between">
                      <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex flex-col items-center py-1 px-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition flex-shrink-0"
                aria-label="Logout"
                title="Log out"
                tabIndex={0}
              >
                <FiLogOut className="text-base" />
                <span className="text-[9px] mt-0.5 font-medium text-red-500">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
