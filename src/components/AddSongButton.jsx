import React from 'react';
import { useState } from 'react';

export const AddSongButton = ({ handleAddSong, nameText, setNameText, newRating, setNewRating }) => {
  const [isError, setIsError] = useState(false);

  const handleNameChange = e => setNameText(e.target.value);
  const handleRatingChange = e => setNewRating(e.target.value);

  const handleClick = () => {
    if (nameText.trim() === '' || newRating.trim() === '') {
      setIsError(true);
      return;
    }
    handleAddSong(nameText, newRating);
    setNameText('');
    setNewRating('');
    setIsError(false);
  };

  return (
    <>
      <div>Add A New Song</div>
      <input type="text" placeholder="Name Here" value={nameText} onChange={handleNameChange}></input>
      <input type="number" max="5" placeholder="Rating Here" value={newRating} onChange={handleRatingChange}></input>
      <div>{isError && <p>Name and Rating Field Required</p>}</div>
      <button onClick={handleClick}>Add New Song</button>
    </>
  );
};
