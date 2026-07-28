"use client";
import * as React from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { Card } from '../components/Card';

export interface SearchResult {
  id: string;
  place_name: string;
  center?: [number, number];
  type?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (result: SearchResult) => void;
  results?: SearchResult[];
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSelect,
  results = [],
  placeholder = "Search destination...",
  isLoading = false
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-background overflow-hidden border">
        <div className="grid place-items-center h-full w-12 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-foreground bg-transparent pr-2"
          type="text"
          id="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        /> 
      </div>
      
      {results.length > 0 && (
        <Card className="absolute top-14 w-full bg-background shadow-xl rounded-md z-50 overflow-hidden flex flex-col">
          {results.map((result) => (
            <button
              key={result.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted text-left border-b last:border-0"
              onClick={() => onSelect(result)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm truncate">{result.place_name}</span>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
};
