import { useEffect, useState } from "react";
import CallsList from "./components/CallsList";
import UnitsList from "./components/UnitsList";
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [calls, setCalls] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/calls`)
      .then((r) => r.json())
      .then(setCalls);
    fetch(`${API_URL}/api/units`)
      .then((r) => r.json())
      .then(setUnits);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stateside CAD</h1>
      <div className="grid grid-cols-2 gap-4">
        <CallsList calls={calls} />
        <UnitsList units={units} />
      </div>
    </div>
  );
}
