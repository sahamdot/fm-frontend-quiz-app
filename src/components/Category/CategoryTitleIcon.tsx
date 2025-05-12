import { Icon } from "@iconify/react";
import { categoryIcon as icon } from "../../data/categoryIcon";
import { useQuiz } from "../../hooks/useCart";

export default function CategoryTitleIcon() {
  const { current } = useQuiz();

  if (!current?.category) return <p>Category not available</p>;

  const categoryIcon = icon[current.category];

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`rounded-lg p-2 md:p-3 ${categoryIcon.color.background}`}>
        <Icon
          icon={categoryIcon.name}
          className={`text-[1.5rem] md:text-3xl ${categoryIcon.color.foreground}`}
        />
      </div>
      <p className="text-[1rem] font-medium text-neutral-500 uppercase md:text-[2rem] dark:text-neutral-100">
        {current?.quiz.title?.toUpperCase()}
      </p>
    </div>
  );
}
