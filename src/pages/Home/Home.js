import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../../components/Book";
import { getAll, update } from "../../services/BookService";
import "./Home.css";

const Home = () => {
  const [booksList, setBooksList] = useState([]);
  const navigate = useNavigate();

  const bookShelves = [
    {
      label: "Currently Reading",
      key: "currentlyReading",
    },
    {
      label: "Want to Read",
      key: "wantToRead",
    },
    {
      label: "Read",
      key: "read",
    },
  ];

  const handleOpenSearch = () => {
    navigate("/search");
  };

  const onMoveShelf = async (book, shelf) => {
    await update(book, shelf);

    const res = await getAll();
    setBooksList(res);

    alert("Moved successfully");
  };

  useEffect(() => {
    getAll().then((res) => {
      setBooksList(res);
    });
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map((bookShelf) => (
            <div key={bookShelf.key} className="bookshelf">
              <h2 className="bookshelf-title">{bookShelf.label}</h2>
              <ol className="books-grid">
                {booksList
                  .filter((book) => book.shelf === bookShelf.key)
                  .map((book) => (
                    <Book key={book.id} book={book} onMoveShelf={onMoveShelf} />
                  ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <button onClick={handleOpenSearch}>Add a book</button>
      </div>
    </div>
  );
};

export default Home;
