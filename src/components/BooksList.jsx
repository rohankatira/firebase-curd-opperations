// src/components/BooksList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { showToast } from "../utils/toast";
import { FaBook } from "react-icons/fa";

const BooksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.list);
  const user = useSelector((state) => state.auth.user);

  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleEdit = (book) => {
    navigate("/", { state: { book } });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBook(id)).unwrap();
      showToast("Book deleted successfully", "success");
    } catch {
      showToast("Failed to delete book", "danger");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => showToast("Signed out successfully.", "info"))
      .catch(() => showToast("Error signing out.", "danger"));
  };

  const filteredBooks =
    statusFilter === "all"
      ? books
      : books.filter((book) => book.status === statusFilter);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav
        className="navbar navbar-dark sticky-top"
        style={{ background: "linear-gradient(to right, #182848, #4b6cb7)" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <FaBook className="me-2" /> BookManager
          </a>
          <div className="d-flex align-items-center gap-3">
            <Link className="btn btn-outline-light" to="/">Manage Books</Link>
            {user && (
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="https://i.pravatar.cc/32"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                    alt="avatar"
                  />
                  <strong>{user.displayName || "Librarian"}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Filter & Books Grid */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>All Books</h2>
          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredBooks.map((book) => (
            <div className="col" key={book.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>

                  <div className="mb-2">
                    <span
                      className={`badge me-1 bg-${book.status === "available" ? "success" : "secondary"}`}
                    >
                      {book.status}
                    </span>
                    {book.category && (
                      <span className="badge bg-info text-dark">
                        {book.category}
                      </span>
                    )}
                  </div>

                  <p className="card-text text-muted mb-1">{book.author}</p>
                  <p className="card-text">
                    <small>Published: {book.publishYear}</small>
                  </p>
                  {book.description && (
                    <p className="card-text text-secondary small">{book.description}</p>
                  )}

                  <div className="mt-auto d-flex justify-content-between pt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="footer mt-auto py-3"
        style={{ background: "linear-gradient(to right, #182848, #4b6cb7)" }}
      >
        <div className="container d-flex justify-content-between text-white">
          <span>© 2025 BookManager - Library Management System</span>
          <div>
            <a href="#" className="text-white me-3">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BooksList;
