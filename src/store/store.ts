import { create, type StoreApi, type UseBoundStore } from "zustand";
import questions from "../data/questions.json";

interface Store {
  questionIndex: number;
  selectedQuestionResponse: { [key: string]: string };
  score: number;
  rightAnswer: boolean | undefined;
  finished: boolean;
  nextQuestion: () => void;
  setSelectedResponse: (id: string, response: string) => void;
  submit: () => void;
}

const rightAnswersMap = questions.reduce((acc, question) => {
  const { id, responses, rightAnswer } = question;
  acc.set(id, (responses as any)[rightAnswer]);
  return acc;
}, new Map<string, string>());

export const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  questionIndex: 0,
  selectedQuestionResponse: {},
  score: 0,
  rightAnswer: undefined,
  finished: false,
  nextQuestion: () => {
    set((state: any) => ({
      finished: state.questionIndex === questions.length - 1,
      questionIndex:
        state.questionIndex === questions.length - 1
          ? state.questionIndex
          : state.questionIndex + 1,
      rightAnswer: undefined,
      selectedQuestionResponse: {},
    }));
  },
  setSelectedResponse: (id: string, response: string) => {
    set((_: any) => ({ selectedQuestionResponse: { [id]: response } }));
  },
  submit: () => {
    set((state: any) => {
      const [key, value] = Object.entries(state.selectedQuestionResponse)[0];
      const currentQuestion = rightAnswersMap.get(key);

      if (currentQuestion === value) {
        return { score: state.score + 1, rightAnswer: true };
      }
      return { score: state.score, rightAnswer: false };
    });
  },
}));
