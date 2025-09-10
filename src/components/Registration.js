import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: new Date()
      });
      setMessage("success");
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error("Error adding document: ", err);
      setMessage("error");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📝 Register</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser /></span>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="form-control" 
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="form-control" 
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) setPhone(val);
                }}
                maxLength={10}
                className="form-control" 
                placeholder="Enter 10-digit phone number"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-success d-block mx-auto"
              style={{ maxWidth: '200px', width: '100%' }}
              disabled={loading}
            >
              {loading ? "Submitting..." : <><FaPaperPlane className="me-2"/> Submit</>}
            </button>
          </form>

          {message === "success" && (
            <div className="alert alert-success mt-3 text-center">
              ✅ Registration successful!
            </div>
          )}
          {message === "error" && (
            <div className="alert alert-danger mt-3 text-center">
              ❌ Error submitting form. Try again.
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-secondary">⬅ Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
