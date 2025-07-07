import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState('');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services').then(({ data }) => setServices(data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!selected) return alert('اختر الخدمة');
    try {
      await api.post('/requests', { service: selected, details });
      alert('تم إرسال الطلب');
      navigate('/status');
    } catch {
      alert('خطأ في إرسال الطلب');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>خدمات السيارات</h2>
      <select onChange={(e) => setSelected(e.target.value)} value={selected} required>
        <option value="">-- اختر خدمة --</option>
        {services.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>
      <textarea
        placeholder="اشرح المشكلة"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <button type="submit">إرسال الطلب</button>
    </form>
  );
}
