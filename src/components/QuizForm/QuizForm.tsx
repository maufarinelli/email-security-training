import React from "react";

interface QuizFormProps {
  question: string;
  responses: { [key: string]: string };
  selectedResponse: string;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  question,
  responses,
  selectedResponse,
  handleSelect,
}) => (
  <div>
    <h2 className="question">{question}</h2>
    <form>
      <ul>
        {Object.values(responses).map((reponse, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name={question}
                value={reponse}
                checked={selectedResponse === reponse}
                onChange={handleSelect}
              />
              {reponse}
            </label>
          </li>
        ))}
      </ul>
    </form>
  </div>
);

export default QuizForm;
