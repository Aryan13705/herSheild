"use client";

import * as React from "react";
import Link from "next/link";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@hershield/ui";
import { Menu, X, Shield, MapPin, Info } from "lucide-react";

function SmartPopup({ title, description, icon: Icon, children, trigger }: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; trigger: React.ReactElement; }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[340px] h-[700px] max-h-[85vh] p-0 overflow-hidden rounded-[2.5rem] border-8 border-[var(--color-surface-elevated)] shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--color-surface-elevated)] rounded-b-3xl z-10"></div>
        <div className="h-full w-full bg-[var(--color-surface-card)] flex flex-col pt-12 overflow-y-auto custom-scrollbar">
          <DialogHeader className="px-6 pb-4">
            <DialogTitle className="flex flex-col items-center gap-3 text-center">
              <div className="p-4 rounded-full bg-[var(--color-surface-bg)] text-[var(--color-brand-primary)] shadow-inner">
                <Icon className="w-8 h-8" />
              </div>
              <span className="text-xl">{title}</span>
            </DialogTitle>
            <DialogDescription className="pt-2 text-center">{description}</DialogDescription>
          </DialogHeader>
          <div className="px-6 py-4 flex-1 text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-surface-bg)]/30 rounded-t-3xl border-t border-[var(--color-border-subtle)]">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-bg)] text-[var(--color-text-primary)] relative">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--color-surface-bg)]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden p-2 -ml-2 text-[var(--color-text-secondary)] hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center">
                <span className="text-white text-sm">H</span>
              </div>
              HerShield
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <SmartPopup 
              title="Smart Features" 
              description="Explore the tools keeping you safe." 
              icon={MapPin}
              trigger={<button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">Features</button>}
            >
              <ul className="space-y-3 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Real-time Location Sharing:</strong> Let your trusted circle know where you are at all times.</li>
                <li><strong className="text-[var(--color-text-primary)]">Offline Maps:</strong> Never get lost, even when you lose cell service.</li>
                <li><strong className="text-[var(--color-text-primary)]">Smart AI Chat:</strong> Get instant local safety advice from our specialized AI.</li>
              </ul>
            </SmartPopup>
            
            <SmartPopup 
              title="Safety First" 
              description="Your personal digital guardian." 
              icon={Shield}
              trigger={<button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">Safety</button>}
            >
              <ul className="space-y-3 list-disc pl-5">
                <li><strong className="text-[var(--color-text-primary)]">Discreet SOS:</strong> Trigger an emergency alert silently.</li>
                <li><strong className="text-[var(--color-text-primary)]">Safe Zone Geofencing:</strong> Automatic alerts if you deviate too far from a planned safe route.</li>
                <li><strong className="text-[var(--color-text-primary)]">Audio Recording:</strong> Instantly capture audio evidence during an emergency.</li>
              </ul>
            </SmartPopup>

            <SmartPopup 
              title="About HerShield" 
              description="Our mission to empower travelers." 
              icon={Info}
              trigger={<button className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer">About</button>}
            >
              <p>HerShield was built with a simple goal: to ensure no one feels vulnerable while traveling. We believe that technology should serve as an invisible guardian, giving you the confidence to explore the world.</p>
            </SmartPopup>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-[70] w-64 bg-[var(--color-surface-card)] border-r border-[var(--color-border-subtle)] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[var(--color-border-subtle)]">
          <span className="font-bold text-lg text-white">Menu</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          <SmartPopup 
            title="Smart Features" 
            description="Explore the tools keeping you safe." 
            icon={MapPin}
            trigger={<button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium cursor-pointer">Features</button>}
          >
            <ul className="space-y-3 list-disc pl-5 text-sm">
              <li><strong className="text-[var(--color-text-primary)]">Real-time Location Sharing</strong></li>
              <li><strong className="text-[var(--color-text-primary)]">Offline Maps</strong></li>
              <li><strong className="text-[var(--color-text-primary)]">Smart AI Chat</strong></li>
            </ul>
          </SmartPopup>
          
          <SmartPopup 
            title="Safety First" 
            description="Your personal digital guardian." 
            icon={Shield}
            trigger={<button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium cursor-pointer">Safety</button>}
          >
            <ul className="space-y-3 list-disc pl-5 text-sm">
              <li><strong className="text-[var(--color-text-primary)]">Discreet SOS</strong></li>
              <li><strong className="text-[var(--color-text-primary)]">Safe Zone Geofencing</strong></li>
              <li><strong className="text-[var(--color-text-primary)]">Audio Recording</strong></li>
            </ul>
          </SmartPopup>

          <SmartPopup 
            title="About HerShield" 
            description="Our mission to empower travelers." 
            icon={Info}
            trigger={<button onClick={() => setIsMobileMenuOpen(false)} className="text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium cursor-pointer">About</button>}
          >
            <p className="text-sm">HerShield was built with a simple goal: to ensure no one feels vulnerable while traveling. We believe that technology should serve as an invisible guardian, giving you the confidence to explore the world.</p>
          </SmartPopup>
          <hr className="border-[var(--color-border-subtle)] my-2" />
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--color-text-secondary)] hover:text-white transition-colors font-medium">Log in</Link>
        </nav>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-[var(--color-text-tertiary)]">
          &copy; {new Date().getFullYear()} HerShield. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
