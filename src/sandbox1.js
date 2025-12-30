// Song array

export const arrayOfSongs = [
  { id: 1, name: 'Behind', rating: 1 },
  { id: 2, name: 'Getting There', rating: 3 },
  { id: 3, name: 'Good and Ready', rating: 5 },
  { id: 4, name: 'Really Working Hard', rating: 5 },
  { id: 5, name: 'I Think Practice Helps', rating: 2 },
  { id: 6, name: 'This Is A Test, Did I Do This?', rating: 4 },
];

// Function to return a category based on the song's numerical rating

export const songMessage = rating => {
  if (rating === 5) {
    return 'Excellent';
  } else if (rating === 3 || rating === 4) {
    return 'Good';
  } else {
    return 'Needs Improvement';
  }
};

// Function to count the number of songs in each category

const countSongsByCategory = () => {
  let countExcellent = 0;
  let countGood = 0;
  let countNeedsImprovement = 0;

  for (const song of arrayOfSongs) {
    const songCategory = songMessage(song.rating);
    if (songCategory === 'Excellent') {
      countExcellent += 1;
    } else if (songCategory === 'Good') {
      countGood += 1;
    } else if (songCategory === 'Needs Improvement') {
      countNeedsImprovement += 1;
    }
  }

  console.log(`Excellent: ${countExcellent}`, `Good: ${countGood}`, `Needs Improvement: ${countNeedsImprovement}`);
};

// Function that takess category as a parameter and returns all song names matching that category

const getSongsByCategory = category => {
  const results = [];
  for (const song of arrayOfSongs) {
    const songCategory = songMessage(song.rating);
    if (songCategory === category) {
      results.push(song.name);
    }
  }
  return results;
};

// Function to calculate the average rating of all songs

const averageRating = () => {
  let ratingCounter = 0;
  for (const song of arrayOfSongs) {
    const songRating = song.rating;
    ratingCounter += songRating;
  }
  const averageRating = ratingCounter / arrayOfSongs.length;
  return averageRating;
};

// Function to return the objects of top rated songs; First, finding the maximum numerical rating, then to filter the song objects with that rating and return

const getTopRatedSongs = () => {
  const ratingArray = [];
  arrayOfSongs.forEach(song => ratingArray.push(song.rating));
  let max = 0;
  for (const num of ratingArray) {
    if (num > max) {
      max = num;
      console.log('MAX_LOG:', max);
    }
  }
  const topRatedSongs = arrayOfSongs.filter(song => song.rating === max);
  return topRatedSongs;
};

// JS Exercise:

const functionPractice = (songs, category, search) => {
  let filteredSongs = songs;
  if (category === 'excellent') {
    filteredSongs = songs.filter(song => song.rating === 5);
  } else if (category === 'good') {
    filteredSongs = songs.filter(song => song.rating === 3 || song.rating === 4);
  } else if (category === 'needs improvement') {
    filteredSongs = songs.filter(song => song.rating <= 2);
  }
  if (search) {
    filteredSongs = filteredSongs.filter(song => song.name.toLowerCase().includes(search.toLowerCase()));
  }
  return filteredSongs;
};

// More JS Practice: Getting an avg rating

const getAverageRating = songs => {
  if (songs.length === 0) {
    return 0;
  }
  let totalRatings = 0;
  for (const song of songs) {
    totalRatings += song.rating;
  }
  return totalRatings / songs.length;
};

// More JS Practice: Sorting songs by rating

const sortSongsByRating = songs => {
  let sortedSongs = [...songs];
  sortedSongs = sortedSongs.sort((a, b) => b.rating - a.rating);
  return sortedSongs;
};

console.log('new array!:', sortSongsByRating(arrayOfSongs));

// More JS Practice: Find a song by id:

const findSongById1 = (songs, id) => {
  const matchingSong = songs.find(song => id === song.id);
  if (!matchingSong) {
    return null;
  }
  return matchingSong;
};

console.log('FOUND SONG!:', findSongById1(arrayOfSongs, 3));

// More JS Practice: Return the top 3 songs (sort and slice practice):

const findTopThreeSongs = songs => {
  const songsCopy = [...songs];
  const songsInOrder = songsCopy.sort((a, b) => b.rating - a.rating);
  const top3 = songsInOrder.slice(0, 3);
  return top3;
};

console.log('top3 songs:', findTopThreeSongs(arrayOfSongs));

// More JS Practice: Function to add a category to songs:

const addCategoryToSongs = songs => {
  let songsWithCategory = songs.map(song => ({ ...song, category: songMessage(song.rating) }));
  return songsWithCategory;
};

// More JS Practice: Group songs by category (don't mutate the OG array, use songMessage(rating) to compute category
//I need to first create and name a new object songsByCategory
//I need to loop through the songs array of song objects
//For each song I need to find it's category
// Then i need to add that song to the correct key's array in songsByCategory (what method will i use, can i push to an obj.key?)

