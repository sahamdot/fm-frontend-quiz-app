import { useQuiz } from "../../hooks/useCart";
import QuizOptionListItem from "./QuizOptionListItem";

export default function QuizOptionList() {
  const { current } = useQuiz();

  return (
    <ul className="flex flex-col gap-[1rem] md:gap-[1.5rem]">
      {current?.quiz?.question?.options?.map((option, index) => (
        <QuizOptionListItem
          option={option}
          index={index}
          key={`option-${option}`}
        />
      ))}
    </ul>
  );
}
