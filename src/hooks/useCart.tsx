import { useContext } from "react";
import { QuizContext } from "../context/QuizProvider";

export const useQuiz = () => {
  return useContext(QuizContext);
};
