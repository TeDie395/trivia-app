import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BestPlayers from "./components/BestPlayers/BestPlayers";
import InputForm from "./components/InputForm/InputForm";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Results from "./components/Results/Results";
import axios from "axios";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  const handleStart = (name, difficulty) => {
    setCurrentPlayer({ nickname: name, score: 0 });
    const numQuestions = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 5 : 10;
    axios.get(`https://opentdb.com/api.php?amount=${numQuestions}`)
      .then(response => {
        const formattedQuestions = response.data.results.map(question => ({
          question: question.question,
          answers: [
            ...question.incorrect_answers.map(answer => ({ text: answer, isCorrect: false })),
            { text: question.correct_answer, isCorrect: true }
          ].sort(() => Math.random() - 0.5)
        }));
        setQuestions(formattedQuestions);
        setShowQuestionPage(true);
      });
  };

  const handleAnswer = (score) => {
    const newPlayer = { ...currentPlayer, score };
    const updatedPlayers = [...players, newPlayer].sort((a, b) => b.score - a.score);
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    setShowQuestionPage(false);
    setShowResults(true);
  };

  return (
    <div className="app-container">
      {!showQuestionPage && !showResults && (
        <>
          <Card title="Trivia" className="card">
            <DataTable value={players} className="p-datatable-sm">
              <Column field="nickname" header="Nickname" />
              <Column field="score" header="Score" />
            </DataTable>
            <InputForm onStart={handleStart} />
          </Card>
        </>
      )}
      {showQuestionPage && (
        <Card title="Questions" className="card">
          <QuestionPage nickname={currentPlayer.nickname} questions={questions} onAnswer={handleAnswer} />
        </Card>
      )}
      {showResults && (
        <Card title="Results" className="card">
          <Results players={players} currentPlayer={currentPlayer} />
        </Card>
      )}
    </div>
  );
};

export default App;






