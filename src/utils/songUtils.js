import { arrayOfSongs } from '../sandbox1.js';

export const HIGH_RATING_THRESHOLD = 4;
export const TOP_N_SONGS = 3;

// Function to return a category message based on the song's rating

export const songMessage = rating => {
  if (rating === 5) {
    return 'Excellent';
  } else if (rating === 3 || rating === 4) {
    return 'Good';
  } else {
    return 'Needs Improvement';
  }
};

// Function to count songs by category, and return an object: {Excellent: x, Good: y, 'Needs Improvement': z}

export const countSongsByCategory = songs => {
  const songCountObj = { Excellent: 0, Good: 0, 'Needs Improvement': 0 };
  for (const song of songs) {
    const category = songMessage(song.rating);
    if (category === 'Excellent') {
      songCountObj.Excellent++;
    } else if (category === 'Good') {
      songCountObj.Good++;
    } else {
      songCountObj['Needs Improvement']++;
    }
  }
  return songCountObj;
};

// Function to get the average rating of all songs in songs (array of songs objects)

export const getAverageRating = songs => {
  if (songs.length === 0) {
    return 0;
  }
  let totalRatings = 0;
  for (const song of songs) {
    totalRatings += song.rating;
  }
  return totalRatings / songs.length;
};

// Function to filter songs based on chosen category and/or searchTerm
// I need to filter songs further by searchTerm using .includes on the ALREADY FILTERED array (based on category)
// This means I need to create a new array to begin with ?
// How do I filter this array - with .filter on the newly created array?

export const filterSongs = (songs, category, searchTerm) => {
  let filteredSongs = songs;
  if (category === 'all') {
    filteredSongs = songs;
  } else if (category === 'excellent') {
    filteredSongs = filteredSongs.filter(song => song.rating === 5);
  } else if (category === 'good') {
    filteredSongs = filteredSongs.filter(song => song.rating === 4 || song.rating === 3);
  } else if (category === 'needs improvement') {
    filteredSongs = filteredSongs.filter(song => song.rating <= 2);
  }
  if (searchTerm) {
    filteredSongs = filteredSongs.filter(song => song.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return filteredSongs;
};

// Function to sort songs by rating based on an incoming sortOrder
// Since .sort mutates the original array I will need to create a new array spreading songs to begin
// I can then use an if else block to sort this newly created array using .sort((a, b) => a.rating - b.rating) and the reverse

export const sortSongs = (songs, sortOrder) => {
  const newArrayToSort = [...songs];
  if (sortOrder === 'none') {
    return newArrayToSort;
  } else if (sortOrder === 'sort-ascending') {
    return newArrayToSort.sort((a, b) => a.rating - b.rating);
  } else if (sortOrder === 'sort-descending') {
    return newArrayToSort.sort((a, b) => b.rating - a.rating);
  } else if (sortOrder === 'name-ascending') {
    return newArrayToSort.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'name-descending') {
    return newArrayToSort.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    return newArrayToSort;
  }
};

// Function to return just songs over or equal to HIGH_RATING_THRESHOLD

export const returnHighRatedSongs = (songs, threshold) => {
  return songs.filter(song => song.rating >= threshold);
};

// Function to return a new array of songs where ratings are >= minRating

export const getMinRatingSongs = (songs, minRating) => {
  return songs.filter(song => song.rating >= minRating);
};

// Function to return the top3 songs (or topN) songs
// I'll need to order the songs in a new array in desc order by rating using .sort and then use .slice to get the [0,3] indeces

export const getTopNSongs = (songs, number) => {
  const songsToSort = [...songs];
  const sortedSongs = songsToSort.sort((a, b) => b.rating - a.rating);
  const topNSongs = sortedSongs.slice(0, number);
  return topNSongs;
};

// Undo delete helper function

export const findSongById = (songs, id) => {
  const findSong = song => (song.id = id);
  const index = songs.findIndex(findSong);

  if (index === -1) {
    return null;
  } else {
    return { song: songs[index], index: index };
  }
};
