"use client";
import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MapView } from './MapView';

// Mock react-map-gl to prevent actual Mapbox GL JS from attempting to initialize without WebGL
vi.mock('react-map-gl', () => {
  return {
    default: ({ children }: any) => <div data-testid="mock-map">{children}</div>,
    Marker: ({ children }: any) => <div data-testid="mock-marker">{children}</div>,
    Source: ({ children }: any) => <div data-testid="mock-source">{children}</div>,
    Layer: () => <div data-testid="mock-layer" />,
    NavigationControl: () => <div data-testid="mock-nav-control" />,
    FullscreenControl: () => <div data-testid="mock-fullscreen-control" />,
    ScaleControl: () => <div data-testid="mock-scale-control" />,
    GeolocateControl: () => <div data-testid="mock-geolocate-control" />,
  };
});

describe('MapView', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<MapView />);
    expect(getByTestId('mock-map')).toBeDefined();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <MapView>
        <div>Test Child Marker</div>
      </MapView>
    );
    expect(getByText('Test Child Marker')).toBeDefined();
  });
});
