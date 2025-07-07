import { Routes, Route, Navigate, Link } from 'react-router-dom';
import logo from './assets/truck-logo.png';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import RequestStatus from './pages/RequestStatus';
import Chat from './pages/Chat';
import useAuth from './hooks/useAuth';

export default function App() {
  const { token, logout } = useAuth();
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <img src={logo} alt="شعار" style={{ width: 100 }} />
      </div>

      <nav style={{ padding: 10, display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Link to="/">الخدمات</Link>
        <Link to="/status">طلباتي</Link>
        <Link to="/chat">محادثة</Link>
        {token ? (
          <button onClick={logout}>خروج</button>
        ) : (
          <>
            <Link to="/login">دخول</Link>
            <Link to="/register">تسجيل</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/status" element={token ? <RequestStatus /> : <Navigate to="/login" />} />
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}
