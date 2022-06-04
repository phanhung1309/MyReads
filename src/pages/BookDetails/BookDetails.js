import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../services/BookService";
import Rating from "../../components/Rating";
import "./BookDetails.css";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const params = useParams();

  useEffect(() => {
    get(params.bookId).then((res) => {
      setBook(res);
    });
  }, [params.bookId]);

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <div className="left-set">
          <img
            src={book.imageLinks ? book.imageLinks.thumbnail : ""}
            alt="Book cover"
          />
        </div>
        <div className="right-set">
          <div className="name">{book.title}</div>
          <div className="subname">
            {book.authors ? book.authors.toString() : "Unknown"}
            <p>Page count: {book.pageCount}</p>
            <p>Published date: {book.publishedDate}</p>
          </div>
          <Rating value={book.averageRating} />
          <div className="description">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
