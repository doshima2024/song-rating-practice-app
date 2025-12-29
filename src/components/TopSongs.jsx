import React from 'react';

export const TopSongs = ({ songs }) => {
  return (
    <>
      {songs.length === 0 && <p>No songs to rank</p>}
      <div>Top 3 Songs Below:</div>
      {songs.length > 0 &&
        songs.map((song, index) => (
          <div key={song.id}>
            {index + 1} : {song.name} - {song.rating}
          </div>
        ))}
    </>
  );
};
