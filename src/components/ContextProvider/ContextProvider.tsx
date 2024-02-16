import React, { useState } from "react";
import Quiz from "../Quiz/Quiz";
import ScoreSection from "../ScoreSection/ScoreSection";
import questions from "../../data/questions.json";

export interface CommonProps {
  data: {
    id: string;
    question: string;
    responses: { [key: string]: string };
    rightAnswer: string;
    takeaway: string[];
  }[];
}

const ContextProvider: React.FC = () => {
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  return (
    <>
      <div className="content-wrapper">
        <Quiz
          data={questions}
          questionSubmitted={questionSubmitted}
          setQuestionSubmitted={setQuestionSubmitted}
        />
      </div>
      <section className="score-section">
        <div className="content-wrapper">
          <ScoreSection
            data={questions}
            questionSubmitted={questionSubmitted}
          />
        </div>
      </section>
    </>
  );
};

export default ContextProvider;
