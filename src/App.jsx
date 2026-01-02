import './App.css';
import { useState, useMemo, useRef } from 'react';
import arrayOfSongs from './sandbox1';
import {
  HIGH_RATING_THRESHOLD,
  TOP_N_SONGS,
  returnHighRatedSongs,
  filterSongs,
  sortSongs,
  getMinRatingSongs,
  getTopNSongs,
  findSongById,
  cloneSong,
} from './utils/songUtils';
import { SongDisplay } from './components/SongDisplay';
import { SongStats } from './components/SongStats';
import { AddSongButton } from './components/AddSongButton';
import { SongControls } from './components/SongControls';
import { TopSongs } from './components/TopSongs';

function App() {
  const [songs, setSongs] = useState(arrayOfSongs);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [highRatedSongsToggle, setHighRatedSongsToggle] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [nameText, setNameText] = useState('');
  const [newlyAddedSongIds, setNewlyAddedSongsIds] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [userHasPressedDelete, setUserHasPressedDelete] = useState(false);

  const undoTimerIdRef = useRef(null);

  const handleAddSong = nameText => {
    let max = 0;
    for (const song of songs) {
      if (song.id > max) {
        max = song.id;
      }
    }
    const newId = max + 1;
    const newSong = { id: newId, name: nameText, rating: 5 };
    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);
    setNewlyAddedSongsIds(prev => [...prev, newId]);
  };

  const makeTrueForFiveSeconds = () => {
    setUserHasPressedDelete(true);
    if (undoTimerIdRef.current) {
      clearTimeout(undoTimerIdRef.current);
    }

    undoTimerIdRef.current = setTimeout(() => {
      setUserHasPressedDelete(false);
      undoTimerIdRef.current = null;
    }, 5000);
  };

  const handleDeleteSong = id => {
    setSongs(prevSongs => {
      const markedSong = findSongById(prevSongs, id);
      if (markedSong) {
        setLastDeleted(markedSong);
        makeTrueForFiveSeconds();
        return prevSongs.filter(song => song.id !== id);
      } else {
        return prevSongs;
      }
    });
  };

  // In undo I need to reinsert last deleted at that index using splice

  const handleDeleteSongUndo = () => {
    if (!lastDeleted) return;
    setSongs(prevSongs => {
      const undoneSongsArray = [...prevSongs];
      undoneSongsArray.splice(lastDeleted.index, 0, lastDeleted.song);
      return undoneSongsArray;
    });
    setUserHasPressedDelete(false);
    setLastDeleted(null);
    if (undoTimerIdRef.current) clearTimeout(undoTimerIdRef.current);
  };

  // I need to find the song with the matching ID
  // I need to create a new array where that one song is updated
  //I need to call setSongs(newArray)
  const handleEditSong = (id, newName, newRating) => {
    const updatedSongs = songs.map(song => (song.id === id ? { ...song, name: newName, rating: newRating } : song));
    setSongs(updatedSongs);
  };

  const handleCloneSong = id => {
    const clonedSong = cloneSong(songs, id);
    if (clonedSong === null) {
      return;
    }
    setSongs(prevSongs => [...prevSongs, clonedSong]);
  };

  const handleClearFilters = () => {
    setFilterCategory('all');
    setSearchTerm('');
    setSortOrder('none');
    setHighRatedSongsToggle(false);
    setMinRating(0);
  };

  const filteredSongs = useMemo(
    () => filterSongs(songs, filterCategory, searchTerm),
    [songs, filterCategory, searchTerm]
  );
  const songsWithMinRating = useMemo(() => getMinRatingSongs(filteredSongs, minRating), [filteredSongs, minRating]);
  const sortedSongs = useMemo(() => sortSongs(songsWithMinRating, sortOrder), [songsWithMinRating, sortOrder]);
  const visibleSongs = useMemo(
    () => (highRatedSongsToggle ? returnHighRatedSongs(sortedSongs, HIGH_RATING_THRESHOLD) : sortedSongs),
    [highRatedSongsToggle, sortedSongs]
  );
  const top3Songs = useMemo(() => getTopNSongs(visibleSongs, TOP_N_SONGS), [visibleSongs]);

  const totalSongsCount = songs.length;
  const visibleSongsCount = visibleSongs.length;

  return (
    <>
      <TopSongs songs={top3Songs} />
      <br></br>
      <SongControls
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleClearFilters={handleClearFilters}
        highRatedSongsToggle={highRatedSongsToggle}
        setHighRatedSongsToggle={setHighRatedSongsToggle}
        totalSongsCount={totalSongsCount}
        visibleSongsCount={visibleSongsCount}
        minRating={minRating}
        setMinRating={setMinRating}
      />
      <SongDisplay
        songs={visibleSongs}
        handleDeleteSong={handleDeleteSong}
        handleEditSong={handleEditSong}
        newlyAddedSongIds={newlyAddedSongIds}
        handleDeleteSongUndo={handleDeleteSongUndo}
        userHasPressedDelete={userHasPressedDelete}
        searchTerm={searchTerm}
        lastDeleted={lastDeleted}
        handleCloneSong={handleCloneSong}
      />
      <br></br>
      <SongStats songs={songs} />
      <br></br>
      <AddSongButton handleAddSong={handleAddSong} nameText={nameText} setNameText={setNameText} />
    </>
  );
}

export default App;
