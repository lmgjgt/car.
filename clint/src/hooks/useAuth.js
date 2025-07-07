import { useState } from 'react';

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const save = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, save, logout };
}
