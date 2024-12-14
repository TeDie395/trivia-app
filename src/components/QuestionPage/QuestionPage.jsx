import React, { useState } from 'react';
import { Button } from 'primereact/button';
import './QuestionPage.css';

const QuestionPage = ({ nickname, questions, onAnswer }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onAnswer(score);
    }
  };

  return (
    <div>
      <h2 className="header">{nickname}'s Score: {score}</h2>
      <div className="question-section">
        <p>{questions[currentQuestionIndex].question}</p>
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <Button key={index} label={answer.text} onClick={() => handleAnswer(answer.isCorrect)} />
        ))}
      </div>
      <Button label="Next" onClick={() => handleAnswer(false)} />
    </div>
  );
};

export default QuestionPage;



