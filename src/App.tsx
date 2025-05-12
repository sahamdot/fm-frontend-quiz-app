import Header from "./components/Header";
import Quiz from "./components/Quiz/Quiz";
import QuizResults from "./components/Quiz/QuizResults";
import Welcome from "./components/Welcome";
import { useQuiz } from "./hooks/useCart";

export default function App() {
  const { status, current, quizzes } = useQuiz();

  return (
    <main className="container mx-auto grid max-w-7xl px-[1.5rem] pb-[1.5rem]">
      <Header />

      {status === "ready" && (
        <>
          {!current?.category && <Welcome />}
          {current?.category && quizzes && <Quiz />}
        </>
      )}

      {status === "finished" && <QuizResults />}

      {status === "loading" && <p>Loading</p>}
    </main>
  );
}
