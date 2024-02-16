import React from "react";
import QuizForm from "../QuizForm/QuizForm";
import { useStore } from "../../store/store";
import type { CommonProps } from "../ContextProvider/ContextProvider";

interface QuizProps {
  questionSubmitted: boolean;
  setQuestionSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const isObjectEmpty = (objectName: Object) =>
  Object.keys(objectName).length === 0;

const Quiz: React.FC<CommonProps & QuizProps> = ({
  data,
  questionSubmitted,
  setQuestionSubmitted,
}) => {
  const {
    questionIndex,
    nextQuestion,
    setSelectedResponse,
    selectedQuestionResponse,
    submit,
    finished,
  } = useStore((state) => state);
  const currentQuestion = data[questionIndex];
  const { id, question, responses } = currentQuestion;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = e.currentTarget.value;

    setSelectedResponse(id, response);
  };

  const handleSubmit = () => {
    submit();
    setQuestionSubmitted(true);
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setQuestionSubmitted(false);
  };

  return (
    <>
      {!finished && (
        <>
          <QuizForm
            question={question}
            responses={responses}
            selectedResponse={Object.values(selectedQuestionResponse)[0]}
            handleSelect={handleSelect}
          />
          {questionSubmitted && !finished ? (
            <div className="next-button-wrapper">
              <button className="btn app-button" onClick={handleNextQuestion}>
                Next {">>>"}
              </button>
            </div>
          ) : (
            <button
              className="btn app-button"
              onClick={handleSubmit}
              disabled={isObjectEmpty(selectedQuestionResponse)}
            >
              Submit
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Quiz;
