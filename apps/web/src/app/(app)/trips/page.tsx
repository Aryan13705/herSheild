"use client";

import * as React from "react";
import { trpc } from "../../../lib/trpc";
import { Card, CardContent, Button } from "@hershield/ui";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function TripsPage() {
  const { data: trips, isLoading } = trpc.trips.list.useQuery();

  if (isLoading) {
    return <div className="p-8 text-center text-[var(--color-text-secondary)]">Loading trips...</div>;
  }

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center py-4 mb-4">
        <h1 className="text-2xl font-bold">Your Trips</h1>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Plan Trip
        </Button>
      </div>

      <div className="grid gap-4">
        {trips?.map((trip) => (
          <Card key={trip.id} className="hover:border-[var(--color-brand-primary)] transition-colors cursor-pointer" asChild>
            <Link href={`/trips/${trip.id}`} className="block">
              <CardContent className="p-0">
                <div className="h-32 bg-zinc-800 rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-xl">{trip.title}</h4>
                    <p className="text-sm opacity-90">{trip.primaryDestination}</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center text-sm text-[var(--color-text-secondary)]">
                  <span>{trip.startDate} - {trip.endDate}</span>
                  <span className="capitalize px-2 py-1 bg-[var(--color-surface-bg)] rounded-md">{trip.status.toLowerCase()}</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
