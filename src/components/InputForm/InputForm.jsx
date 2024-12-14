import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';


const InputForm = ({ onStart }) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const difficultyOptions = [
    { label: 'Low', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'hard' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name, difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-field">
        <label htmlFor="name">Nickname: </label>
        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="p-field">
        <label htmlFor="difficulty">Select difficulty: </label>
        <Dropdown id="difficulty" value={difficulty} options={difficultyOptions} onChange={(e) => setDifficulty(e.value)} />
      </div>
      <Button label="Start" type="submit" />
    </form>
  );
};

export default InputForm;


