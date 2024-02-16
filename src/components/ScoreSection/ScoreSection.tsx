import React from "react";
import { useStore } from "../../store/store";
import type { CommonProps } from "../ContextProvider/ContextProvider";

const scoreClassMap: { [key: number]: string } = {
  0: "percentage-0",
  1: "percentage-25",
  2: "percentage-50",
  3: "percentage-75",
  4: "percentage-100",
};

const scoreQualityMap: { [key: number]: string } = {
  0: "Please do the training again. It is really important to understand the concepts of Cybersecurity this days.",
  1: "Please do the training again. It is really important to understand the concepts of Cybersecurity this days.",
  2: "Please do the training again. You understand most of concepts of Cybersecurity, but you missed some.",
  3: "Good Job. You have a good Cybersecurity knowledge.",
  4: "Excellent. You have a pretty good Cybersecurity knowledge. Congratulations!",
};

interface ScoreSectionProps {
  questionSubmitted: boolean;
}

const ScoreSection: React.FC<CommonProps & ScoreSectionProps> = ({
  data,
  questionSubmitted,
}) => {
  const { score, rightAnswer, questionIndex, finished } = useStore(
    (state) => state
  );

  return (
    <div className="score-wrapper">
      <h2>
        Result:{" "}
        {typeof rightAnswer !== "undefined" && (
          <>
            {!rightAnswer ? (
              <span>"Wrong Answer"</span>
            ) : (
              <span>"Right Answer"</span>
            )}
          </>
        )}
      </h2>
      <p>Score: {score} right question(s). </p>
      {finished && <h3>{scoreQualityMap[score]}</h3>}
      {questionSubmitted && (
        <ul>
          {data[questionIndex].takeaway.map((phrase) => (
            <li>{phrase}</li>
          ))}
        </ul>
      )}
      <div className={`pie-chart ${scoreClassMap[score]}`}>
        <span className="pie-chart-score">{score}</span>
      </div>
      {finished && (
        <button
          className="btn app-button"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default ScoreSection;
