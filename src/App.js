import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import BookDetails from "./pages/BookDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:bookId" element={<BookDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
