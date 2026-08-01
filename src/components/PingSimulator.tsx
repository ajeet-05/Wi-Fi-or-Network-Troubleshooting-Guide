import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Terminal, Activity } from 'lucide-react';

type PingResult = {
  seq: number;
  time: number | null;
  status: 'reply' | 'timeout';
};

export function PingSimulator() {
  const [results, setResults] = useState<PingResult[]>([]);
  const [running, setRunning] = useState(false);
  const [avg, setAvg] = useState<number | null>(null);
  const [sent, setSent] = useState(0);
  const [received, setReceived] = useState(0);
  const timer = useRef<number | null>(null);
  const seq = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [results]);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setRunning(false);
  };

  const reset = () => {
    stop();
    setResults([]);
    setAvg(null);
    setSent(0);
    setReceived(0);
    seq.current = 0;
  };

  const runPing = () => {
    if (running) { stop(); return; }
    setRunning(true);
    setResults([]);
    setSent(0);
    setReceived(0);
    seq.current = 0;
    setAvg(null);

    timer.current = window.setInterval(() => {
      const loss = Math.random() < 0.08;
      const time = loss ? null : Math.round((12 + Math.random() * 38) * 10) / 10;
      const r: PingResult = { seq: seq.current++, time, status: loss ? 'timeout' : 'reply' };
      setResults((p) => [...p, r]);
      setSent((s) => s + 1);
      if (!loss) setReceived((r2) => {
        const newRecv = r2 + 1;
        setAvg((a) => {
          const total = a === null ? (time as number) : (a * r2 + (time as number)) / newRecv;
          return Math.round(total * 10) / 10;
        });
        return newRecv;
      });
    }, 900);
  };

  const lossPct = sent ? Math.round(((sent - received) / sent) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-800/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 flex items-center gap-2 text-sm text-slate-400">
          <Terminal size={14} /> ping — network diagnostic
        </span>
      </div>

      <div ref={logRef} className="h-64 overflow-y-auto px-4 py-4 font-mono text-sm space-y-1 bg-slate-950/40">
        {results.length === 0 && !running && (
          <p className="text-slate-500">$ Press "Run Ping Test" to start sending packets to 8.8.8.8</p>
        )}
        {results.map((r) => (
          <div key={r.seq} className={r.status === 'timeout' ? 'text-red-400' : 'text-emerald-400'}>
            {r.status === 'timeout'
              ? `Request timed out. (seq ${r.seq})`
              : `Reply from 8.8.8.8: bytes=32 time=${r.time}ms TTL=117`}
          </div>
        ))}
        {running && <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400" />}
      </div>

      <div className="grid grid-cols-3 gap-px bg-slate-700/60 border-t border-slate-700/60">
        <Stat label="Sent" value={sent} />
        <Stat label="Received" value={received} />
        <Stat label="Loss" value={`${lossPct}%`} warn={lossPct > 0} />
      </div>
      {avg !== null && (
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 border-t border-slate-700/60 bg-slate-800/40">
          <Activity size={15} className="text-sky-400" />
          Average round-trip: <span className="font-semibold text-white">{avg} ms</span>
        </div>
      )}

      <div className="flex gap-3 p-4 border-t border-slate-700/60 bg-slate-800/40">
        <button
          onClick={runPing}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          {running ? <><RotateCcw size={15} /> Stop</> : <><Play size={15} /> Run Ping Test</>}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700/50"
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: string | number; warn?: boolean }) {
  return (
    <div className="bg-slate-800/60 px-4 py-3 text-center">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`text-lg font-semibold ${warn ? 'text-amber-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}
