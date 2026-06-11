import Quiz from "./components/Quiz";
import quizData from "../data/questions.json";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background px-6 py-16 font-sans">
      <main className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-lg shadow-blue-900/5 sm:p-12">
        <Quiz
          title={quizData.title}
          description={quizData.description}
          questions={quizData.questions}
        />
      </main>
    </div>
  );
}
