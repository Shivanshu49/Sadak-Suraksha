/* Confirmation Page */
import { motion } from "framer-motion";
import {
    CheckCircle,
    Phone,
    Share2,
    Download,
    Home,
    Navigation,
    MapPin,
    Clock,
    Shield,
} from "lucide-react";
import { confirmationI18n } from "../lib/i18n";

export default function Confirmation({ darkMode, lang, onNavigate }) {
    const t = confirmationI18n[lang];

    const bg = darkMode ? "bg-slate-900" : "bg-slate-50";
    const card = darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-slate-200";
    const text = darkMode ? "text-white" : "text-slate-900";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const etas = [
        { label: t.ambulanceEta, eta: 4, emoji: "🚑", status: t.enRoute, color: "bg-blue-500" },
        { label: t.policeEta, eta: 7, emoji: "🚔", status: t.dispatched, color: "bg-green-500" },
        { label: t.fireEta, eta: 12, emoji: "🚒", status: t.arriving, color: "bg-orange-500" },
    ];

    const timeline = [
        { label: t.reported, time: t.reportedTime, done: true },
        { label: t.notified, time: t.notifiedTime, done: true },
        { label: t.onWay, time: t.onWayTime, done: false },
    ];

    return (
        <div className={`flex flex-col flex-1 overflow-hidden ${bg}`}>
            {/* Header */}
            <header
                className={`px-8 py-5 border-b ${darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    } flex-shrink-0`}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center"
                    >
                        <CheckCircle size={24} className="text-green-600" />
                    </motion.div>
                    <div>
                        <h2 className={`${text} font-bold text-xl`}>{t.title}</h2>
                        <p className={`${muted} text-sm`}>{t.subtitle}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-green-500 text-sm font-bold"
                        >
                            {t.helpMsg}
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex flex-1 gap-6 p-8 overflow-y-auto">
                {/* Left Column */}
                <div className="flex flex-col gap-5 w-96 flex-shrink-0">
                    {/* Report ID */}
                    <div
                        className={`${card} border rounded-2xl p-5 shadow-sm text-center`}
                    >
                        <p className={`text-xs ${muted} mb-1`}>{t.refId}</p>
                        <p className={`text-2xl font-bold ${text} font-mono`}>
                            SS-2024-{Math.floor(1000 + Math.random() * 9000)}
                        </p>
                    </div>

                    {/* ETA Cards */}
                    <div className="grid grid-cols-3 gap-3">
                        {etas.map((item) => (
                            <div
                                key={item.label}
                                className={`${card} border rounded-2xl p-4 shadow-sm text-center`}
                            >
                                <span className="text-2xl mb-2 block">{item.emoji}</span>
                                <p className={`text-xs ${muted} mb-1`}>{item.label}</p>
                                <p className={`text-2xl font-bold ${text}`}>
                                    {item.eta}
                                    <span className={`text-xs ${muted} ml-1`}>
                                        {t.etaUnit}
                                    </span>
                                </p>
                                <div className="flex items-center justify-center gap-1.5 mt-2">
                                    <div className={`w-1.5 h-1.5 ${item.color} rounded-full animate-pulse`} />
                                    <span className={`text-[10px] font-medium ${muted}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl py-3.5 flex items-center justify-center gap-3 shadow-lg shadow-red-500/20 font-bold transition-all">
                            <Phone size={17} />
                            {t.call}
                        </button>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                className={`${card} border rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all`}
                            >
                                <Share2 size={15} className="text-blue-600" />
                                <span className={`text-xs font-medium ${text}`}>
                                    {t.share}
                                </span>
                            </button>
                            <button
                                className={`${card} border rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all`}
                            >
                                <Download size={15} className="text-slate-500" />
                                <span className={`text-xs font-medium ${text}`}>
                                    {t.download}
                                </span>
                            </button>
                            <button
                                onClick={() => onNavigate("home")}
                                className={`${card} border rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all`}
                            >
                                <Home size={15} className="text-slate-500" />
                                <span className={`text-xs font-medium ${text}`}>
                                    {lang === "hi" ? "होम" : "Home"}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Responders */}
                    <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <h3 className={`font-semibold text-sm ${text} mb-4`}>
                            {t.responders}
                        </h3>
                        {etas.map((resp, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 py-3 ${i < etas.length - 1
                                        ? `border-b ${darkMode ? "border-slate-700" : "border-slate-100"
                                        }`
                                        : ""
                                    }`}
                            >
                                <span className="text-xl">{resp.emoji}</span>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${text}`}>{resp.label}</p>
                                    <p className={`text-xs ${muted}`}>
                                        ETA: {resp.eta} {t.etaUnit}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-2 h-2 ${resp.color} rounded-full animate-pulse`} />
                                    <span className={`text-xs font-medium ${muted}`}>
                                        {resp.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column — Tracking Map */}
                <div className="flex-1 flex flex-col gap-5 min-w-0">
                    <div
                        className={`${card} border rounded-2xl overflow-hidden shadow-sm flex-1`}
                        style={{ minHeight: 400 }}
                    >
                        <div
                            className={`px-5 py-3.5 border-b ${darkMode ? "border-slate-700" : "border-slate-100"
                                } flex items-center gap-3`}
                        >
                            <Navigation size={16} className="text-green-600" />
                            <span className={`font-semibold text-sm ${text}`}>
                                {t.tracking}
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-600 text-xs font-medium">
                                    Live
                                </span>
                            </div>
                        </div>
                        <div className="relative h-full" style={{ minHeight: 360 }}>
                            <img
                                src="https://images.unsplash.com/photo-1561784493-88b0a3ce0c76?w=1000&q=80"
                                alt="Map"
                                className="w-full h-full object-cover"
                                style={{ minHeight: 360 }}
                            />
                            <div
                                className={`absolute inset-0 ${darkMode ? "bg-slate-900/50" : "bg-blue-900/10"
                                    }`}
                            />

                            {/* Animated Route Path */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 600 360"
                                preserveAspectRatio="none"
                            >
                                <motion.path
                                    d="M 80 300 Q 150 250 200 200 Q 280 150 350 160 Q 430 170 500 120"
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="3"
                                    strokeDasharray="8,5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>

                            {/* Incident Marker */}
                            <div
                                className="absolute"
                                style={{ bottom: "18%", right: "16%" }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-xl flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">!</span>
                                    </div>
                                </motion.div>
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-red-600 text-[10px] px-2 py-0.5 rounded font-bold shadow whitespace-nowrap">
                                    INCIDENT
                                </div>
                            </div>

                            {/* Responder Markers */}
                            <div className="absolute" style={{ top: "30%", left: "15%" }}>
                                <motion.div
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                        <span className="text-[10px]">🚑</span>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="absolute" style={{ top: "55%", left: "35%" }}>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                        <span className="text-[10px]">🚔</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Location label */}
                            <div
                                className={`absolute bottom-3 left-3 ${darkMode ? "bg-slate-800/90" : "bg-white/90"
                                    } backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow`}
                            >
                                <MapPin size={12} className="text-red-500" />
                                <span className={`text-xs font-medium ${text}`}>
                                    {t.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Response Timeline */}
                    <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <h3 className={`font-semibold text-sm ${text} mb-4`}>
                            {t.timeline}
                        </h3>
                        <div className="flex items-center gap-4">
                            {timeline.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 flex-1">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done
                                                ? "bg-green-100 text-green-600"
                                                : darkMode
                                                    ? "bg-slate-700 text-slate-400"
                                                    : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        {step.done ? (
                                            <CheckCircle size={16} />
                                        ) : (
                                            <Clock size={16} />
                                        )}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium ${text}`}>{step.label}</p>
                                        <p className={`text-[10px] ${muted}`}>{step.time}</p>
                                    </div>
                                    {i < timeline.length - 1 && (
                                        <div
                                            className={`flex-1 h-px ${step.done
                                                    ? "bg-green-300"
                                                    : darkMode
                                                        ? "bg-slate-600"
                                                        : "bg-slate-200"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
