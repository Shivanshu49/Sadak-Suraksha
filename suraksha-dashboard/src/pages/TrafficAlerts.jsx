/* Traffic Alerts Page */
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bell,
    Search,
    RefreshCw,
    Filter,
    MapPin,
    Clock,
    ChevronRight,
} from "lucide-react";
import { alertsI18n, alertsData, severityStyles } from "../lib/i18n";

export default function TrafficAlerts({ darkMode, lang }) {
    const t = alertsI18n[lang];
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const bg = darkMode ? "bg-slate-900" : "bg-slate-50";
    const card = darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-slate-200";
    const text = darkMode ? "text-white" : "text-slate-900";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";
    const inputClass = darkMode
        ? "bg-slate-700 text-white placeholder-slate-400 border-slate-600"
        : "bg-white text-slate-800 placeholder-slate-400 border-slate-200";

    const filtered = alertsData.filter((a) => {
        const matchFilter = filter === "all" || a.severity === filter;
        const matchSearch =
            a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.subtitle.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const filterButtons = [
        { key: "all", label: t.all, count: alertsData.length, color: "text-slate-600" },
        {
            key: "critical",
            label: t.critical,
            count: alertsData.filter((a) => a.severity === "critical").length,
            color: "text-red-600",
        },
        {
            key: "major",
            label: t.major,
            count: alertsData.filter((a) => a.severity === "major").length,
            color: "text-orange-600",
        },
        {
            key: "minor",
            label: t.minor,
            count: alertsData.filter((a) => a.severity === "minor").length,
            color: "text-yellow-600",
        },
        {
            key: "info",
            label: "Info",
            count: alertsData.filter((a) => a.severity === "info").length,
            color: "text-blue-600",
        },
    ];

    return (
        <div className={`flex flex-col flex-1 overflow-hidden ${bg}`}>
            {/* Header */}
            <header
                className={`px-8 py-5 border-b ${darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    } flex items-center gap-4 flex-shrink-0`}
            >
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell size={18} className="text-blue-700" />
                </div>
                <div>
                    <h2 className={`${text} font-bold text-xl`}>{t.title}</h2>
                    <p className={`${muted} text-sm`}>{t.subtitle}</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {/* Search */}
                    <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${inputClass} w-56`}
                    >
                        <Search size={14} className={muted} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t.search}
                            className="bg-transparent outline-none text-sm flex-1"
                        />
                    </div>
                    {/* Refresh */}
                    <button
                        onClick={handleRefresh}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${darkMode
                                ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            } text-sm transition-colors`}
                    >
                        <motion.div
                            animate={{ rotate: refreshing ? 360 : 0 }}
                            transition={{ duration: 1 }}
                        >
                            <RefreshCw size={14} />
                        </motion.div>
                        {t.refresh}
                    </button>
                    {/* Count Badge */}
                    <div className="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {alertsData.length}
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Filter Sidebar */}
                <aside
                    className={`w-48 flex-shrink-0 border-r ${darkMode
                            ? "border-slate-700 bg-slate-800/50"
                            : "border-slate-200 bg-slate-50"
                        } px-4 py-5`}
                >
                    <p
                        className={`text-xs font-semibold ${muted} uppercase tracking-wider mb-3`}
                    >
                        <Filter size={11} className="inline mr-1" />
                        Filter
                    </p>
                    <div className="space-y-1.5">
                        {filterButtons.map(({ key, label, count, color }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${filter === key
                                        ? darkMode
                                            ? "bg-slate-700 text-white font-semibold"
                                            : "bg-white text-slate-900 font-semibold shadow-sm"
                                        : `${muted} hover:${darkMode ? "bg-slate-700" : "bg-white"
                                        }`
                                    }`}
                            >
                                <span className={`${color} font-medium`}>{label}</span>
                                <span
                                    className={`ml-auto text-xs ${filter === key ? text : muted
                                        }`}
                                >
                                    {count}
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Alert List */}
                <div className="flex-1 overflow-y-auto">
                    <div
                        className={`divide-y ${darkMode ? "divide-slate-700" : "divide-slate-200"
                            }`}
                    >
                        {filtered.map((alert) => {
                            const style = severityStyles[alert.severity];
                            return (
                                <motion.div
                                    key={alert.id}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-4 px-6 py-4 ${darkMode ? style.darkRow : style.row
                                        } hover:${darkMode ? "bg-slate-800" : "bg-slate-50"} transition-colors cursor-pointer`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className={`font-semibold text-sm ${text} truncate`}>
                                                {alert.title}
                                            </h4>
                                            <span
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${style.pill}`}
                                            >
                                                {alert.severity.charAt(0).toUpperCase() +
                                                    alert.severity.slice(1)}
                                            </span>
                                        </div>
                                        <p className={`text-xs ${muted} mb-2 line-clamp-1`}>
                                            {alert.subtitle}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={11} className={muted} />
                                                <span className={`text-[11px] ${muted}`}>
                                                    {alert.location}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={11} className={muted} />
                                                <span className={`text-[11px] ${muted}`}>
                                                    {alert.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`${muted} flex-shrink-0 mt-1`}
                                    />
                                </motion.div>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div className="flex items-center justify-center py-16">
                                <p className={`text-sm ${muted}`}>No alerts found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
