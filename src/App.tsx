import { useState } from 'react';
import {
  Wifi,
  WifiOff,
  Gauge,
  Unplug,
  ServerCrash,
  Terminal,
  HelpCircle,
  Search,
  Network,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { commonIssues, commands, faqs } from '@/data/guide';
import { CopyButton, Accordion } from '@/components/ui';
import { PingSimulator } from '@/components/PingSimulator';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  WifiOff, Gauge, Unplug, ServerCrash,
};

function App() {
  const [activeIssue, setActiveIssue] = useState<string>(commonIssues[0].id);
  const [faqQuery, setFaqQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(faqQuery.toLowerCase()) || f.a.toLowerCase().includes(faqQuery.toLowerCase())
  );
  const issue = commonIssues.find((i) => i.id === activeIssue)!;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 shadow-lg shadow-sky-500/20">
              <Wifi size={18} className="text-slate-950" />
            </div>
            <span className="font-semibold tracking-tight">NetFix Guide</span>
          </a>
          <div className="hidden gap-6 text-sm text-slate-400 md:flex">
            <a href="#issues" className="transition hover:text-white">Issues</a>
            <a href="#steps" className="transition hover:text-white">Troubleshoot</a>
            <a href="#commands" className="transition hover:text-white">Commands</a>
            <a href="#ping" className="transition hover:text-white">Ping</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(56,189,248,0.18),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300">
            <Activity size={13} /> Step-by-step network diagnostics
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Fix your <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Wi-Fi & network</span> in minutes
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 md:text-lg">
            A clear, practical guide to the most common internet problems — with copy-ready commands, a live ping demo, and answers to the questions everyone asks.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#issues" className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
              Start troubleshooting <ArrowRight size={16} />
            </a>
            <a href="#commands" className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800/60">
              <span className="flex items-center gap-2"><Terminal size={16} /> Quick commands</span>
            </a>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 text-center">
            {[['4', 'Common issues'], ['8', 'Copy-ready commands'], ['7', 'FAQ answers']].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-5">
                <div className="text-2xl font-bold text-white md:text-3xl">{n}</div>
                <div className="mt-1 text-xs text-slate-400 md:text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Common Issues */}
      <section id="issues" className="mx-auto max-w-6xl px-5 py-16">
        <SectionTitle eyebrow="Diagnose" title="Common internet issues" subtitle="Pick the problem that matches what you're seeing." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {commonIssues.map((it) => {
            const Icon = iconMap[it.icon] ?? WifiOff;
            const active = it.id === activeIssue;
            return (
              <button
                key={it.id}
                onClick={() => setActiveIssue(it.id)}
                className={`group rounded-2xl border p-5 text-left transition ${
                  active
                    ? 'border-sky-500/60 bg-sky-500/10 shadow-lg shadow-sky-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition ${
                  active ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                }`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-white">{it.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{it.symptom}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Troubleshooting steps */}
      <section id="steps" className="border-y border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle
            eyebrow="Fix it"
            title={`Step-by-step: ${issue.title}`}
            subtitle="Work through these in order. Most issues resolve within the first few steps."
          />
          <div className="mx-auto max-w-3xl">
            <ol className="relative space-y-4 border-l border-slate-700 pl-8">
              {issue.steps.map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[2.6rem] flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-slate-950">
                    {i + 1}
                  </span>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4 text-slate-200 transition hover:border-slate-700">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Commands */}
      <section id="commands" className="mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Terminal"
          title="Copy-ready commands"
          subtitle="Run these in your command prompt or terminal. Tap Copy, then paste."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {commands.map((c) => (
            <div key={c.command} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Terminal size={15} className="text-sky-400" /> {c.label}
                </div>
                <CopyButton text={c.command} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950/70 px-4 py-3 font-mono text-sm text-emerald-400">
                {c.command}
              </pre>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ping explanation + simulator */}
      <section id="ping" className="border-y border-slate-800/80 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle eyebrow="Understand" title="What is ping?" subtitle="Ping tells you if a server is reachable and how fast it responds." />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="mb-3 flex items-center gap-2 text-sky-400">
                  <Zap size={18} /> <span className="font-semibold text-white">How it works</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your computer sends a small packet of data to a target server (like Google's <code className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400">8.8.8.8</code>) and waits for a reply. The time it takes to come back is the <strong className="text-white">latency</strong>, measured in milliseconds.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['< 30 ms', 'Excellent', 'text-emerald-400'],
                  ['30–80 ms', 'Good', 'text-sky-400'],
                  ['> 150 ms', 'Laggy', 'text-amber-400'],
                ].map(([v, l, c]) => (
                  <div key={l} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                    <div className={`text-lg font-bold ${c}`}>{v}</div>
                    <div className="mt-1 text-xs text-slate-400">{l}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="mb-3 flex items-center gap-2 text-sky-400">
                  <Network size={18} /> <span className="font-semibold text-white">Reading the results</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• <strong className="text-white">Time</strong> — lower is better. High or erratic values mean congestion.</li>
                  <li>• <strong className="text-white">Packet loss</strong> — any loss above 0% suggests a unstable link.</li>
                  <li>• <strong className="text-white">TTL</strong> — time-to-live; drops mean the route is long or filtered.</li>
                </ul>
              </div>
            </div>
            <PingSimulator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <SectionTitle eyebrow="Answers" title="Frequently asked questions" subtitle="The questions we hear most about home networking." />
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-10 text-center text-slate-400">
            <HelpCircle size={28} className="mx-auto mb-3 text-slate-600" />
            No questions match "{faqQuery}".
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((f) => (
              <Accordion key={f.q} title={f.q}>
                {f.a}
              </Accordion>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500">
              <Wifi size={14} className="text-slate-950" />
            </div>
            <span className="font-semibold">NetFix Guide</span>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            A practical reference for everyday network problems. Always restart your router first — it fixes more than half of all issues.
          </p>
          <p className="text-xs text-slate-600">Built for learners and tinkerers.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-10 text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">{eyebrow}</div>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 md:text-base">{subtitle}</p>
    </div>
  );
}

export default App;
