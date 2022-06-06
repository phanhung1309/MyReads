import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  const navigate = useNavigate();

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
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
