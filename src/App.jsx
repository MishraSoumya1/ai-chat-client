import { useState } from 'react';
import AiChat from './AiChat';
import Login from './Login';

function App() {
  // const [token, setToken] = useState(localStorage.getItem('auth_token'));

  const [token, setToken] = useState(null)

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return token ? (
    <AiChat token={token} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
