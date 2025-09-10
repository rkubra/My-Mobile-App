import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center flex-grow-1" style={{ minHeight: "80vh" }}>
      <h1 className="mb-4 display-5 fw-bold text-dark">📱 Welcome to My Mobile App</h1>
      <p className="lead mb-5 text-secondary">Manage your data efficiently using <strong>React + Firebase</strong></p>

      {/* Buttons */}
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        <Link to="/registration" className="btn btn-primary btn-lg px-4 shadow-sm">Register</Link>
        <Link to="/users" className="btn btn-success btn-lg px-4 shadow-sm">View Users</Link>
        <Link to="/about" className="btn btn-info btn-lg px-4 shadow-sm">About</Link>
      </div>
    </div>
  );
}

export default Home;
 