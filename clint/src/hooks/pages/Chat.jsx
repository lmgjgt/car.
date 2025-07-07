import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('joinRequestRoom', 'general');

    newSocket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, [token]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit('sendMessage', { room: 'general', message: input, sender: 'مستخدم' });
    setInput('');
  };

  return (
    <>
      <h2>محادثة مع الميكانيكي</h2>
      <div style={{ height: 200, overflowY: 'scroll', border: '1px solid black', padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.sender}:</strong> {m.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="اكتب رسالة"
      />
      <button onClick={sendMessage}>إرسال</button>
    </>
  );
}
