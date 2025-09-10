 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      {/* Global background wrapper */}
      <div style={{ background: "#dee2e6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Page Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <footer className="text-center py-3 bg-dark text-white mt-auto">
          <p className="mb-0">© {new Date().getFullYear()} My Mobile App. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;