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
      if (!navRef.current || !tabsContainerRef.current) return;

      const navWidth = navRef.current.offsetWidth;
      const brandWidth = 220;
      const userSectionWidth = window.innerWidth >= 768 ? 140 : 0;
      const actionsBaseWidth = 120;
      const actionsWidth = actionsBaseWidth + userSectionWidth;
      const tabsArea = navWidth - brandWidth - actionsWidth - 40;
      const moreButtonWidth = 80;

      let availableWidth = tabsArea - moreButtonWidth;

      const getTabWidth = (label) => 60 + label.length * 8;
      let usedWidth = 0;
      let vis = [];
      let hid = [];

      for (const tab of TABS) {
        const tabWidth = getTabWidth(tab.label);
        if (usedWidth + tabWidth <= availableWidth && vis.length < 8) {
          vis.push(tab);
          usedWidth += tabWidth;
        } else {
          hid.push(tab);
        }
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
        className="hidden sm:flex items-center justify-between px-4 lg:px-6 py-3 sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow border-b border-gray-200/70 dark:border-gray-700/60"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0" style={{ minWidth: "180px" }}>
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-lg text-white shadow-lg select-none">
              🛡
            </div>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-900" />
          </div>
          <div className="flex flex-col ml-1">
            <span className="font-bold text-lg text-blue-700 dark:text-blue-200">Portfolio</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Admin Panel</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex justify-center mx-2" ref={tabsContainerRef}>
          <div className="flex items-center gap-1">
            {visibleTabs.map(({ label, icon: Icon, color }) => {
              const isActive = activeTab === label.toLowerCase();
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(label.toLowerCase())}
                  className={`group relative px-3 py-2 flex items-center gap-2 font-medium text-sm transition-all focus:outline-none whitespace-nowrap border-b-2
                    ${isActive
                      ? `border-blue-500 text-blue-600 dark:text-blue-400`
                      : `border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:border-blue-400`
                    }`}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={0}
                >
                  <Icon
                    className={`text-lg transition-colors duration-200 ${
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
              <div className="relative" ref={desktopMoreRef}>
                <button
                  onClick={() => setShowDesktopMore(!showDesktopMore)}
                  className="flex items-center gap-1 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  aria-haspopup="true"
                  aria-expanded={showDesktopMore ? "true" : "false"}
                  tabIndex={0}
                >
                  <FiChevronDown className={`text-sm transition ${showDesktopMore ? "rotate-180" : ""}`} />
                  <span className="text-sm ml-1">More</span>
                </button>

                {showDesktopMore && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {hiddenTabs.map(({ label, icon: Icon, color }) => {
                      const isActive = activeTab === label.toLowerCase();
                      return (
                        <button
                          key={label}
                          onClick={() => {
                            setActiveTab(label.toLowerCase());
                            setTimeout(() => setShowDesktopMore(false), 150);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition hover:bg-blue-100 dark:hover:bg-blue-900 rounded
                            ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
                          tabIndex={0}
                        >
                          <Icon className={`text-lg ${color}`} />
                          <span>{label}</span>
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
        <div className="flex items-center gap-2 flex-shrink-0 justify-end">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
            <div className="h-8 w-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-800 dark:text-blue-200 font-bold text-xs uppercase">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-tight">
                {user?.email?.split('@')[0]}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow hover:shadow-lg"
            aria-label="Logout"
            tabIndex={0}
          >
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="sm:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[94vw] max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 px-3 py-2">
          <div className="flex items-center justify-between">
            {/* Tabs */}
            <div className="flex items-center justify-evenly flex-1 gap-1">
              {TABS.slice(0, MOBILE_TAB_COUNT).map(({ label, icon: Icon, color }) => {
                const isActive = activeTab === label.toLowerCase();
                return (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label.toLowerCase())}
                    className={`flex flex-col items-center p-2 rounded-lg transition min-w-[60px]
                      ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow" 
                                 : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    aria-label={label}
                    tabIndex={0}
                  >
                    <Icon className={`text-lg ${isActive ? color : "text-gray-400"}`} />
                    <span className="text-[9px] mt-0.5 font-medium">{label.slice(0, 3)}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile More + Logout */}
            <div className="flex items-center gap-1 ml-2">
              {TABS.length > MOBILE_TAB_COUNT && (
                <div className="relative" ref={mobileMoreRef}>
                  <button
                    onClick={() => setShowMobileMore(!showMobileMore)}
                    className="flex flex-col items-center p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 min-w-[50px]"
                    aria-haspopup="true"
                    aria-expanded={showMobileMore ? "true" : "false"}
                    tabIndex={0}
                  >
                    <FiChevronDown className={`text-sm transition ${showMobileMore ? "rotate-180" : ""}`} />
                    <span className="text-[9px] mt-0.5 font-medium">More</span>
                  </button>

                  {showMobileMore && (
                    <div className="absolute bottom-full mb-2 right-0 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-[9999] pointer-events-auto">
                      {TABS.slice(MOBILE_TAB_COUNT).map(({ label, icon: Icon, color }) => {
                        const isActive = activeTab === label.toLowerCase();
                        return (
                          <button
                            key={label}
                            onClick={() => {
                              setActiveTab(label.toLowerCase());
                              setShowMobileMore(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition hover:bg-blue-100 dark:hover:bg-blue-900 rounded
                              ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                        : "text-gray-600 dark:text-gray-300"}`}
                            tabIndex={0}
                          >
                            <Icon className={`text-base ${color}`} />
                            <span>{label}</span>
                          </button>
                        );
                      })}
                      <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-1 flex items-center">
                        <ThemeToggle small />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-200 font-medium">Theme</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex flex-col items-center p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition min-w-[50px]"
                aria-label="Logout"
                tabIndex={0}
              >
                <FiLogOut className="text-lg" />
                <span className="text-[9px] mt-0.5 font-medium">Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
