"use client";
import * as React from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export interface PlaceCardProps {
  name: string;
  category?: string;
  distance?: string;
  onNavigate?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  name,
  category,
  distance,
  onNavigate,
  onSave,
  isSaved = false
}) => {
  return (
    <Card className="p-4 flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-full shrink-0">
        <MapPin className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{name}</h4>
        {category && <p className="text-sm text-muted-foreground">{category}</p>}
        {distance && <p className="text-xs font-medium text-muted-foreground mt-1">{distance} away</p>}
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        {onNavigate && (
          <Button size="sm" onClick={onNavigate}>
            <Navigation className="h-4 w-4 mr-2" />
            Go
          </Button>
        )}
        {onSave && (
          <Button size="sm" variant={isSaved ? "secondary" : "outline"} onClick={onSave}>
            <Star className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
        )}
      </div>
    </Card>
  );
};
