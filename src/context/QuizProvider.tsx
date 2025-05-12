import React, { createContext, useEffect, useReducer } from "react";
import { getQuizzes } from "../lib/getQuizzes";
import { Category } from "../types/Category";
import { Question, Quiz } from "../types/Quiz";
import { removeKeyFromObject } from "../utils/removeKeyFromObject";

type Status = "loading" | "ready" | "active" | "finished";

type State = {
  score: number;
  quizzes: Quiz[];
  currentQuestionIndex: number;
  selectedOption: string | null;
  selectedCategory: Category | null;
  isAnswerSubmitted: boolean;
  status: Status;
  error: string;
};

const initialState: State = {
  score: 0,
  quizzes: [],
  currentQuestionIndex: 0,
  selectedCategory: null,
  selectedOption: null,
  isAnswerSubmitted: false,
  status: "loading",
  error: "",
};

enum QuizActionType {
  SET_QUIZZES,
  SET_STATUS,
  NEXT_QUESTION,
  SELECT_CATEGORY,
  SELECT_OPTION,
  SUBMIT_ANSWER,
  SET_ERROR,
  RESET,
  FINISH,
}

type QuizAction =
  | {
      type: QuizActionType.SET_QUIZZES;
      payload: Quiz[];
    }
  | {
      type:
        | QuizActionType.NEXT_QUESTION
        | QuizActionType.RESET
        | QuizActionType.FINISH
        | QuizActionType.SUBMIT_ANSWER;
    }
  | { type: QuizActionType.SELECT_CATEGORY; payload: Category }
  | {
      type: QuizActionType.SELECT_OPTION | QuizActionType.SET_ERROR;
      payload: string;
    }
  | { type: QuizActionType.SET_STATUS; payload: Status };

const reducer = (state: State, action: QuizAction): State => {
  switch (action.type) {
    case QuizActionType.SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
      };

    case QuizActionType.SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    case QuizActionType.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case QuizActionType.NEXT_QUESTION: {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedOption: null,
        isAnswerSubmitted: false,
      };
    }

    case QuizActionType.SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    }

    case QuizActionType.SELECT_OPTION: {
      return { ...state, error: "", selectedOption: action.payload };
    }

    case QuizActionType.SUBMIT_ANSWER: {
      return {
        ...state,
        isAnswerSubmitted: true,
        error: "",
        score:
          state.selectedOption ===
          state.quizzes.find(
            (quiz) => quiz.title.toLowerCase() === state.selectedCategory,
          )?.questions[state.currentQuestionIndex].answer
            ? state.score + 1
            : state.score,
      };
    }

    case QuizActionType.RESET: {
      return { ...initialState, quizzes: state.quizzes, status: "ready" };
    }

    case QuizActionType.FINISH: {
      return { ...state, status: "finished" };
    }

    default:
      throw new Error("Unknown action");
  }
};

const useQuizContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadQuizzes() {
      const quizzes = await getQuizzes();
      dispatch({ type: QuizActionType.SET_QUIZZES, payload: quizzes });
      dispatch({ type: QuizActionType.SET_STATUS, payload: "ready" });
    }

    loadQuizzes();
  }, []);

  const currentQuiz = state.quizzes.find(
    (quiz) => quiz.title.toLowerCase() === state.selectedCategory,
  );

  const currentQuestion = currentQuiz?.questions[state.currentQuestionIndex];

  const currentQuizWithoutIcon =
    currentQuiz && removeKeyFromObject(currentQuiz, "icon");

  const current = currentQuiz && {
    quiz: {
      ...currentQuizWithoutIcon,
      question: {
        index: state.currentQuestionIndex,
        isAnswerSubmitted: state.isAnswerSubmitted,
        ...currentQuestion,
      },
    },
    score: state.score,
    category: state.selectedCategory,
    option: state.selectedOption,
    error: state.error,
  };

  const nextQuestion = () => {
    if (!current) return;

    if (
      state.currentQuestionIndex + 1 >=
      (current.quiz.questions as Question[]).length
    ) {
      dispatch({ type: QuizActionType.SET_STATUS, payload: "finished" });
    } else {
      dispatch({ type: QuizActionType.NEXT_QUESTION });
    }
  };

  const selectCategory = (category: Category) => {
    dispatch({ type: QuizActionType.SELECT_CATEGORY, payload: category });
  };

  const selectOption = (option: string) => {
    dispatch({ type: QuizActionType.SELECT_OPTION, payload: option });
  };

  const submitAnswer = () => {
    if (!state.isAnswerSubmitted && !state.selectedOption)
      dispatch({ type: QuizActionType.SET_ERROR, payload: "Please" });

    if (!state.selectedOption) {
      return dispatch({
        type: QuizActionType.SET_ERROR,
        payload: "Please select an answer",
      });
    }

    dispatch({ type: QuizActionType.SUBMIT_ANSWER });
  };

  const reset = () => {
    dispatch({ type: QuizActionType.RESET });
  };

  const finish = () => {
    dispatch({ type: QuizActionType.FINISH });
  };

  return {
    quizzes: state.quizzes,
    status: state.status,
    current,
    nextQuestion,
    selectCategory,
    selectOption,
    submitAnswer,
    reset,
    finish,
  };
};

type Context = ReturnType<typeof useQuizContext>;

export const QuizContext = createContext<Context>({
  quizzes: [],
  status: "loading",
  current: undefined,
  nextQuestion: () => {},
  selectCategory: () => {},
  selectOption: () => {},
  submitAnswer: () => {},
  reset: () => {},
  finish: () => {},
});

export default function QuizProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuizContext.Provider value={useQuizContext()}>
      {children}
    </QuizContext.Provider>
  );
}
