import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import "./SearchBar.css";

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  // Submit new search
  useEffect(() => {
    if (debouncedQuery !== "") {
      onSearchSubmit(debouncedQuery);
    } else {
      clearResults();
    }
    // eslint-disable-next-line
  }, [debouncedQuery]);

  const handleInputSearch = (e) => {
    setQuery(e.target.value);
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
          value={query}
          onChange={handleInputSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
