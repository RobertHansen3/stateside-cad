import { useEffect, useState } from "react";

export default function CallsList() {
  const [calls, setCalls] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/calls`)
      .then((res) => res.json())
      .then(setCalls)
      .catch((err) => console.error("Error fetching calls:", err));
  }, [API_URL]);

  return (
    <div>
      <h2 className="font-semibold">Active Calls</h2>
      <div className="space-y-2 mt-2">
        {calls.map((c) => (
          <div key={c.id} className="p-3 bg-slate-800 rounded">
            <div className="text-sm font-medium">
              {c.caller} ({c.phone})
            </div>
            <div className="text-xs text-slate-400">{c.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
