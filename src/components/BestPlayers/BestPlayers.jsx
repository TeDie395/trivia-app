import React from 'react';
import './BestPlayers.css';

const BestPlayers = ({ players }) => {
  return (
    <div className="my-custom-class">  
      <h2>Best Players</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.nickname}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default BestPlayers;


