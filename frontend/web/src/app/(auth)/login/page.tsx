"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, googleProvider, auth } from "../../../lib/auth-client";
import { AIOrb } from "@hershield/ui";

function AICompanionWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { from: "ai", text: "Guardian AI online. How can I assist your mission?" },
  ]);
  const [input, setInput] = React.useState("");

  const mockReplies = [
    "I'll secure your route.",
    "Monitoring local frequencies. All clear.",
    "Guardian mode activated.",
  ];
  let replyIdx = 0;

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const aiMsg = { from: "ai", text: mockReplies[replyIdx % mockReplies.length] };
    replyIdx++;
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, aiMsg]), 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 transition-transform hover:scale-110 active:scale-95"
      >
        <AIOrb state={open ? "listening" : "safe"} size="md" />
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-3xl"
          style={{ background: "var(--color-surface-glass)", border: "1px solid var(--color-border-medium)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)]">
            <AIOrb state="safe" size="sm" />
            <div>
              <p className="text-sm font-bold text-white">Guardian AI</p>
              <p className="text-[10px] flex items-center gap-1 text-[var(--color-brand-tertiary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-tertiary)] animate-pulse" />
                Active
              </p>
            </div>
          </div>
          <div className="h-52 overflow-y-auto p-3 space-y-2 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={
                    msg.from === "user"
                      ? { background: "var(--color-brand-primary)", color: "white" }
                      : { background: "var(--color-surface-bg)", color: "white", border: "1px solid var(--color-border-subtle)" }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-bg)]">
            <input
              className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[var(--color-text-secondary)] outline-none"
              placeholder="Command or query..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Authorization required."); return; }
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Authorization failed.");
    } finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true); setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Google Login error:", err);
      setError("Authorization failed.");
    } finally { setGoogleLoading(false); }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--color-surface-bg)]">
      
      {/* ── Deep Space HUD Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--color-surface-bg)]" />
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Dynamic Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-30 rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-20 w-full max-w-sm mx-4">
        {/* Boot Sequence / Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <AIOrb state="safe" size="lg" className="mb-6" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[var(--color-brand-tertiary)]">
            HerShield OS v1.0
          </p>
          <h1 className="text-3xl font-light text-white tracking-widest uppercase">
            Mission <span className="font-bold text-[var(--color-brand-primary)]">Control</span>
          </h1>
        </div>

        {/* HUD Glass Panel */}
        <div
          className="rounded-[2rem] p-6 space-y-4 relative overflow-hidden backdrop-blur-3xl"
          style={{
            background: "var(--color-surface-glass)",
            border: "1px solid var(--color-border-medium)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.8), inset 0 0 32px rgba(0,240,255,0.05)",
          }}
        >
          {error && (
            <div className="p-3 rounded-xl text-xs text-center border border-[var(--color-safety-danger)] bg-[var(--color-safety-danger-bg)] text-[var(--color-safety-danger)] tracking-wide">
              [ ERROR: {error} ]
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border-medium)] text-white"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-[var(--color-brand-tertiary)] border-t-transparent rounded-full animate-spin" />
            ) : "Initialize with Google"}
          </button>

          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">Or manual override</span>
            <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="OPERATIVE ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-2xl px-4 text-xs tracking-wider text-white placeholder:text-[var(--color-text-secondary)] outline-none transition-all bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)] focus:border-[var(--color-brand-tertiary)]"
              required
            />
            <input
              type="password"
              placeholder="ACCESS CODE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-2xl px-4 text-xs tracking-wider text-white placeholder:text-[var(--color-text-secondary)] outline-none transition-all bg-[var(--color-surface-bg)] border border-[var(--color-border-subtle)] focus:border-[var(--color-brand-tertiary)]"
              required
            />
            <button
               type="submit"
               disabled={loading || googleLoading}
               className="w-full h-12 rounded-2xl font-bold text-xs uppercase tracking-widest text-white transition-all hover:scale-[1.02] active:scale-[0.98] border border-[var(--color-brand-tertiary)]"
               style={{
                 background: "linear-gradient(90deg, rgba(157,78,221,0.5), rgba(0,240,255,0.3))",
                 boxShadow: "0 0 24px rgba(0,240,255,0.2)",
               }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : "Engage System"}
            </button>
          </form>

          <div className="flex items-center justify-between pt-2">
            <Link href="/signup" className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-tertiary)] hover:text-white transition-colors">
              Request Access
            </Link>
            <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-white transition-colors">
              Reset Code
            </Link>
          </div>
        </div>
      </div>

      <AICompanionWidget />
    </div>
  );
}
