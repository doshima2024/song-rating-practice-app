import React, { useState } from 'react';
import { songMessage } from '../utils/songUtils';

export const SongDisplay = ({
  songs,
  handleDeleteSong,
  handleEditSong,
  newlyAddedSongIds,
  userHasPressedDelete,
  handleDeleteSongUndo,
  searchTerm,
  lastDeleted,
  handleCloneSong,
  toggleSelectedSongs,
  selectedSongIds,
  handleDeleteMultipleSongs,
  handleCloneMultipleSongs,
  newBulkRating,
  setNewBulkRating,
  handleEditMultipleRatings,
  handleDeleteMultipleSongsUndo,
}) => {
  const [songEditId, setSongEditId] = useState(null);
  const [songEditedName, setSongEditedName] = useState('');
  const [songEditedRating, setSongEditedRating] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleEditClick = (id, name, rating) => {
    setSongEditId(id);
    setSongEditedName(name);
    setSongEditedRating(rating);
  };

  const handleNameChange = e => {
    setSongEditedName(e.target.value);
  };

  const handleRatingChange = e => {
    setSongEditedRating(Number(e.target.value));
  };

  const handleCancel = () => {
    setSongEditId(null);
    setSongEditedName('');
    setSongEditedRating(0);
  };

  const handleConfirm = id => {
    if (0 > songEditedRating || songEditedRating > 5) {
      setIsError(true);
      return;
    }
    handleEditSong(id, songEditedName, songEditedRating);
    setSongEditId(null);
    setIsError(false);
  };

  const handleBulkRatingChange = e => {
    setNewBulkRating(Number(e.target.value));
  };

  const filterOptions = [{ label: 'All' }, { label: 'Excellent' }, { label: 'Good' }, { label: 'Needs Improvement' }];

  return (
    <>
      <div>{songs.length === 0 && !searchTerm && <p>No Songs Visible</p>}</div>
      <div>{songs.length === 0 && searchTerm && <p>No Songs Match This Category and Search Term</p>}</div>
      {songs.map(song =>
        song.id !== songEditId ? (
          newlyAddedSongIds.includes(song.id) ? (
            <div key={song.id}>
              {`${song.name} - ${songMessage(song.rating)} - Clone Count: ${song.cloneCount} - NEWLY ADDED SONG`}
              <button onClick={() => handleDeleteSong(song.id)}>Delete Song</button>
              <button onClick={() => handleEditClick(song.id, song.name, song.rating)}>Edit</button>
              <button onClick={() => handleCloneSong(song.id)}>Clone Song</button>
              <input
                type="checkbox"
                checked={selectedSongIds.includes(song.id)}
                onChange={() => toggleSelectedSongs(song.id)}
              ></input>
            </div>
          ) : (
            <div key={song.id}>
              {`${song.name} - ${songMessage(song.rating)} - Clone Count: ${song.cloneCount}`}
              <button onClick={() => handleDeleteSong(song.id)}>Delete Song</button>
              <button onClick={() => handleEditClick(song.id, song.name, song.rating)}>Edit</button>
              <button onClick={() => handleCloneSong(song.id)}>Clone Song</button>
              <input
                type="checkbox"
                checked={selectedSongIds.includes(song.id)}
                onChange={() => toggleSelectedSongs(song.id)}
              ></input>
            </div>
          )
        ) : (
          <div key={song.id}>
            <div>
              <div>Edit Name</div>
              <input type="text" placeholder={song.name} value={songEditedName} onChange={handleNameChange}></input>
              <div>Edit Rating (0-5)</div>
              <input type="number" max="5" value={songEditedRating} onChange={handleRatingChange}></input>
              <div>{isError && <p>Rating Must Be Between 0 And 5</p>}</div>
              <button onClick={() => handleCancel()}>Cancel</button>
            </div>
            <div>
              <button
                onClick={() => {
                  handleConfirm(song.id);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )
      )}
      <div>
        {selectedSongIds.length !== 0 && (
          <>
            <button onClick={() => handleDeleteMultipleSongs()}>Delete All Checked Songs</button>
            <button onClick={() => handleCloneMultipleSongs()}>Clone All Checked Songs</button>
            <div>
              <label>Edit Rating For All Checked Songs </label>
              <input type="number" max="5" min="0" value={newBulkRating} onChange={handleBulkRatingChange}></input>
              <button onClick={() => handleEditMultipleRatings()}>Apply</button>
            </div>
          </>
        )}
      </div>
      {userHasPressedDelete && lastDeleted !== null && lastDeleted.length === 1 && (
        <div>
          <p>{`Last Deleted Song: ${lastDeleted.map(song => song.song.name)}`}</p>

          {/* FIX THIS! currently displaying last deleted name as undefined */}
          <button onClick={handleDeleteSongUndo}>Undo Delete Song </button>
        </div>
      )}

      {userHasPressedDelete && lastDeleted !== null && lastDeleted.length > 1 && (
        <>
          <div>
            <p>{`Last Deleted Songs: ${lastDeleted.map(song => song.song.name)}`}</p>
            <button onClick={() => handleDeleteMultipleSongsUndo()}>Undo Delete Songs</button>
          </div>
        </>
      )}
    </>
  );
};
