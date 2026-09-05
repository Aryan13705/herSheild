"use client";
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// Mock react-map-gl to prevent actual Mapbox GL JS from attempting to initialize without WebGL
vi.mock('react-map-gl/mapbox', () => {
  return {
    default: ({ children }: { children?: React.ReactNode }) => <div data-testid="mock-map">{children}</div>,
  };
});

import { MapView } from './MapView';

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
