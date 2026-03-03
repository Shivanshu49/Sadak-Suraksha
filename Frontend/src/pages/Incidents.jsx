import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";

const sevBadge = {
  High: "bg-red-600",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-green-600",
};

const statusBadge = {
  reported: "bg-blue-600",
  responding: "bg-orange-500",
  resolved: "bg-green-600",
};

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getIncidents(page, severity)
      .then((res) => {
        if (!ignore) {
          setIncidents(res.data.incidents || []);
          setTotalPages(res.data.pages || 1);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [page, severity]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-xl font-bold flex-1">All Incidents</h2>
        <select
          value={severity}
          onChange={(e) => {
            setSeverity(e.target.value);
            setPage(1);
          }}
          className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">All severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-400 animate-pulse">Loading…</p>
      ) : incidents.length === 0 ? (
        <p className="text-slate-400">No incidents found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm bg-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-700/60 text-slate-300">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Nearest Hospital</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reported By</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc, idx) => (
                <tr
                  key={inc._id}
                  className="border-b border-slate-700/40 hover:bg-slate-700/30"
                >
                  <td className="px-4 py-2 text-slate-400">
                    {(page - 1) * 20 + idx + 1}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(inc.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`${sevBadge[inc.severity] || "bg-slate-600"} px-2 py-0.5 rounded text-xs font-bold`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {inc.confidence != null
                      ? (inc.confidence * 100).toFixed(0) + "%"
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`https://www.google.com/maps?q=${inc.location?.lat},${inc.location?.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 underline"
                    >
                      {inc.location?.lat?.toFixed(4)},{" "}
                      {inc.location?.lng?.toFixed(4)}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {inc.nearestHospital?.name ? (
                      <span>
                        {inc.nearestHospital.name}{" "}
                        <span className="text-xs text-slate-400">
                          ({inc.nearestHospital.distance_km} km)
                        </span>
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`${statusBadge[inc.status] || "bg-slate-600"} px-2 py-0.5 rounded text-xs font-bold capitalize`}
                    >
                      {inc.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-300">
                    {inc.reported_by || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-700 disabled:opacity-40 hover:bg-slate-600 text-sm"
        >
          ← Prev
        </button>
        <span className="text-sm text-slate-400">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-700 disabled:opacity-40 hover:bg-slate-600 text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
