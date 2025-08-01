import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ user }) => {
  const [query, setQuery] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "https://newsify-backend-fugz.onrender.com";

 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await axios(`${BASE_URL}/api`);
       setAllBlogs(res.data  || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchBlogs();
}, []);


 
  // Handle live filtering
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const results = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(results);
  }, [query, allBlogs]);

  const handleResultClick = (blogId) => {
    setQuery(""); // Clear search input
    setFilteredBlogs([]); // Clear dropdown
    navigate(`/blog/${blogId}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
     
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          <i className="bi bi-journal-text me-2"></i>Blogify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/blog/addBlog">
                  <i className="bi bi-plus-circle me-1"></i> Add Blog
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`${BASE_URL}${user.profileImgUrl}` || "/default-profile.png"}
                    className="rounded-circle me-2"
                    width="36"
                    height="36"
                    alt="Profile"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{user.FullName}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/user/my-profile">
                      My Profile
                    </Link>
                  </li>
                  <li><Link className="dropdown-item" to="#">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/user/logout">Logout</Link></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/user/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/user/signup">
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Search Box */}
          <div className="position-relative" style={{ width: "250px" }}>
            <input
              className="form-control shadow-sm rounded-pill px-3"
              type="search"
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Result Dropdown */}
            {filteredBlogs.length > 0 && (
              <ul className="list-group position-absolute w-100 mt-2 z-3 shadow-sm">
                {filteredBlogs.slice(0, 5).map((blog) => (
                  <li
                    key={blog._id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleResultClick(blog._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {blog.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
     
    </nav>
  );
};

export default Navbar;
