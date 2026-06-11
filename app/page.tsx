import Quiz from "./components/Quiz";
import quizData from "../data/questions.json";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-950 sm:p-12">
        <Quiz
          title={quizData.title}
          description={quizData.description}
          questions={quizData.questions}
        />
      </main>
    </div>
  );
}
