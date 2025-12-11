export default function CallsList({ calls }) {
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
            <div className="text-xs text-slate-500">
              Priority: {c.priority} • State: {c.state}
            </div>
          </div>
        ))}
        {calls.length === 0 && (
          <div className="text-slate-400 text-sm">No active calls</div>
        )}
      </div>
    </div>
  );
}
