"use client";

import React from 'react';
import type { Answer, Question } from '@/lib/mbti';
import clsx from 'clsx';

const SCALE: { value: Answer; label: string }[] = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
];

export function QuestionCard({
  index,
  total,
  question,
  value,
  onChange,
}: {
  index: number;
  total: number;
  question: Question;
  value?: Answer;
  onChange: (v: Answer) => void;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="badge bg-gray-100 text-gray-700">Question {index + 1} of {total}</span>
        <span className="subtitle">{question.dichotomy}</span>
      </div>
      <p className="text-lg font-medium mb-4">{question.text}</p>
      <div className="grid grid-cols-5 gap-2">
        {SCALE.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-label={opt.label}
            className={clsx(
              'btn py-3',
              value === opt.value ? 'btn-primary' : 'btn-secondary'
            )}
            onClick={() => onChange(opt.value)}
          >
            {opt.value}
          </button>
        ))}
      </div>
      <div className="mt-2 text-center subtitle">
        {value ? SCALE.find(s => s.value === value)?.label : 'Select a response'}
      </div>
    </div>
  );
}
