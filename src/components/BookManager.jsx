// src/components/BookManager.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../features/books/BookSlice";
const BookManager = () => {
  const dispatch = useDispatch();
  const { list: books } = useSelector((state) => state.books);

  const [form, setForm] = useState({ title: "", author: "", year: "" });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    const { title, author, year } = form;
    if (title && author && year) {
      dispatch(addBook({ title, author, year: Number(year) }));
      setForm({ title: "", author: "", year: "" });
    } else {
      alert("All fields are required.");
    }
  };

  const handleUpdate = (book) => {
    const newTitle = prompt("New Title:", book.title);
    const newAuthor = prompt("New Author:", book.author);
    const newYear = prompt("New Year:", book.year);
    if (newTitle && newAuthor && newYear) {
      dispatch(updateBook({ id: book.id, data: { title: newTitle, author: newAuthor, year: Number(newYear) } }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Book Management</h2>

      {/* Add Book Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">Add New Book</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="author"
                className="form-control"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                name="year"
                className="form-control"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-1 d-grid">
              <button className="btn btn-success" onClick={handleAdd}>
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book List */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Year:</strong> {book.year}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleUpdate(book)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
