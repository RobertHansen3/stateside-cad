import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [calls, setCalls] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch("/api/calls")
      .then((r) => r.json())
      .then(setCalls);
    fetch("/api/units")
      .then((r) => r.json())
      .then(setUnits);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stateside CAD</h1>
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <h2>Units</h2>
          <div className="space-y-2 mt-2">
            {units.map((u) => (
              <div key={u.id} className="p-3 bg-slate-800 rounded">
                <div className="text-sm font-medium">
                  {u.id} • {u.job}
                </div>
                <div className="text-xs text-slate-400">Status: {u.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
