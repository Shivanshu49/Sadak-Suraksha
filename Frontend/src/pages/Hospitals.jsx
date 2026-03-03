import { useEffect, useState } from "react";
import { getHospitals } from "../services/api";

const typeBadge = {
  government: "bg-blue-600",
  private: "bg-purple-600",
  clinic: "bg-teal-600",
};

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHospitals()
      .then((res) => setHospitals(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-slate-400 animate-pulse text-center mt-10">
        Loading hospitals…
      </p>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Hospitals ({hospitals.length})</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((h) => (
          <div
            key={h._id}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-slate-500 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white">{h.name}</h3>
              <span
                className={`${typeBadge[h.type] || "bg-slate-600"} px-2 py-0.5 rounded text-xs font-bold capitalize`}
              >
                {h.type}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">{h.address}</p>
            <p className="text-sm">
              📞{" "}
              <a
                href={`tel:${h.contact}`}
                className="text-cyan-400 underline"
              >
                {h.contact}
              </a>
            </p>
            <a
              href={`https://www.google.com/maps?q=${h.location?.lat},${h.location?.lng}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 underline mt-2 inline-block"
            >
              View on Map →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
