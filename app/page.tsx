"use client";

import React from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { QUESTIONS } from '@/data/questions';
import { TYPE_SUMMARIES } from '@/data/types';
import type { Answer } from '@/lib/mbti';
import { scoreAnswers, toPercentages, toType } from '@/lib/mbti';

export default function Page() {
  const [step, setStep] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({});
  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const isDone = step >= total;

  const handleAnswer = (value: Answer) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const next = () => {
    if (!current) return;
    if (!answers[current.id]) return;
    if (step + 1 < total) setStep(step + 1);
    else setStep(total);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
  };

  const onJump = (idx: number) => setStep(idx);

  let resultView: React.ReactNode = null;
  if (isDone) {
    const scores = scoreAnswers(QUESTIONS, answers);
    const type = toType(scores);
    const percentages = toPercentages(scores);
    const summary = TYPE_SUMMARIES[type];

    const shareText = `My MBTI type is ${type} ? ${summary.title}. Try the quiz:`;
    const shareUrl = 'https://agentic-054063d4.vercel.app';

    resultView = (
      <div className="space-y-6">
        <div className="card p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="title">Your result: {type}</h1>
              <p className="lead mt-2">{summary.title}</p>
              <p className="mt-2 text-gray-600">{summary.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                }}
              >Copy Result</button>
              <button className="btn btn-primary" onClick={restart}>Retake</button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <DichotomyCard label="Extraversion" a="E" b="I" values={percentages.EI} />
          <DichotomyCard label="Sensing" a="S" b="N" values={percentages.SN} />
          <DichotomyCard label="Thinking" a="T" b="F" values={percentages.TF} />
          <DichotomyCard label="Judging" a="J" b="P" values={percentages.JP} />
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">What this means</h2>
          <p className="text-gray-600">This free quiz provides an informal indication of your preferences across four dichotomies. No online quiz is definitive; use your result as a starting point for reflection, not a label.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container-narrow py-10">
      <header className="mb-8">
        <h1 className="title">MBTI Personality Quiz</h1>
        <p className="lead">Answer {total} quick questions to estimate your type.</p>
      </header>

      {!isDone && (
        <div className="space-y-4">
          <ProgressBar current={step} total={total} />
          <QuestionCard
            index={step}
            total={total}
            question={current}
            value={answers[current.id]}
            onChange={handleAnswer}
          />
          <div className="flex items-center justify-between">
            <button className="btn btn-ghost" onClick={prev} disabled={step === 0}>Back</button>
            <div className="flex items-center gap-2">
              <QuestionDots total={total} current={step} onJump={onJump} />
              <button className="btn btn-primary" onClick={next} disabled={!answers[current.id]}>
                {step + 1 < total ? 'Next' : 'See results'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDone && resultView}

      <footer className="mt-10 text-center text-sm text-gray-500">
        Built for the web with Next.js ? Not affiliated with the MBTI? Foundation
      </footer>
    </main>
  );
}

function DichotomyCard({ label, a, b, values }: { label: string; a: string; b: string; values: { [k: string]: number } }) {
  const aKey = a as keyof typeof values;
  const bKey = b as keyof typeof values;
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="subtitle">{a}/{b}</span>
      </div>
      <div className="progress">
        <span style={{ width: `${values[aKey]}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
        <span>{a}: {values[aKey]}%</span>
        <span>{b}: {values[bKey]}%</span>
      </div>
    </div>
  );
}

function QuestionDots({ total, current, onJump }: { total: number; current: number; onJump: (i: number) => void }) {
  return (
    <div className="hidden sm:flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Jump to question ${i + 1}`}
          className={"h-2 w-2 rounded-full " + (i === current ? 'bg-brand-600' : 'bg-gray-300')}
          onClick={() => onJump(i)}
        />
      ))}
    </div>
  );
}
