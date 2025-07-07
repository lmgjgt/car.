import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const { save } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { username, email, password });
      save(data.token);
      navigate('/');
    } catch {
      alert('خطأ في التسجيل');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>تسجيل حساب جديد</h2>
      <input
        placeholder="اسم المستخدم"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <button type="submit">تسجيل</button>
    </form>
  );
}
