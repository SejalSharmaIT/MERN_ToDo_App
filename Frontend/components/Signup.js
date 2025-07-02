import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const signup = async () => {
    await axios.post('http://localhost:5000/api/auth/signup', { username, password });
    nav('/');
  };

 return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Sign Up</button>
      <div className="switch-link">
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
}
