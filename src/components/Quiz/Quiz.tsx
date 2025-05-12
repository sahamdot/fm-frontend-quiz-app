import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useQuiz } from "../../hooks/useCart";
import Button from "../UI/Button";
import QuizOptionList from "./QuizOptionList";
import QuizQuestion from "./QuizQuestion";

export default function Quiz() {
  const { submitAnswer, nextQuestion, current, finish } = useQuiz();

  if (!current) return;

  const isLastQuestion =
    current.quiz.question.index + 1 === current.quiz.questions?.length;

  return (
    <section className="grid grid-cols-1 gap-[3rem] md:grid-cols-2">
      <QuizQuestion />
      <div className="flex flex-col gap-[1rem] md:gap-[1.5rem]">
        <QuizOptionList />
        {current.quiz.question.isAnswerSubmitted && isLastQuestion && (
          <Button onClick={finish}>See Results</Button>
        )}

        {current.quiz.question.isAnswerSubmitted && !isLastQuestion && (
          <Button onClick={nextQuestion}>Next Question</Button>
        )}

        {!current.quiz.question.isAnswerSubmitted && (
          <Button onClick={submitAnswer}>Submit Answer</Button>
        )}

        <div
          className={clsx({
            "flex items-center justify-center gap-2 md:gap-3": current.error,
            hidden: !current.error,
          })}
        >
          <Icon
            icon="fluent:dismiss-circle-24-regular"
            className="text-red text-xl md:text-3xl"
          />
          <p className="text-red text-[1rem] md:text-[1.5rem]">
            {current.error}
          </p>
        </div>
      </div>
    </section>
  );
}
