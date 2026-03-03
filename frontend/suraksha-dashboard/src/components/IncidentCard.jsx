export default function IncidentCard({ incident }) {
  const isHigh = incident.severity === "High";
  const badgeColor = isHigh ? "bg-red-500/20 text-red-400 border-red-500/50" :
    incident.severity === "Medium" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" :
      "bg-green-500/20 text-green-400 border-green-500/50";

  return (
    <div className="glass p-4 rounded-xl border border-slate-700/50 hover:border-slate-500 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${badgeColor}`}>
          {incident.severity} Severity
        </span>
        <span className="text-xs text-slate-500 font-mono">
          {new Date(incident.timestamp).toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex justify-between">
          <span className="text-slate-500">Location</span>
          <span className="font-mono">{incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Hospital</span>
          <span className="text-cyan-400 font-medium text-right max-w-[200px] truncate">
            {incident.nearestHospital?.name || "Evaluating..."}
            <br className="sm:hidden" />
            <span className="text-xs text-cyan-600 ml-1">
              {incident.nearestHospital && `(${incident.nearestHospital.distance_km}km)`}
            </span>
          </span>
        </div>
        <div className="flex justify-between border-t border-slate-700/50 pt-2 mt-2">
          <span className="text-slate-500">AI Confidence</span>
          <span className="font-mono text-indigo-400 font-semibold">{incident.confidence}%</span>
        </div>
      </div>
    </div>
  );
}
