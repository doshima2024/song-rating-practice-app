import React from 'react';
import { songMessage } from '../utils/songUtils';
import { countSongsByCategory } from '../utils/songUtils';
import { getAverageRating } from '../utils/songUtils';

// compute total number of songs, number of songs in each category, average numeric rating
//display them in a div

export const SongStats = ({ songs }) => {
  const songsByCategory = countSongsByCategory(songs);
  const averageRating = getAverageRating(songs);
  return (
    <>
      <div>{`Total Songs: ${songs.length}`}</div>
      <div>{`# of "Excellent" Songs: ${songsByCategory.Excellent}`}</div>
      <div>{`# of "Good" Songs: ${songsByCategory.Good}`}</div>
      <div>{`# of "Needs Improvement" Songs: ${songsByCategory['Needs Improvement']}`}</div>
      <div>{`Average Rating of All Songs: ${averageRating}`}</div>
    </>
  );
};
