import { Quiz } from "../types/Quiz";

export const getQuizzes = async () => {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data.quizzes as Quiz[];
};
