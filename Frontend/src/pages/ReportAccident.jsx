/* Report Accident Page */
import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    MapPin,
    Camera,
    Upload,
    Mic,
    X,
    Navigation,
} from "lucide-react";
import { reportI18n } from "../lib/i18n";

const SAMPLE_PHOTOS = [
    "https://images.unsplash.com/photo-1686797366685-6420f4bd9c2f?w=300&q=80",
    "https://images.unsplash.com/photo-1654188892289-5e03e48b22c7?w=300&q=80",
];

export default function ReportAccident({ darkMode, lang, onNavigate }) {
    const t = reportI18n[lang];
    const [severity, setSeverity] = useState("minor");
    const [ambulance, setAmbulance] = useState(true);
    const [police, setPolice] = useState(false);
    const [fire, setFire] = useState(false);
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [recording, setRecording] = useState(false);

    const bg = darkMode ? "bg-slate-900" : "bg-slate-50";
    const card = darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-slate-200";
    const text = darkMode ? "text-white" : "text-slate-900";
    const muted = darkMode ? "text-slate-400" : "text-slate-500";
    const inputBg = darkMode
        ? "bg-slate-700 text-white placeholder-slate-400 border-slate-600"
        : "bg-slate-50 text-slate-800 placeholder-slate-400 border-slate-200";

    const severityOptions = [
        {
            key: "minor",
            label: t.minor,
            color: "text-yellow-700 bg-yellow-50 border-yellow-300",
            dot: "bg-yellow-500",
        },
        {
            key: "major",
            label: t.major,
            color: "text-orange-700 bg-orange-50 border-orange-300",
            dot: "bg-orange-500",
        },
        {
            key: "critical",
            label: t.critical,
            color: "text-red-700 bg-red-50 border-red-300",
            dot: "bg-red-500",
        },
    ];

    const currentSeverity = severityOptions.find((s) => s.key === severity);

    const addPhoto = () => {
        if (photos.length < 6) {
            setPhotos([...photos, SAMPLE_PHOTOS[photos.length % SAMPLE_PHOTOS.length]]);
        }
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 2000));
        setSubmitting(false);
        onNavigate("confirmation");
    };

    return (
        <div className={`flex flex-col flex-1 overflow-hidden ${bg}`}>
            {/* Header */}
            <header
                className={`px-8 py-5 border-b ${darkMode
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-200 bg-white"
                    } flex items-center gap-4 flex-shrink-0`}
            >
                <button
                    onClick={() => onNavigate("home")}
                    className={`w-9 h-9 ${darkMode
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-slate-100 hover:bg-slate-200"
                        } rounded-xl flex items-center justify-center transition-colors`}
                >
                    <ArrowLeft size={17} className={text} />
                </button>
                <div>
                    <h2 className={`${text} font-bold text-xl`}>{t.title}</h2>
                    <p className={`${muted} text-sm`}>{t.subtitle}</p>
                </div>
                {/* Steps */}
                <div className="ml-auto flex items-center gap-3">
                    {[t.step1, t.step2, t.step3].map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${i === 0
                                        ? "bg-blue-600 text-white"
                                        : i === 1
                                            ? "bg-blue-100 text-blue-700"
                                            : darkMode
                                                ? "bg-slate-700 text-slate-400"
                                                : "bg-slate-100 text-slate-400"
                                    }`}
                            >
                                <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                                    {i + 1}
                                </span>
                                {step}
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-6 h-px ${darkMode ? "bg-slate-600" : "bg-slate-300"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </header>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Form */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                    {/* GPS Location */}
                    <section className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MapPin size={14} className="text-blue-700" />
                            </div>
                            <span className={`font-semibold ${text}`}>{t.location}</span>
                            <div className="ml-auto flex items-center gap-1.5">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-600 text-xs font-medium">
                                    Auto-detected
                                </span>
                            </div>
                        </div>
                        <div className={`rounded-xl px-4 py-3 text-sm border ${inputBg} mb-2`}>
                            {t.locationVal}
                        </div>
                        <button className="text-blue-600 text-xs font-medium hover:underline">
                            {t.editLocation} →
                        </button>
                    </section>

                    {/* Photos */}
                    <section className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Camera size={14} className="text-purple-700" />
                            </div>
                            <span className={`font-semibold ${text}`}>{t.photos}</span>
                            <span className={`ml-auto text-xs ${muted}`}>
                                {photos.length}/6
                            </span>
                        </div>
                        {photos.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {photos.map((src, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square rounded-xl overflow-hidden group"
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                                        <button
                                            onClick={() => removePhoto(i)}
                                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={10} className="text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={addPhoto}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-medium transition-colors"
                            >
                                <Camera size={15} />
                                {t.capture}
                            </button>
                            <button
                                onClick={addPhoto}
                                className={`flex items-center justify-center gap-2 border-2 border-dashed ${darkMode
                                        ? "border-slate-600 text-slate-300"
                                        : "border-slate-300 text-slate-500"
                                    } rounded-xl py-3 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-colors`}
                            >
                                <Upload size={15} />
                                {t.upload}
                            </button>
                        </div>
                    </section>

                    {/* Severity */}
                    <section className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-base">⚠️</span>
                            <span className={`font-semibold ${text}`}>{t.severity}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-2">
                            {severityOptions.map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setSeverity(opt.key)}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${severity === opt.key
                                            ? opt.color + " ring-2 ring-offset-1 ring-current"
                                            : darkMode
                                                ? "bg-slate-700 border-slate-600 text-slate-300"
                                                : "bg-slate-50 border-slate-200 text-slate-500"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${opt.dot}`} />
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Description */}
                    <section className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`font-semibold ${text}`}>{t.description}</span>
                            <button
                                onClick={() => setRecording(!recording)}
                                className={`ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${recording
                                        ? "bg-red-500 text-white"
                                        : darkMode
                                            ? "bg-slate-700 text-slate-300"
                                            : "bg-slate-100 text-slate-600"
                                    }`}
                            >
                                <Mic
                                    size={13}
                                    className={recording ? "animate-pulse" : ""}
                                />
                                {t.voiceNote}
                            </button>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t.descPlaceholder}
                            rows={4}
                            className={`w-full rounded-xl px-4 py-3 text-sm border resize-none ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        />
                    </section>

                    {/* Emergency Services */}
                    <section className={`${card} border rounded-2xl p-5 shadow-sm`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-base">🚨</span>
                            <span className={`font-semibold ${text}`}>{t.services}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    key: "ambulance",
                                    label: t.ambulance,
                                    emoji: "🚑",
                                    active: ambulance,
                                    toggle: () => setAmbulance(!ambulance),
                                },
                                {
                                    key: "police",
                                    label: t.police,
                                    emoji: "🚔",
                                    active: police,
                                    toggle: () => setPolice(!police),
                                },
                                {
                                    key: "fire",
                                    label: t.fire,
                                    emoji: "🚒",
                                    active: fire,
                                    toggle: () => setFire(!fire),
                                },
                            ].map((svc) => (
                                <button
                                    key={svc.key}
                                    onClick={svc.toggle}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all ${svc.active
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : darkMode
                                                ? "bg-slate-700 border-slate-600 text-slate-300"
                                                : "bg-slate-50 border-slate-200 text-slate-500"
                                        }`}
                                >
                                    <span className="text-lg">{svc.emoji}</span>
                                    {svc.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl py-4 flex items-center justify-center gap-3 shadow-xl shadow-red-500/20 font-bold text-lg transition-all disabled:opacity-70"
                    >
                        {submitting ? (
                            <>
                                <motion.div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                {t.submitting}
                            </>
                        ) : (
                            t.submit
                        )}
                    </motion.button>
                </div>

                {/* Right Preview Panel */}
                <aside
                    className={`w-80 flex-shrink-0 border-l ${darkMode ? "border-slate-700" : "border-slate-200"
                        } overflow-y-auto p-5 space-y-4`}
                >
                    <h3 className={`font-semibold text-sm ${text} mb-3`}>
                        {t.previewTitle}
                    </h3>

                    {/* Location Preview Map */}
                    <div className="relative rounded-xl overflow-hidden" style={{ height: 160 }}>
                        <img
                            src="https://images.unsplash.com/photo-1561784493-88b0a3ce0c76?w=400&q=80"
                            alt="Map preview"
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${darkMode ? "bg-slate-900/40" : "bg-blue-900/10"}`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <motion.div
                                    className="absolute bg-red-400 rounded-full opacity-50"
                                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                    style={{ width: 20, height: 20, top: -4, left: -4 }}
                                />
                                <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg relative z-10" />
                            </div>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1.5">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={11} className="text-red-600" />
                                <span className="text-slate-700 text-[10px] font-medium truncate">
                                    {t.locationVal}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className={`${card} border rounded-xl p-4 space-y-3 shadow-sm`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${muted}`}>Severity</span>
                            <span
                                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${currentSeverity.color}`}
                            >
                                {currentSeverity.label}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${muted}`}>Photos</span>
                            <span className={`text-xs font-semibold ${text}`}>
                                {photos.length} attached
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs ${muted}`}>Services</span>
                            <div className="flex gap-1">
                                {ambulance && <span className="text-sm">🚑</span>}
                                {police && <span className="text-sm">🚔</span>}
                                {fire && <span className="text-sm">🚒</span>}
                                {!ambulance && !police && !fire && (
                                    <span className={`text-xs ${muted}`}>None</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div
                        className={`rounded-xl p-4 ${darkMode
                                ? "bg-blue-900/30 border border-blue-800"
                                : "bg-blue-50 border border-blue-100"
                            }`}
                    >
                        <p
                            className={`text-xs font-semibold ${darkMode ? "text-blue-300" : "text-blue-700"
                                } mb-2`}
                        >
                            💡 Tips
                        </p>
                        {[
                            "Stay safe and move away from traffic",
                            "Note license plates if possible",
                            "Do not move injured persons",
                        ].map((tip, i) => (
                            <p
                                key={i}
                                className={`text-[11px] ${darkMode ? "text-blue-300" : "text-blue-600"
                                    } mb-1 leading-snug`}
                            >
                                • {tip}
                            </p>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
