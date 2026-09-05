"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Button } from "@hershield/ui";

const TABS = ["Overview", "Destinations", "Itinerary", "Budget", "Notes", "Documents", "Settings"] as const;
type Tab = typeof TABS[number];

export default function TripDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState<Tab>("Overview");

  // In a real app we'd fetch trpc.trips.getById(params.id)
  const tripId = Array.isArray(id) ? id[0] : id;
  
  return (
    <div className="w-full flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="pt-4 pb-2 px-4 shrink-0">
        <h1 className="text-2xl font-bold">Solo Paris Getaway</h1>
        <p className="text-xs text-[var(--color-text-secondary)]">Trip ID: {tripId || "unknown"}</p>
        <p className="text-sm text-[var(--color-text-secondary)]">Aug 10 - Aug 20, 2026</p>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto hide-scrollbar border-b border-[var(--color-surface-card-hover)] shrink-0">
        <div className="flex px-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? "text-[var(--color-brand-primary)] border-b-2 border-[var(--color-brand-primary)]" 
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {activeTab === "Overview" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-[var(--color-surface-card-hover)] bg-[var(--color-surface-bg)]">
              <h3 className="font-semibold mb-2">Trip Status</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Planning phase. You have 25 days until departure.</p>
            </div>
            {/* Add more overview widgets here */}
          </div>
        )}

        {activeTab === "Destinations" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Route</h3>
            <div className="p-4 rounded-xl border border-[var(--color-surface-card-hover)] bg-[var(--color-surface-bg)] flex justify-between items-center">
              <div>
                <h4 className="font-medium">Paris, France</h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Aug 10 - Aug 20</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <Button variant="outline" className="w-full border-dashed">
              + Add Destination
            </Button>
          </div>
        )}

        {activeTab === "Itinerary" && (
          <div className="text-center text-[var(--color-text-secondary)] py-12">
            Itinerary day planner goes here.
          </div>
        )}

        {activeTab === "Budget" && (
          <div className="text-center text-[var(--color-text-secondary)] py-12">
            Budget tracking UI will be mounted here.
          </div>
        )}

        {activeTab === "Documents" && (
          <div className="text-center text-[var(--color-text-secondary)] py-12">
            Secure document vault (Passport, Visas, Tickets) ready for upload integration.
          </div>
        )}

        {(activeTab === "Notes" || activeTab === "Settings") && (
          <div className="text-center text-[var(--color-text-secondary)] py-12">
            {activeTab} feature coming soon.
          </div>
        )}
      </div>
    </div>
  );
}
