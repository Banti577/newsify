// src/components/Home.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css"; // Enhanced Design CSS

function Home() {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get("http://localhost:5000/api")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <header className="home-header text-center py-4 mb-4">
        <h1 className="display-5 fw-bold">Explore Inspiring Blogs</h1>
        <p className="lead">Fresh ideas, unique voices & stories worth reading</p>
      </header>

      {/* Carousel Slider */}
      <div id="blogSlider" className="carousel slide custom-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog, idx) => (
              <div
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                key={blog._id}
              >
                <img
                  src={`${BASE_URL}${blog.coverImageUrl}`}
                  className="d-block w-100 carousel-img"
                  alt="Blog Slide"
                />
                <div className="carousel-caption d-none d-md-block carousel-caption-custom">
                  <h3 className="carousel-blog-title">{blog.title}</h3>
                  <Link to={`/blog/${blog._id}`} className="btn btn-light btn-sm mt-2">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div className="d-flex align-items-center justify-content-center empty-carousel">
                <h3 className="text-muted">No Blogs Available</h3>
              </div>
            </div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#blogSlider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#blogSlider" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Blog Cards Section */}
      <section className="container blog-grid mt-5">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="card blog-card enhanced-card shadow" key={blog._id}>
              <div className="card-img-container">
                <img
                  src={`${BASE_URL}${blog.coverImageUrl}`}
                  className="card-img-top blog-card-img"
                  alt="Blog"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title blog-title">{blog.title}</h5>
                <Link to={`/blog/${blog._id}`} className="btn btn-outline-primary w-100 mt-2">
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted my-5">
            <h2>No Blogs Available</h2>
            <p>Stay tuned for the latest updates and inspiring posts!</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;