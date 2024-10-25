import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Simulated authentication logic (you can replace this with your own)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && password) { // Basic validation
      alert('Login successful!');
      navigate('/home'); // Navigate to home after successful login
    } else {
      alert('Invalid credentials! Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="auth-links">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
