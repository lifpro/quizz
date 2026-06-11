import { fireEvent, render, screen } from "@testing-library/react";
import Quiz from "@/app/components/Quiz";

const mockQuestions = [
  {
    id: 1,
    question: "Question test ?",
    options: ["Réponse A", "Réponse B", "Réponse C"],
    correctAnswer: 1,
  },
];

describe("Quiz", () => {
  it("affiche le titre et la première question", () => {
    render(
      <Quiz
        title="Quiz Test"
        description="Description du quiz"
        questions={mockQuestions}
      />,
    );

    expect(screen.getByRole("heading", { name: "Quiz Test" })).toBeInTheDocument();
    expect(screen.getByText("Question test ?")).toBeInTheDocument();
    expect(screen.getByText("Réponse B")).toBeInTheDocument();
  });

  it("incrémente le score après une bonne réponse", () => {
    render(
      <Quiz
        title="Quiz Test"
        description="Description du quiz"
        questions={mockQuestions}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Réponse B" }));
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));

    expect(screen.getByText("Score : 1")).toBeInTheDocument();
  });
});
