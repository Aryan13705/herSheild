import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@ui/components/Card";
import { Badge } from "@ui/components/Badge";

// Mocking the trpc client for the scaffolding
// import { trpc } from "@her-shield/trpc";

export const MissionControl = () => {
  // Mock TRPC query 
  // const { data: missionData, isLoading } = trpc.intelligence.getMissionControlDashboard.useQuery();
  
  const isLoading = false;
  const missionData = {
    dynamicSafetyScore: 90,
    recentRecommendations: [
      { message: "Take an umbrella, rain expected soon.", type: "WEATHER" }
    ]
  };

  if (isLoading) return <div>Loading Mission Control...</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Mission Control Intelligence</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center bg-emerald-50 border-emerald-200">
          <span className="text-sm text-emerald-800 font-semibold uppercase tracking-wider">
            Live Safety Score
          </span>
          <span className="text-6xl font-black text-emerald-600 mt-2">
            {missionData?.dynamicSafetyScore ?? "--"}
          </span>
          <Badge variant="success" className="mt-2">Safe Zone</Badge>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">AI Insights</h3>
          {missionData?.recentRecommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-blue-900 text-sm">
              <span className="font-bold">{rec.type}:</span>
              <span>{rec.message}</span>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Stubs for other engines */}
        <Card className="p-4">
          <h4 className="font-semibold">Safe Route Intelligence</h4>
          <p className="text-sm text-muted-foreground mt-1">Analyzing well-lit paths and verified safe zones.</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Transport Intelligence</h4>
          <p className="text-sm text-muted-foreground mt-1">Comparing Metro vs Cab safety for next leg.</p>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold">Local Intelligence</h4>
          <p className="text-sm text-muted-foreground mt-1">Found 3 safe cafes nearby.</p>
        </Card>
      </div>
    </div>
  );
};
