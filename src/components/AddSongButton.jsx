import React from 'react';
import { useState } from 'react';

export const AddSongButton = ({ handleAddSong, nameText, setNameText }) => {
  const [isError, setIsError] = useState(false);

  const handleChange = e => setNameText(e.target.value);

  const handleClick = () => {
    if (nameText.trim() === '') {
      setIsError(true);
      return;
    }
    handleAddSong(nameText);
    setNameText('');
    setIsError(false);
  };

  return (
    <>
      <div>Add A New Song</div>
      <input type="text" placeholder="Name Here" value={nameText} onChange={handleChange}></input>
      <div>{isError && <p>Name Field Required</p>}</div>
      <button onClick={handleClick}>Add New Song</button>
    </>
  );
};
