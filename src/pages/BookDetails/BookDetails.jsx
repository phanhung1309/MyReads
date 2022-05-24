import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../services/BookService";
import "./BookDetails.css";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const params = useParams();

  console.log(params.bookId);

  useEffect(() => {
    get(params.bookId).then((res) => {
      console.log(res);
      setBook(res);
    });
  }, [params.bookId]);

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <div className="left-set">
          <img src={book.imageLinks.smallThumbnail} alt="Book cover" />
        </div>
        <div className="right-set">
          <div className="name">{book.title}</div>
          <div className="author">{book.authors.toString()}</div>
          <div className="description">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
