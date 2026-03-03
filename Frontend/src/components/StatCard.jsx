export default function StatCard({ title, value, color = "cyan", icon }) {
  const colorMap = {
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
  };

  return (
    <div className={`p-4 rounded-2xl border ${colorMap[color]} shadow-lg flex items-center gap-4 card-glow`}>
      <div className="text-2xl opacity-80">
        {icon}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}