const groupSongsByCategory = songs => {
  const songsByCategory = { Excellent: [], Good: [], 'Needs Improvement': [] };
  for (const song of songs) {
    const songCategory = songMessage(song.rating);
    if (songCategory === 'Excellent') {
      songsByCategory.Excellent.push(song);
    } else if (songCategory === 'Good') {
      songsByCategory.Good.push(song);
    } else {
      songsByCategory['Needs Improvement'].push(song);
    }
  }
  return songsByCategory;
};

console.log('SongsByCategory!!!!:', groupSongsByCategory(arrayOfSongs));

// More JS Practice: Count Songs By Category (return an object with a key of category and a value of the count):
// first i need to create a new obj
//then i need to count # of songs in each category and assign them to a variable
//Then i need to loop through songs and update each count variable to the correct key

const countSongsByCategory2 = songs => {
  const songsByCategoryCount = { Excellent: 0, Good: 0, 'Needs Improvement': 0 };
  for (const song of songs) {
    const songCategory = songMessage(song.rating);
    if (songCategory === 'Excellent') {
      songsByCategoryCount.Excellent += 1;
    } else if (songCategory === 'Good') {
      songsByCategoryCount.Good += 1;
    } else {
      songsByCategoryCount['Needs Improvement'] += 1;
    }
  }
  return songsByCategoryCount;
};

console.log('SONG COUNTED BY CATEGORY OBJ:', countSongsByCategory2(arrayOfSongs));

// More JS Practice: get average rating by category (return an object with keys being the categories and values being the avg rating in that cat)
//I need to declare/create a categoryAvgRating obj
//I need to set up variables for totalrating for each category, and then divide that by (songs in that category).length
// so di need variables for the count off each category AND the totalratings of each category?
// after calculations I need to get the avg rating calcs into the object

const getAverageRatingByCategory = songs => {
  const categoryAverageRatingObj = { Excellent: 0, Good: 0, 'Needs Improvement': 0 };
  if (songs.length === 0) {
    return { Excellent: 0, Good: 0, 'Needs Improvement': 0 };
  }
  let excellentSongsCount = 0;
  let goodSongsCount = 0;
  let needsImpovSongsCount = 0;
  let excellentTotalRatings = 0;
  let goodTotalRatings = 0;
  let needsImprovTotalRatings = 0;
  for (const song of songs) {
    const songCategory = songMessage(song.rating);
    if (songCategory === 'Excellent') {
      excellentSongsCount++;
      excellentTotalRatings += song.rating;
    } else if (songCategory === 'Good') {
      goodSongsCount++;
      goodTotalRatings += song.rating;
    } else {
      needsImpovSongsCount++;
      needsImprovTotalRatings += song.rating;
    }
  }

  if (excellentSongsCount === 0) {
    categoryAverageRatingObj.Excellent = 0;
  } else {
    categoryAverageRatingObj.Excellent = excellentTotalRatings / excellentSongsCount;
  }
  if (goodSongsCount === 0) {
    categoryAverageRatingObj.Good = 0;
  } else {
    categoryAverageRatingObj.Good = goodTotalRatings / goodSongsCount;
  }
  if (needsImpovSongsCount === 0) {
    categoryAverageRatingObj['Needs Improvement'] = 0;
  } else {
    categoryAverageRatingObj['Needs Improvement'] = needsImprovTotalRatings / needsImpovSongsCount;
  }

  return categoryAverageRatingObj;
};

console.log('HARD ONE, SONG AVGS BY CATEGORY OBJ:', getAverageRatingByCategory(arrayOfSongs));

// More JS Practice: take in songs and a threshold as parameters, return true if ANY song has a rating above the threshold
//I need to use .some() to return a boolean based on the condition provided
const hasHighRatedSongs = (songs, threshold) => {
  return songs.some(song => song.rating > threshold);
};

console.log('Does It Have High Rated Song(s)?:', hasHighRatedSongs(arrayOfSongs, 0));

// More JS Practice: return songs rated above a given threshold:
// I need to:
// use .find or .filter to get the songs with song.rating > threshold, but need to create a new array first to not mutate OG array
// I need to return [] when no songs match

const getHighRatedSongs = (songs, threshold) => {
  const highRatedSongs = songs.filter(song => {
    return song.rating >= threshold;
  });
  return highRatedSongs;
};

console.log('Get High Rated Songs:', getHighRatedSongs(arrayOfSongs, 4));

const getHighRatedSongs2 = (songs, threshold) => {
  return songs.filter(song => song.rating > threshold);
};

console.log('Get High Rated Songs 2:', getHighRatedSongs2(arrayOfSongs, 4));

arrayOfSongs.map(song => console.log(`${song.name}:`, songMessage(song.rating)));
countSongsByCategory();
console.log(getSongsByCategory('Excellent'));
console.log('Average Rating:', averageRating());
console.log(getTopRatedSongs());

export default arrayOfSongs;
