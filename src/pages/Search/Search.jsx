import React, { useState } from "react";
import { search } from "../../services/BookService";
import SearchBar from "../../components/SearchBar";
import Book from "../../components/Book";
import "./Search.css";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const onSearchSubmit = async (query) => {
    const res = await search(query);

    if (res.error) {
      setSearchResults(res.items);
    } else {
      setSearchResults(res);
    }
  };

  const clearResults = () => setSearchResults([]);

  const renderBooks = searchResults.map((book) => {
    return (
      <Book
        key={book.id}
        image={`url(${book.imageLinks.smallThumbnail})`}
        title={book.title}
        authors={book.authors}
      />
    );
  });

  return (
    <div className="search-books">
      <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} />
      <div className="search-books-results">
        <div className="books-grid">
          {searchResults.length !== 0 ? (
            renderBooks
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
