import { useQuiz } from "../../hooks/useCart";
import CategoryTitleIcon from "../Category/CategoryTitleIcon";
import Button from "../UI/Button";

export default function QuizResults() {
  const { reset, current } = useQuiz();

  return (
    <div className="grid grid-cols-1 items-start gap-[3rem] md:grid-cols-2 md:gap-[10rem]">
      <div>
        <h2 className="text-[2.5rem] leading-[2.5rem] text-neutral-500 md:text-[3rem] md:leading-[3rem] dark:text-neutral-100">
          Quiz Completed <br />
          <span className="font-bold">You scored...</span>
        </h2>
      </div>

      <div>
        <div className="mb-[2rem] flex flex-col items-center rounded-[1.5rem] bg-neutral-100 p-[3rem] shadow dark:bg-neutral-400">
          <CategoryTitleIcon />
          <p className="text-[7rem] font-bold text-neutral-500 md:text-[9.25rem] dark:text-neutral-100">
            {current?.score}
          </p>
          <p className="text-[1.25rem] font-medium text-neutral-400 md:text-[1.5rem] dark:text-neutral-300">
            of out {current?.quiz.questions?.length}
          </p>
        </div>
        <Button onClick={reset}>Play Again</Button>
      </div>
    </div>
  );
}
