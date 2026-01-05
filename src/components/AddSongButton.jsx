import React from 'react';
import { useState } from 'react';

export const AddSongButton = ({ handleAddSong, nameText, setNameText, newRating, setNewRating }) => {
  const [isError, setIsError] = useState(false);

  const handleNameChange = e => setNameText(e.target.value);
  const handleRatingChange = e => setNewRating(e.target.value);

  const handleClick = () => {
    const newRatingNumber = Number(newRating);
    if (nameText.trim() === '' || newRating.trim() === '' || newRatingNumber > 5 || newRatingNumber < 0) {
      setIsError(true);
      return;
    }
    handleAddSong(nameText, newRatingNumber);
    setNameText('');
    setNewRating('');
    setIsError(false);
  };

  return (
    <>
      <div>Add A New Song</div>
      <input type="text" placeholder="Name Here" value={nameText} onChange={handleNameChange}></input>
      <input type="number" max="5" placeholder="Rating Here" value={newRating} onChange={handleRatingChange}></input>
      <div>{isError && <p>Name and Rating Fields Required. Rating must be between 0 - 5</p>}</div>
      <button onClick={handleClick}>Add New Song</button>
    </>
  );
};
