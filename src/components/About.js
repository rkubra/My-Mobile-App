import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-3">ℹ️ About My Mobile App</h2>
      <p className="lead mb-4">
        This app is developed to demonstrate web and mobile development skills using <strong>React</strong>, <strong>Firebase</strong>, and <strong>Bootstrap</strong>.
      </p>

      <div className="row text-start mt-4">
        <div className="col-md-6 mx-auto">
          <h5>✨ Features</h5>
          <ul>
            <li>Register new users with validation</li>
            <li>View, edit, and delete user records</li>
            <li>Firebase database integration</li>
            <li>Mobile-friendly responsive design</li>
          </ul>

          <h5 className="mt-4">🚀 Purpose</h5>
          <p>
            This project was created as part of a learning journey to master full-stack app development. 
            It focuses on real-time data handling and modern UI best practices.
          </p>

          <h5 className="mt-4">👨‍💻 Developer</h5>
          <p>
            Built by <strong>Rahmathul Kubra</strong>.  
            You can connect with me for collaboration, improvements, or feedback!
          </p>
        </div>
      </div>

      <div className="text-center mt-4 mb-5">
        <Link to="/" className="btn btn-secondary btn-lg">⬅ Back to Home</Link>
      </div>
    </div>
  );
}

export default About; 