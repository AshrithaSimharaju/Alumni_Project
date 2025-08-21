import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostNotice() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notices, setNotices] = useState([]);
  const token = localStorage.getItem('adminToken');

  // Fetch notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to fetch notices');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const postNotice = async () => {
    if (!title || !description) return alert('Fill title and description');
    try {
      await axios.post('http://localhost:5000/api/admin/notices', { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Notice posted successfully');
      setTitle('');
      setDescription('');
      fetchNotices();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to post notice');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Post Notice</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 5 }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ width: '100%', marginBottom: 5 }}
      />
      <button onClick={postNotice}>Post Notice</button>

      <h3>All Notices</h3>
      {notices.map(n => (
        <div key={n._id} style={{ borderBottom: '1px solid #eee', padding: 5 }}>
          <strong>{n.title}</strong>: {n.description}
        </div>
      ))}
    </div>
  );
}
