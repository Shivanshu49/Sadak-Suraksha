/* Dashboard Page */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  CheckCircle,
  Users,
  MapPin,
  Clock,
  Mic,
  ChevronRight,
  Navigation,
} from "lucide-react";
import { dashboardI18n } from "../lib/i18n";

export default function Dashboard({ darkMode, lang, onNavigate }) {
  const t = dashboardI18n[lang];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const bg = darkMode ? "bg-slate-900" : "bg-slate-50";
  const card = darkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-200";
  const text = darkMode ? "text-white" : "text-slate-900";
  const muted = darkMode ? "text-slate-400" : "text-slate-500";
  const mapOverlay = darkMode ? "bg-slate-900/50" : "bg-blue-900/10";

  const stats = [
    {
      label: t.todayReports,
      value: "14",
      icon: FileText,
      color: "text-blue-600",
      bg: darkMode ? "bg-blue-900/30" : "bg-blue-50",
    },
    {
      label: t.active,
      value: "3",
      icon: Activity,
      color: "text-red-600",
      bg: darkMode ? "bg-red-900/30" : "bg-red-50",
    },
    {
      label: t.resolved,
      value: "11",
      icon: CheckCircle,
      color: "text-green-600",
      bg: darkMode ? "bg-green-900/30" : "bg-green-50",
    },
    {
      label: t.responders,
      value: "28",
      icon: Users,
      color: "text-purple-600",
      bg: darkMode ? "bg-purple-900/30" : "bg-purple-50",
    },
  ];

  const incidents = [
    {
      label: t.incident1,
      time: t.ago1,
      sev: "Minor",
      color: "bg-yellow-500",
      pill: "bg-yellow-100 text-yellow-700",
    },
    {
      label: t.incident2,
      time: t.ago2,
      sev: "Major",
      color: "bg-red-500",
      pill: "bg-red-100 text-red-700",
    },
    {
      label: t.incident3,
      time: t.ago3,
      sev: "Blocked",
      color: "bg-orange-500",
      pill: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className={`flex flex-col flex-1 overflow-y-auto ${bg}`}>
      {/* Header */}
      <header
        className={`px-8 py-5 border-b ${darkMode
            ? "border-slate-700 bg-slate-800"
            : "border-slate-200 bg-white"
          } flex items-center justify-between flex-shrink-0`}
      >
        <div>
          <h2 className={`${text} font-bold text-xl`}>{t.welcome}</h2>
          <p className={`${muted} text-sm mt-0.5`}>{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? "bg-slate-700" : "bg-slate-100"
              }`}
          >
            <Navigation size={13} className="text-blue-500" />
            <span className={`text-sm ${text}`}>{t.location}</span>
          </div>
          <div
            className={`text-sm font-mono ${text} ${darkMode ? "bg-slate-700" : "bg-slate-100"
              } px-3 py-1.5 rounded-lg`}
          >
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 gap-6 p-8 overflow-y-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-5 w-80 flex-shrink-0">
          {/* Report Accident CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("report")}
            className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl shadow-red-500/30 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{ width: 60, height: 60, marginLeft: -6, marginTop: -6 }}
              />
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl relative z-10">
                🚨
              </div>
            </div>
            <div className="relative">
              <div className="font-bold text-xl">{t.reportBtn}</div>
              <div className="text-red-200 text-sm mt-1">{t.reportSub}</div>
            </div>
          </motion.button>

          {/* SOS Emergency */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-orange-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.1),_transparent)]" />
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 44, height: 44, marginLeft: -4, marginTop: -4 }}
              />
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center relative z-10">
                <Activity size={18} className="text-white" />
              </div>
            </div>
            <div className="text-left relative">
              <div className="font-bold text-base">{t.sosTitle}</div>
              <div className="text-orange-200 text-xs">{t.sosSub}</div>
            </div>
          </motion.button>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`${card} border rounded-2xl p-4 shadow-sm`}
              >
                <div
                  className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}
                >
                  <stat.icon size={17} className={stat.color} />
                </div>
                <div className={`text-2xl font-bold ${text}`}>{stat.value}</div>
                <div className={`text-xs ${muted} mt-0.5`}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Voice Report */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            className={`${card} border rounded-2xl p-4 flex items-center gap-4 shadow-sm`}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mic size={18} className="text-blue-700" />
            </div>
            <div className="text-left">
              <div className={`font-semibold text-sm ${text}`}>{t.voice}</div>
              <div className={`text-xs ${muted}`}>{t.safeCity}</div>
            </div>
          </motion.button>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          {/* Live Incident Map */}
          <div className={`${card} border rounded-2xl overflow-hidden shadow-sm`}>
            <div
              className={`px-5 py-3.5 border-b ${darkMode ? "border-slate-700" : "border-slate-100"
                } flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-blue-600" />
                <span className={`font-semibold text-sm ${text}`}>
                  {t.mapTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 text-xs font-medium">
                  Live
                </span>
              </div>
            </div>
            <div className="relative" style={{ minHeight: 280 }}>
              <img
                src="https://images.unsplash.com/photo-1561784493-88b0a3ce0c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Map"
                className="w-full h-full object-cover"
                style={{ minHeight: 280 }}
              />
              <div className={`absolute inset-0 ${mapOverlay}`} />

              {/* Map Markers */}
              <div className="absolute top-12 left-24 group cursor-pointer">
                <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute left-5 top-0 bg-white text-slate-800 text-[10px] px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                  Minor — MG Road
                </div>
              </div>
              <div className="absolute top-28 right-20 group cursor-pointer">
                <motion.div
                  className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="absolute right-5 top-0 bg-white text-slate-800 text-[10px] px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                  Major — NH-8
                </div>
              </div>
              <div className="absolute bottom-16 left-36 group cursor-pointer">
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute left-5 top-0 bg-white text-slate-800 text-[10px] px-2 py-1 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                  Blocked — Ring Road
                </div>
              </div>

              {/* "You" marker */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    className="absolute bg-blue-400 rounded-full opacity-40"
                    animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: 20, height: 20, top: -4, left: -4 }}
                  />
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative z-10" />
                </div>
              </div>

              {/* Legend */}
              <div
                className={`absolute bottom-3 left-3 ${darkMode ? "bg-slate-800/90" : "bg-white/90"
                  } backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-4 shadow`}
              >
                {[
                  { color: "bg-red-500", label: "Major" },
                  { color: "bg-yellow-500", label: "Minor" },
                  { color: "bg-orange-500", label: "Blocked" },
                  { color: "bg-blue-600", label: "You" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 ${color} rounded-full`} />
                    <span className={`text-[11px] ${text} font-medium`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className={`${card} border rounded-2xl shadow-sm`}>
            <div
              className={`px-5 py-3.5 border-b ${darkMode ? "border-slate-700" : "border-slate-100"
                } flex items-center justify-between`}
            >
              <span className={`font-semibold text-sm ${text}`}>
                {t.recent}
              </span>
              <button className="text-blue-600 text-xs font-medium">
                {t.viewAll} →
              </button>
            </div>
            <div
              className={`divide-y ${darkMode ? "divide-slate-700" : "divide-slate-100"
                }`}
            >
              {incidents.map((incident, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-3 ${darkMode ? "border-slate-700" : "border-slate-100"
                    }`}
                >
                  <div
                    className={`w-2.5 h-2.5 ${incident.color} rounded-full flex-shrink-0`}
                  />
                  <p className={`flex-1 text-sm ${text}`}>{incident.label}</p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className={muted} />
                    <span className={`text-xs ${muted}`}>{incident.time}</span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${incident.pill}`}
                  >
                    {incident.sev}
                  </span>
                  <button
                    className={`w-7 h-7 ${darkMode ? "bg-slate-700" : "bg-slate-100"
                      } rounded-lg flex items-center justify-center`}
                  >
                    <ChevronRight size={13} className={muted} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
