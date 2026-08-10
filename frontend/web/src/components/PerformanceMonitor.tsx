'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    // In production, this would send to an analytics service
    if (metric.name === 'LCP' && metric.value > 2500) {
      console.warn('⚠️ LCP is too high:', metric.value, 'ms');
    }
    if (metric.name === 'INP' && metric.value > 200) {
      console.warn('⚠️ INP is too high:', metric.value, 'ms');
    }
    if (metric.name === 'CLS' && metric.value > 0.1) {
      console.warn('⚠️ CLS is too high:', metric.value);
    }
    
    // Detailed logging for performance audits
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[Web Vitals] ${metric.name}:`, Math.round(metric.value));
    }
  });

  return null;
}
