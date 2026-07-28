"use client";
import * as React from 'react';
import { Card } from '../components/Card';
import { Compass } from 'lucide-react';

export interface LocationCardProps {
  title: string;
  subtitle?: string;
  coordinates: [number, number];
  onClick?: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ title, subtitle, coordinates, onClick }) => {
  return (
    <Card 
      className={`p-3 flex items-center gap-3 ${onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`}
      onClick={onClick}
    >
      <div className="bg-secondary p-2 rounded-md shrink-0">
        <Compass className="h-5 w-5 text-secondary-foreground" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium truncate">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>
      <div className="text-[10px] text-muted-foreground shrink-0 text-right">
        {coordinates[1].toFixed(4)}<br/>{coordinates[0].toFixed(4)}
      </div>
    </Card>
  );
};
