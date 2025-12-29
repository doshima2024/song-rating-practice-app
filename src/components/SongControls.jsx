import React from 'react';

export const SongControls = ({
  filterCategory,
  setFilterCategory,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  handleClearFilters,
  highRatedSongsToggle,
  setHighRatedSongsToggle,
  totalSongsCount,
  visibleSongsCount,
  minRating,
  setMinRating,
}) => {
  const handleFilterSelect = e => {
    setFilterCategory(e.target.value);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchTerm('');
  };

  const handleSortChange = e => {
    setSortOrder(e.target.value);
  };

  const handleToggleChange = () => {
    setHighRatedSongsToggle(prev => !prev);
  };

  const handleMinRatingChange = e => {
    setMinRating(Number(e.target.value));
  };

  return (
    <>
      <div>
        <label>Filter By Category</label>
        <select value={filterCategory} onChange={handleFilterSelect}>
          <option value="all">All</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="needs improvement">Needs Improvement</option>
        </select>
      </div>
      <div>
        <label>Sort Songs By Rating</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="sort-ascending">Sort In Ascending Order By Rating</option>
          <option value="sort-descending">Sort In Descending Order By Rating</option>
          <option value="name-ascending">Sort In Alphabetical Ascending Order</option>
          <option value="name-descending">Sort In Alphabetical Descending Order</option>
        </select>
      </div>
      <div>
        <label>Search For A Song</label>
        <input
          type="text"
          placeholder="Search For A Song Here"
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>
        <button onClick={() => handleSearchReset()}>Reset Search</button>
      </div>
      <div>
        <label>Filter Songs By Minimum Rating</label>
        <input type="range" min="0" max="5" value={minRating} onChange={handleMinRatingChange}></input>
        <p>Minimum Rating: {minRating}</p>
      </div>
      <div>
        <label>Filter For High Rated Songs</label>
        <input type="checkbox" checked={highRatedSongsToggle} onChange={handleToggleChange}></input>
      </div>
      <div>
        <button onClick={handleClearFilters}>Reset All Filters</button>
      </div>
      <div>
        Showing {visibleSongsCount} of {totalSongsCount} :
      </div>
      <br></br>
    </>
  );
};
