import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const { save } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      save(data.token);
      navigate('/');
    } catch {
      alert('خطأ في بيانات الدخول');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>تسجيل الدخول</h2>
      <input
        placeholder="الإيميل"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPwd(e.target.value)}
        required
      />
      <button type="submit">دخول</button>
    </form>
  );
}
