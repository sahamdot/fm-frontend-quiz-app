import { categoryIcon } from "../../data/categoryIcon";
import { useQuiz } from "../../hooks/useCart";
import { Category } from "../../types/Category";
import ListItem from "../UI/ListItem";

export default function CategoryItem({ quizTitle }: { quizTitle: string }) {
  const { selectCategory } = useQuiz();

  const listIcon = categoryIcon[quizTitle.toLowerCase()];

  return (
    <ListItem
      key={quizTitle}
      icon={{
        name: listIcon.name,
        color: {
          foreground: listIcon.color.foreground,
          background: listIcon.color.background,
        },
      }}
      text={quizTitle}
      onClick={() => selectCategory(quizTitle.toLowerCase() as Category)}
    />
  );
}
