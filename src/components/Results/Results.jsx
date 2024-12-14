import React from 'react';
import './Results.css';

const Results = ({ players, currentPlayer }) => {
  return (
    <div>
      <h2 className="header">Results</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.nickname}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Your Position: {players.findIndex(player => player.nickname === currentPlayer.nickname) + 1}</p>
    </div>
  );
};

export default Results;

