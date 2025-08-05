import { useState } from 'react';
import LoadingSpinner from './components/Loading';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) return;

    setLoading(true);

    try {
      // const res = await fetch('http://localhost:3000/api/v1/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });

      const data = {token: 'mocked_token'}; // Mocked response for demonstration

      if (data?.token) {
        // localStorage.setItem('auth_token', data.token);
        onLogin(data.token);
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? <LoadingSpinner /> : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;
