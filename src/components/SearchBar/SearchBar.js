import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();

  // Update query value after 0.5 second from the last update of 'debouncedQuery'
  useEffect(() => {
    const timer = setTimeout(() => setQuery(debouncedQuery), 500);
    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  // Submit new search
  useEffect(() => {
    if (query !== "") {
      onSearchSubmit(query);
    } else {
      clearResults();
    }
    // eslint-disable-next-line
  }, [query]);

  const handleInputSearch = (e) => {
    setDebouncedQuery(e.target.value);
  };

  const handleCloseSearch = () => {
    navigate("/");
  };

  return (
    <div className="search-books-bar">
      <button className="close-search" onClick={handleCloseSearch}>
        Close
      </button>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={debouncedQuery}
          onChange={handleInputSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
