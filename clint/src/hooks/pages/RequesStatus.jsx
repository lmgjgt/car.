import { useEffect, useState } from 'react';
import api from '../api';

export default function RequestStatus() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get('/requests/me').then(({ data }) => setRequests(data));
  }, []);

  return (
    <>
      <h2>طلباتي</h2>
      {requests.length === 0 && <p>ما عندك طلبات حالياً.</p>}
      <ul>
        {requests.map((req) => (
          <li key={req._id}>
            {req.service} - الحالة: {req.status} - تفاصيل: {req.details}
          </li>
        ))}
      </ul>
    </>
  );
}
