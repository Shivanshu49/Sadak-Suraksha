/* App Root — Sadak Suraksha Dashboard */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ReportAccident from "./pages/ReportAccident";
import Confirmation from "./pages/Confirmation";
import TrafficAlerts from "./pages/TrafficAlerts";
import Profile from "./pages/Profile";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("en");

  const toggleDark = () => setDarkMode((d) => !d);
  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden transition-colors duration-300 ${darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}
    >
      <Sidebar
        screen={screen}
        onNavigate={setScreen}
        darkMode={darkMode}
        lang={lang}
        onToggleDark={toggleDark}
        onToggleLang={toggleLang}
      />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {screen === "home" && (
              <Dashboard
                darkMode={darkMode}
                lang={lang}
                onNavigate={setScreen}
              />
            )}
            {screen === "report" && (
              <ReportAccident
                darkMode={darkMode}
                lang={lang}
                onNavigate={setScreen}
              />
            )}
            {screen === "confirmation" && (
              <Confirmation
                darkMode={darkMode}
                lang={lang}
                onNavigate={setScreen}
              />
            )}
            {screen === "alerts" && (
              <TrafficAlerts darkMode={darkMode} lang={lang} />
            )}
            {screen === "profile" && (
              <Profile
                darkMode={darkMode}
                lang={lang}
                onToggleDark={toggleDark}
                onToggleLang={toggleLang}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
