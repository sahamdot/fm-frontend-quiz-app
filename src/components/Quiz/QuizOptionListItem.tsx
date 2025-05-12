import clsx from "clsx";
import { useQuiz } from "../../hooks/useCart";
import ListItem from "../UI/ListItem";

export default function QuizOptionListItem({
  option,
  index,
}: {
  option: string;
  index: number;
}) {
  const { selectOption, current } = useQuiz();

  const color = { foreground: "", background: "", border: "" };

  if (!current) return;

  if (current.quiz.question.isAnswerSubmitted) {
    if (option === current.quiz.question.answer) {
      color.foreground = "text-neutral-100";
      color.background = "bg-green";
      color.border = "border-green";
    }

    if (current.option === option && option !== current.quiz.question.answer) {
      color.foreground = "text-neutral-100";
      color.background = "bg-red";
      color.border = "border-red";
    }

    if (current.option !== option && option !== current.quiz.question.answer) {
      color.foreground = "text-neutral-500";
      color.background = "bg-neutral-200";
      color.border = "border-transparent";
    }
  } else {
    if (current.option === option) {
      color.foreground = "text-neutral-100";
      color.background = "bg-purple";
      color.border = "border-purple";
    } else {
      color.foreground = "text-neutral-500";
      color.background = "bg-neutral-200";
      color.border = "border-transparent";
    }
  }

  return (
    <ListItem
      icon={{
        name: index,
        color: color,
      }}
      disabled={current.quiz.question.isAnswerSubmitted}
      key={`option-${option}`}
      text={option}
      className={clsx(
        {
          "pr-[4rem]": true,
        },
        color.border,
      )}
      onClick={() => selectOption(option)}
    />
  );
}
