import React, { useState, useEffect } from "react";
import { getAll, search, update } from "../../services/BookService";
import SearchBar from "../../components/SearchBar";
import Book from "../../components/Book";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [booksList, setBooksList] = useState([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchSubmit = async (query) => {
    setLoading(true);
    setError("");
    const res = await search(query);

    if (res.error) {
      setLoading(false);
      setError("Oops! Search not found");
      setSearchResults(res.items);
    } else {
      setLoading(false);
      setSearchResults(res);
    }
  };

  const clearResults = () => setSearchResults([]);

  const findCurrentShelf = (bookId) => {
    const book = booksList.find((book) => book.id === bookId);

    if (book) {
      return book.shelf;
    }

    return null;
  };

  const handleInputSearch = (e) => {
    setQuery(e.target.value);
  };

  const onMoveShelf = async (book, shelf) => {
    try {
      await update(book, shelf);

      alert("Moved successfully");
    } catch (e) {
      console.log(e);
    }
  };

  const renderBooks = searchResults?.map((book) => {
    return (
      <Book
        key={book.id}
        book={book}
        onMoveShelf={onMoveShelf}
        currentShelf={findCurrentShelf(book.id)}
      />
    );
  });

  useEffect(() => {
    getAll().then((res) => {
      setBooksList(res);
    });
  }, []);

  useEffect(() => {
    if (debouncedQuery !== "") {
      handleSearchSubmit(debouncedQuery);
    } else {
      clearResults();
    }
    // eslint-disable-next-line
  }, [debouncedQuery]);

  return (
    <div className="search-books">
      <SearchBar value={query} onChange={handleInputSearch} />
      <div className="search-books-results">
        <div className="books-grid">
          {loading && <div>Loading...</div>}
          {!loading && searchResults.length !== 0 && renderBooks}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
