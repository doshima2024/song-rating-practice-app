import './App.css';
import { useState, useMemo, useRef, useEffect } from 'react';
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
  const [songs, setSongs] = useState(() => {
    const currentSongsState = localStorage.getItem('Current_Songs_State');
    let parsed;
    try {
      parsed = JSON.parse(currentSongsState);
    } catch {
      return arrayOfSongs;
    }
    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      return arrayOfSongs;
    }
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [highRatedSongsToggle, setHighRatedSongsToggle] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [nameText, setNameText] = useState('');
  const [newlyAddedSongIds, setNewlyAddedSongsIds] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [userHasPressedDelete, setUserHasPressedDelete] = useState(false);
  const [newRating, setNewRating] = useState('');
  const [selectedSongIds, setSelectedSongIds] = useState([]);

  const undoTimerIdRef = useRef(null);

  // write songs state to localStorage

  useEffect(() => {
    localStorage.setItem('Current_Songs_State', JSON.stringify(songs));
  }, [songs]);

  const toggleSelectedSongs = id => {
    setSelectedSongIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(ID => ID !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  console.log('Selected Song IDs:', selectedSongIds);

  const handleAddSong = (nameText, rating) => {
    let max = 0;
    for (const song of songs) {
      if (song.id > max) {
        max = song.id;
      }
    }
    const newId = max + 1;
    const newSong = { id: newId, name: nameText, rating: Number(rating), cloneCount: 0 };
    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);
    setNewlyAddedSongsIds(prev => [...prev, newId]);
    setTimeout(() => {
      setNewlyAddedSongsIds(prevIds => prevIds.filter(Id => Id !== newId));
    }, 5000);
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

  const handleEditSong = (id, newName, newRating) => {
    const updatedSongs = songs.map(song => (song.id === id ? { ...song, name: newName, rating: newRating } : song));
    setSongs(updatedSongs);
  };

  const handleCloneSong = id => {
    const clonedSong = cloneSong(songs, id);
    if (clonedSong === null) {
      return;
    }
    setSongs(prevSongs => {
      const updatedSongs = prevSongs.map(song => {
        if (song.id === id) {
          return { ...song, cloneCount: song.cloneCount + 1 };
        } else {
          return song;
        }
      });
      return [...updatedSongs, clonedSong];
    });
  };

  const handleDeleteMultipleSongs = () => {
    setSongs(prevSongs => {
      return prevSongs.filter(song => !selectedSongIds.includes(song.id));
    });
    setSelectedSongIds([]);
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

  console.log('App selectedSongIds:', selectedSongIds); // DEBUG REMOVE!!!

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
        toggleSelectedSongs={toggleSelectedSongs}
        selectedSongIds={selectedSongIds}
        handleDeleteMultipleSongs={handleDeleteMultipleSongs}
      />
      <br></br>
      <SongStats songs={songs} />
      <br></br>
      <AddSongButton
        handleAddSong={handleAddSong}
        nameText={nameText}
        setNameText={setNameText}
        newRating={newRating}
        setNewRating={setNewRating}
      />
    </>
  );
}

export default App;
