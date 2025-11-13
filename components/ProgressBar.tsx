"use client";

import React from 'react';

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.max(0, Math.round((current / total) * 100)));
  return (
    <div className="progress" aria-label="progress">
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}
