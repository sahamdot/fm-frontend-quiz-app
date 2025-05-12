import { useQuiz } from "../../hooks/useCart";

export default function QuizQuestion() {
  const { current } = useQuiz();

  return (
    <div>
      <p className="mb-3 text-sm text-neutral-400 italic md:mb-7 md:text-base dark:text-neutral-300">
        Question {(current?.quiz.question.index as number) + 1} of{" "}
        {current?.quiz.questions?.length}
      </p>
      <h2 className="mb-5 text-[1.25rem] font-semibold text-neutral-500 md:mb-[10rem] md:text-[2.25rem] dark:text-neutral-100">
        {current?.quiz.question.question}
      </h2>
      <div className="shadow-std flex rounded-full bg-neutral-100 p-1">
        <progress
          max={10}
          value={(current?.quiz.question.index as number) + 1}
        />
      </div>
    </div>
  );
}
