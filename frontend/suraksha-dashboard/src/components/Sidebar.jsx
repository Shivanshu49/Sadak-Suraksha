/* Sidebar Navigation Component */
import { motion } from "framer-motion";
import {
  Home,
  TriangleAlert,
  Bell,
  User,
  Phone,
  Globe,
  Moon,
  Sun,
  Wifi,
  Shield,
  LogOut,
} from "lucide-react";
import { sidebarI18n } from "../lib/i18n";

const navItems = [
  { id: "home", icon: Home, key: "home" },
  { id: "report", icon: TriangleAlert, key: "report" },
  { id: "alerts", icon: Bell, key: "alerts", badge: 5 },
  { id: "profile", icon: User, key: "profile" },
];

export default function Sidebar({
  screen,
  onNavigate,
  darkMode,
  lang,
  onToggleDark,
  onToggleLang,
}) {
  const t = sidebarI18n[lang];
  const bgColor = darkMode ? "bg-[#0a1628]" : "bg-[#0F2D52]";
  const activeClass = darkMode
    ? "bg-white/15 text-white"
    : "bg-white/20 text-white";
  const inactiveClass = "text-blue-200 hover:bg-white/10 hover:text-white";

  const isActive = (id) =>
    id === "report"
      ? screen === "report" || screen === "confirmation"
      : screen === id;

  return (
    <aside
      className={`flex flex-col w-64 min-h-screen flex-shrink-0 ${bgColor} transition-colors duration-300`}
    >
      {/* Logo & Branding */}
      <div className="px-5 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-tight">
              {lang === "hi" ? "सड़क सुरक्षा" : "Sadak Suraksha"}
            </h1>
            <p className="text-blue-300 text-[10px]">{t.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3 bg-green-500/15 rounded-lg px-2.5 py-1.5">
          <Wifi size={11} className="text-green-400" />
          <span className="text-green-400 text-[11px]">
            Safe City Network — Active
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, icon: Icon, key, badge }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all relative ${isActive(id) ? activeClass : inactiveClass
              }`}
          >
            {isActive(id) && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-white/15 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon
              size={18}
              strokeWidth={isActive(id) ? 2.2 : 1.8}
              className="relative z-10"
            />
            <span className="relative z-10">{t[key]}</span>
            {badge && !isActive(id) && (
              <span className="ml-auto relative z-10 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Emergency Button */}
      <div className="px-3 pb-2">
        <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-medium transition-all">
          <Phone size={16} />
          <span>{t.emergency}</span>
        </button>
      </div>

      {/* Language & Theme Toggles */}
      <div className="px-3 pb-5 pt-2 border-t border-white/10 mt-1 space-y-1">
        <button
          onClick={onToggleLang}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 text-sm transition-all"
        >
          <Globe size={16} />
          <span>
            {lang === "en" ? "Switch to हिंदी" : "Switch to English"}
          </span>
        </button>
        <button
          onClick={onToggleDark}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 text-sm transition-all"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>
            {darkMode
              ? lang === "hi"
                ? "लाइट मोड"
                : "Light Mode"
              : lang === "hi"
                ? "डार्क मोड"
                : "Dark Mode"}
          </span>
        </button>
      </div>

      {/* User Profile */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          RK
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium truncate">
            Ramesh Kumar
          </p>
          <p className="text-blue-300 text-[10px] truncate">
            New Delhi, India
          </p>
        </div>
        <button className="text-blue-300 hover:text-white transition-colors">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
