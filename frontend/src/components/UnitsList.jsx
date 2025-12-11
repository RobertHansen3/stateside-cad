export default function UnitsList({ units }) {
  return (
    <div>
      <h2 className="font-semibold">Units</h2>
      <div className="space-y-2 mt-2">
        {units.map((u) => (
          <div key={u.id} className="p-3 bg-slate-800 rounded">
            <div className="text-sm font-medium">
              {u.id} • {u.job}
            </div>
            <div className="text-xs text-slate-400">Status: {u.status}</div>
            {u.coords && (
              <div className="text-xs text-slate-500">
                Loc: {Math.round(u.coords.x)}, {Math.round(u.coords.y)}
              </div>
            )}
          </div>
        ))}
        {units.length === 0 && (
          <div className="text-slate-400 text-sm">No units connected</div>
        )}
      </div>
    </div>
  );
}
