import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook, updateBook } from "../features/books/bookSlice"; // ✅ CORRECT CASE
import { FaBook } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { showToast } from "../utils/toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BookManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    title: "",
    author: "",
    publishYear: "",
    description: "",
    status: "available",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.book) {
      const book = location.state.book;
      setForm({
        title: book.title,
        author: book.author,
        publishYear: book.publishYear,
        description: book.description || "",
        status: book.status || "available",
      });
      setEditingId(book.id);
      navigate(location.pathname, { replace: true }); // Clear state
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await dispatch(updateBook({ id: editingId, ...form })).unwrap();
        showToast("Book updated successfully!", "success");
      } else {
        await dispatch(addBook(form)).unwrap();
        showToast("Book added successfully!", "success");
      }

      setForm({
        title: "",
        author: "",
        publishYear: "",
        description: "",
        status: "available",
      });
      setEditingId(null);
    } catch {
      showToast("Failed to save book.", "danger");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => showToast("Signed out successfully.", "info"))
      .catch(() => showToast("Error signing out.", "danger"));
  };

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
            <Link className="btn btn-outline-light" to="/books">View Books</Link>
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
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Book Form */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1 mt-5 mb-4">
        <div className="card shadow-lg border-0 rounded-4 p-5" style={{ maxWidth: "700px", width: "100%" }}>
          <h4 className="mb-4 fw-semibold text-primary text-center">
            {editingId ? "Edit Book" : "Add New Book"}
          </h4>
          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-12">
              <label className="form-label">Book Title</label>
              <input
                className="form-control rounded-3"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Author Name</label>
              <input
                className="form-control rounded-3"
                name="author"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Publish Year</label>
              <input
                className="form-control rounded-3"
                name="publishYear"
                type="number"
                value={form.publishYear}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select rounded-3"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control rounded-3"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Optional description..."
              ></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 rounded-3" type="submit">
                {editingId ? "Update Book" : "Add Book"}
              </button>
            </div>
          </form>
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

export default BookManager;
