export type Quiz = {
  title: string;
  icon: string;
  questions: Question[];
};

export type Question = {
  question: string;
  options: string[];
  answer: string;
};
