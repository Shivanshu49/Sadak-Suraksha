/* Profile Page */
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Camera,
    MapPin,
    Phone,
    Shield,
    ChevronRight,
    Bell,
    Navigation,
    Moon,
    Globe,
    LogOut,
    Star,
    Award,
    FileText,
} from "lucide-react";

export default function Profile({
    darkMode,
    lang,
    onToggleDark,
    onToggleLang,
}) {
    const bg = darkMode ? "bg-slate-900" : "bg-slate-50";
    const card = darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-slate-200";
    const text = darkMode ? "text-white" : "text-slate-900";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";

    const [notifications, setNotifications] = useState(true);
    const [locationSharing, setLocationSharing] = useState(true);

    const activityStats = [
        { label: lang === "hi" ? "रिपोर्ट" : "Reports", value: "12", color: "text-blue-600", bg: darkMode ? "bg-blue-900/30" : "bg-blue-50" },
        { label: lang === "hi" ? "अलर्ट" : "Alerts", value: "8", color: "text-orange-600", bg: darkMode ? "bg-orange-900/30" : "bg-orange-50" },
        { label: lang === "hi" ? "हल की गई" : "Resolved", value: "10", color: "text-green-600", bg: darkMode ? "bg-green-900/30" : "bg-green-50" },
        { label: lang === "hi" ? "रेटिंग" : "Rating", value: "4.8", color: "text-yellow-600", bg: darkMode ? "bg-yellow-900/30" : "bg-yellow-50" },
    ];

    const badges = [
        { emoji: "🥇", label: lang === "hi" ? "प्रथम प्रतिक्रिया" : "First Responder" },
        { emoji: "⭐", label: lang === "hi" ? "सामुदायिक नायक" : "Community Hero" },
        { emoji: "🛡️", label: lang === "hi" ? "सतर्क नागरिक" : "Vigilant Citizen" },
    ];

    const recentActivity = [
        { icon: "🚨", label: lang === "hi" ? "दुर्घटना रिपोर्ट — NH-8" : "Accident Report — NH-8", time: "2 days ago", status: "Resolved" },
        { icon: "⚠️", label: lang === "hi" ? "ट्रैफिक अलर्ट — रिंग रोड" : "Traffic Alert — Ring Road", time: "5 days ago", status: "Active" },
        { icon: "🚧", label: lang === "hi" ? "सड़क खराबी — सीपी" : "Road Hazard — Connaught Place", time: "1 week ago", status: "Resolved" },
    ];

    const settings = [
        { icon: Bell, label: lang === "hi" ? "पुश नोटिफिकेशन" : "Push Notifications", desc: lang === "hi" ? "सभी अलर्ट" : "All alerts", toggle: true, value: notifications, onChange: () => setNotifications(!notifications) },
        { icon: Navigation, label: lang === "hi" ? "स्थान साझाकरण" : "Location Sharing", desc: lang === "hi" ? "आपातकाल में साझा करें" : "Share during emergencies", toggle: true, value: locationSharing, onChange: () => setLocationSharing(!locationSharing) },
        { icon: Moon, label: darkMode ? (lang === "hi" ? "लाइट मोड" : "Light Mode") : (lang === "hi" ? "डार्क मोड" : "Dark Mode"), desc: lang === "hi" ? "थीम बदलें" : "Toggle theme", toggle: true, value: darkMode, onChange: onToggleDark },
        { icon: Globe, label: lang === "en" ? "Switch to हिंदी" : "Switch to English", desc: lang === "hi" ? "भाषा बदलें" : "Change language", toggle: false, onChange: onToggleLang },
    ];

    const Toggle = ({ value, onChange }) => (
        <div
            onClick={onChange}
            className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-all flex-shrink-0 cursor-pointer ${value
                    ? "bg-blue-600"
                    : darkMode
                        ? "bg-slate-600"
                        : "bg-slate-300"
                }`}
        >
            <motion.div
                className="w-5 h-5 bg-white rounded-full shadow"
                animate={{ x: value ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </div>
    );

    return (
        <div className={`flex flex-col flex-1 overflow-hidden ${bg}`}>
            {/* Header */}
            <header
                className={`px-8 py-5 border-b ${darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    } flex items-center gap-4 flex-shrink-0`}
            >
                <h2 className={`${text} font-bold text-xl`}>
                    {lang === "hi" ? "प्रोफाइल" : "My Profile"}
                </h2>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="grid grid-cols-3 gap-6">
                    {/* Column 1 — Profile Card */}
                    <div className="flex flex-col gap-5">
                        <div
                            className={`${card} border rounded-2xl p-6 shadow-sm text-center`}
                        >
                            <div className="relative inline-block mb-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto">
                                    <span className="text-white font-bold text-2xl">RK</span>
                                </div>
                                <button
                                    className={`absolute -bottom-1 -right-1 w-7 h-7 ${darkMode ? "bg-slate-700" : "bg-white"
                                        } border ${darkMode ? "border-slate-600" : "border-slate-200"
                                        } rounded-lg flex items-center justify-center shadow`}
                                >
                                    <Camera size={13} className={muted} />
                                </button>
                            </div>
                            <h3 className={`${text} font-bold text-lg mb-0.5`}>
                                Ramesh Kumar
                            </h3>
                            <p className={`${muted} text-sm mb-1`}>+91 98765 43210</p>
                            <div className="flex items-center justify-center gap-1 mb-3">
                                <MapPin size={12} className={muted} />
                                <p className={`${muted} text-sm`}>New Delhi, India</p>
                            </div>
                            <div
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${darkMode
                                        ? "bg-green-900/30 text-green-400"
                                        : "bg-green-50 text-green-700"
                                    }`}
                            >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                Verified Citizen
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                            <h4 className={`${text} font-semibold text-sm mb-3`}>
                                {lang === "hi" ? "आपातकालीन संपर्क" : "Emergency Contact"}
                            </h4>
                            <div
                                className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? "bg-slate-700" : "bg-slate-50"
                                    }`}
                            >
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <Phone size={14} className="text-red-600" />
                                </div>
                                <div>
                                    <p className={`text-sm font-medium ${text}`}>Sunita Kumar</p>
                                    <p className={`text-xs ${muted}`}>+91 87654 32109</p>
                                </div>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <button
                            className={`flex items-center justify-center gap-2.5 py-3 rounded-xl border-2 border-red-200 ${darkMode
                                    ? "bg-red-900/20 text-red-400 border-red-900"
                                    : "bg-red-50 text-red-600"
                                } font-medium text-sm transition-all hover:opacity-80`}
                        >
                            <LogOut size={16} />
                            {lang === "hi" ? "लॉग आउट करें" : "Sign Out"}
                        </button>
                    </div>

                    {/* Column 2 — Stats & Activity */}
                    <div className="flex flex-col gap-5">
                        {/* Stats */}
                        <div>
                            <h3 className={`${text} font-semibold text-sm mb-3`}>
                                {lang === "hi" ? "मेरे आँकड़े" : "My Activity Stats"}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {activityStats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`${card} border rounded-xl p-4 shadow-sm text-center`}
                                    >
                                        <p className={`text-2xl font-bold ${stat.color}`}>
                                            {stat.value}
                                        </p>
                                        <p className={`text-xs ${muted} mt-1`}>{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badges */}
                        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                            <h4 className={`${text} font-semibold text-sm mb-3`}>
                                {lang === "hi" ? "बैज और उपलब्धियाँ" : "Badges & Achievements"}
                            </h4>
                            <div className="flex gap-3">
                                {badges.map((badge, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl ${darkMode ? "bg-slate-700" : "bg-slate-50"
                                            }`}
                                    >
                                        <span className="text-2xl">{badge.emoji}</span>
                                        <span className={`text-[10px] font-medium ${text} text-center`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                            <h4 className={`${text} font-semibold text-sm mb-3`}>
                                {lang === "hi" ? "हालिया गतिविधि" : "Recent Activity"}
                            </h4>
                            <div className="space-y-3">
                                {recentActivity.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? "bg-slate-700" : "bg-slate-50"
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-medium ${text} truncate`}>
                                                {item.label}
                                            </p>
                                            <p className={`text-[10px] ${muted}`}>{item.time}</p>
                                        </div>
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === "Resolved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 3 — Settings */}
                    <div className="flex flex-col gap-5">
                        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                            <h4 className={`${text} font-semibold text-sm mb-4`}>
                                {lang === "hi" ? "सेटिंग्स" : "Settings"}
                            </h4>
                            <div className="space-y-1">
                                {settings.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={!item.toggle ? item.onChange : undefined}
                                        className={`flex items-center gap-3 p-3 rounded-xl ${darkMode
                                                ? "hover:bg-slate-700"
                                                : "hover:bg-slate-50"
                                            } transition-colors ${!item.toggle ? "cursor-pointer" : ""}`}
                                    >
                                        <div
                                            className={`w-8 h-8 ${darkMode ? "bg-slate-700" : "bg-slate-100"
                                                } rounded-lg flex items-center justify-center flex-shrink-0`}
                                        >
                                            <item.icon size={16} className={muted} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium ${text}`}>
                                                {item.label}
                                            </p>
                                            <p className={`text-xs ${muted}`}>{item.desc}</p>
                                        </div>
                                        {item.toggle ? (
                                            <Toggle value={item.value} onChange={item.onChange} />
                                        ) : (
                                            <ChevronRight
                                                size={16}
                                                className={`${muted} flex-shrink-0`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* App Info */}
                        <div className={`${card} border rounded-2xl p-5 shadow-sm`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                                    <Shield size={18} className="text-white" />
                                </div>
                                <div>
                                    <p className={`font-semibold text-sm ${text}`}>
                                        Sadak Suraksha
                                    </p>
                                    <p className={`text-xs ${muted}`}>
                                        v2.4.1 — Government of India
                                    </p>
                                </div>
                            </div>
                            <p className={`text-xs ${muted} leading-relaxed`}>
                                A Ministry of Road Transport & Highways initiative to enhance
                                road safety through real-time incident reporting.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
