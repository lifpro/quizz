"use client";

import { useState } from "react";

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizProps = {
  title: string;
  description: string;
  questions: Question[];
};

export default function Quiz({ title, description, questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleSelect(index: number) {
    if (showResult) return;
    setSelectedAnswer(index);
  }

  function handleValidate() {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="flex w-full flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Quiz terminé !
          </h2>
          <p className="text-muted">
            Vous avez obtenu {score} sur {questions.length} bonnes réponses
          </p>
        </div>

        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-accent ring-4 ring-primary/20">
          <span className="text-4xl font-bold text-primary">{percentage}%</span>
        </div>

        <button
          onClick={handleRestart}
          className="h-12 rounded-full bg-primary px-8 text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted">{description}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className="font-medium text-primary">Score : {score}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-accent">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium text-foreground">
          {currentQuestion.question}
        </h2>

        <ul className="flex flex-col gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            let optionClass =
              "w-full rounded-xl border px-5 py-4 text-left transition-colors ";

            if (showResult) {
              if (isCorrect) {
                optionClass +=
                  "border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100";
              } else if (isSelected && !isCorrect) {
                optionClass +=
                  "border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100";
              } else {
                optionClass +=
                  "border-border bg-card text-muted";
              }
            } else if (isSelected) {
              optionClass +=
                "border-primary bg-accent text-foreground ring-2 ring-primary/30";
            } else {
              optionClass +=
                "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent";
            }

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelect(index)}
                  disabled={showResult}
                  className={optionClass}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={handleValidate}
            disabled={selectedAnswer === null}
            className="h-12 rounded-full bg-primary px-8 text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="h-12 rounded-full bg-primary px-8 text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {isLastQuestion ? "Voir les résultats" : "Question suivante"}
          </button>
        )}
      </div>
    </div>
  );
}
