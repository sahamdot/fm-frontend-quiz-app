import { useQuiz } from "../hooks/useCart";
import CategoryList from "./Category/CategoryList";

export default function Welcome() {
  const { quizzes } = useQuiz();

  return (
    <section className="grid grid-cols-1 gap-[2.5rem] md:grid-cols-2 md:gap-[5.5rem]">
      <div>
        <h1 className="mb-[1rem] text-[2.5rem] leading-10 md:mb-[5rem] md:text-[4rem] md:leading-16 dark:text-neutral-100">
          Welcome to the <br />
          <span className="font-semibold">Frontend Quiz!</span>
        </h1>
        <p className="text-sm text-neutral-400 italic md:text-[1.25rem] dark:text-neutral-300">
          Pick a subject to get started.
        </p>
      </div>

      <div>{quizzes && <CategoryList />}</div>
    </section>
  );
}
