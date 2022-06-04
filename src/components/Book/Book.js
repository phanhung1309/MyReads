import React from "react";
import Rating from "../Rating";
import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = ({ book, onMoveShelf }) => {
  const navigate = useNavigate();

  const bookshelfList = [
    { label: "Current reading", value: "currentlyReading" },
    { label: "Want to read", value: "wantToRead" },
    { label: "Read", value: "read" },
    { label: "None", value: "none" },
  ];

  const handleClickBook = (bookId) => {
    navigate(`/${bookId}`);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks ? book.imageLinks.smallThumbnail : ""
            })`,
          }}
          onClick={() => handleClickBook(book.id)}
        />
        <div className="book-shelf-changer">
          <select
            onChange={(e) => onMoveShelf(book, e.target.value)}
            defaultValue={book.shelf ? book.shelf : "move"}
          >
            <option value="move" disabled>
              Move to...
            </option>
            {bookshelfList.map((shelf) => (
              <option key={shelf.value} value={shelf.value}>
                {shelf.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Rating value={book.averageRating} />
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? book.authors.toString() : "Unknown"}
      </div>
    </div>
  );
};

export default Book;
