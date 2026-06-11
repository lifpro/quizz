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
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Quiz terminé !
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Vous avez obtenu {score} sur {questions.length} bonnes réponses
          </p>
        </div>

        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
          <span className="text-4xl font-bold text-black dark:text-zinc-50">
            {percentage}%
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="h-12 rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span>Score : {score}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-300"
          style={{
            width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium text-black dark:text-zinc-50">
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
                  "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400";
              }
            } else if (isSelected) {
              optionClass +=
                "border-foreground bg-zinc-100 text-black dark:bg-zinc-900 dark:text-zinc-50";
            } else {
              optionClass +=
                "border-zinc-200 bg-white text-black hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:border-zinc-600";
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
            className="h-12 rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-[#ccc]"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="h-12 rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            {isLastQuestion ? "Voir les résultats" : "Question suivante"}
          </button>
        )}
      </div>
    </div>
  );
}
