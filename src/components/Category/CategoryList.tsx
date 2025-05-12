import { useQuiz } from "../../hooks/useCart";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const { quizzes } = useQuiz();

  return (
    <ul className="flex flex-col gap-[1.5rem]">
      {quizzes?.map((quiz) => (
        <CategoryItem key={quiz.title} quizTitle={quiz.title} />
      ))}
    </ul>
  );
}
