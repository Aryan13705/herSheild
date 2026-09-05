"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent } from "@hershield/ui";
import { Square, Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseConfigError, isDemoMode } from "../../../lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError(isDemoMode ? "Demo mode is active. Use the demo dashboard flow." : (firebaseConfigError || "Authentication is not configured."));
      return;
    }
    if (!email || !password || !name || !phone) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (firebaseError.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(firebaseError.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-bg)] flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] bg-[var(--color-surface-card)] border-[var(--color-border-subtle)] border pt-8 pb-6 px-4 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-elevated)] text-[var(--color-brand-primary)] mb-6 shadow-sm">
            <Square className="h-6 w-6 stroke-[2.5]" />
          </div>
          
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 leading-tight tracking-tight">
            Create your account
          </h1>
          
          <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed max-w-[280px]">
            Join HerShield and start traveling with peace of mind.
          </p>
        </div>

        <CardContent className="space-y-4 px-2 pb-2">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full h-12 bg-transparent border border-[var(--color-border-medium)] rounded-lg px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number (for alerts)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full h-12 bg-transparent border border-[var(--color-border-medium)] rounded-lg px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
              <input 
                type="email" 
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-12 bg-transparent border border-[var(--color-border-medium)] rounded-lg px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-all"
                required
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-12 bg-transparent border border-[var(--color-border-medium)] rounded-lg px-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-all"
                required
                minLength={6}
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-base transition-colors"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--color-brand-primary)] hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
