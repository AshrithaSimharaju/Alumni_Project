import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import './AdminDashboard.css'; // Make sure you have your CSS

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [studentForm, setStudentForm] = useState({
    name: '',
    id_no: '',
    email: '',
    branch: '',
    graduation_year: ''
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const noticeRef = useRef();
  const studentRef = useRef();

  // ---------------- FETCH MESSAGES & NOTICES ----------------
  const fetchData = async () => {
    if (!token) {
      alert('No token found. Please login again.');
      navigate('/admin_auth');
      return;
    }

    try {
      const [msgsRes, noticesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/contact_admin', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/notices', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setMessages(Array.isArray(msgsRes.data) ? msgsRes.data : []);
      setNotices(Array.isArray(noticesRes.data) ? noticesRes.data : []);
    } catch (err) {
      console.error('Error fetching data:', err.response?.data || err.message);
      alert('Failed to fetch messages or notices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- VERIFY MESSAGE ----------------
  // const verifyMessage = async (sender_email) => {
  //   if (!sender_email) return alert('Sender email is undefined');
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:5000/api/admin/verify-messages',
  //       { email_id: sender_email.toLowerCase().trim() },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (res.data.authorized) {
  //       alert('Authorized sender.');
  //     } else {
  //       alert(res.data.message);
  //       setMessages(prev => prev.filter(msg => msg.sender_email !== sender_email));
  //     }

  //     fetchData();
  //   } catch (err) {
  //     console.error("Verify message error:", err.response?.data || err.message);
  //     alert('Error verifying sender.');
  //   }
  // };
const verifyMessage = async (sender_email) => {
  if (!sender_email) return alert('Sender email is undefined');

  try {
    const res = await axios.post(
      'http://localhost:5000/api/admin/verify-messages',
      { email_id: sender_email }, // backend expects 'email_id'
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.authorized) {
      alert('Authorized sender.');
    } else {
      alert(res.data.message);
      setMessages(prev => prev.filter(msg => msg.sender_email !== sender_email));
    }

    fetchData(); // refresh messages
  } catch (err) {
    console.error("Verify message error:", err.response?.data || err.message);
    alert('Error verifying sender.');
  }
};



  // ---------------- DELETE MESSAGE ----------------
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      console.error("Delete message error:", err.response?.data || err.message);
    }
  };

  // ---------------- SEND REPLY ----------------
  const sendReply = (msg) => {
    if (!msg.sender_email) return alert('No sender email');
    navigate('/contact', { state: { receiverEmail: msg.sender_email } });
  };

  // ---------------- POST NOTICE ----------------
  const postNotice = async () => {
    if (!title || !description) return alert('Fill title and description');
    try {
      await axios.post(
        'http://localhost:5000/api/admin/notices',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      fetchData();
    } catch (err) {
      console.error("Post notice error:", err.response?.data || err.message);
    }
  };

  // ---------------- DELETE NOTICE ----------------
  const deleteNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/delete-notice/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) setNotices(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error("Delete notice error:", error);
    }
  };

  // ---------------- ADD STUDENT ----------------
  const addStudent = async () => {
    const { name, email, branch } = studentForm;
    if (!name || !email || !branch) return alert('Fill all required fields');

    try {
      await axios.post(
        'http://localhost:5000/api/admin/students',
        studentForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Student added successfully');
      setStudentForm({ name: '', id_no: '', email: '', branch: '', graduation_year: '' });
    } catch (err) {
      console.error("Add student error:", err.response?.data || err.message);
    }
  };

  const handleStudentChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };
  const handlecontact = (e) => {
     navigate('/contact');
  };

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <div className="navbar">
        <h1>Admin Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={handlecontact}>Contact Alumni</button>
          <button onClick={() => scrollTo(noticeRef)}>Post Notice</button>
          <button onClick={() => scrollTo(studentRef)}>Add Student</button>
        </div>
      </div>

      {/* Alumni Messages */}
      <div className="card messages-card">
        <h2>Alumni Messages</h2>
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="message-item">
              <p><strong>From:</strong> {msg.sender_email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <div className="btn-group">
                <button onClick={() => verifyMessage(msg.sender_email)}>Verify</button>
                <button onClick={() => sendReply(msg)}>Send Reply</button>
                <button onClick={() => deleteMessage(msg._id)} title="Delete">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Notice */}
      <div ref={noticeRef} className="card notice-card">
        <h2>📢 Post Notice</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={postNotice}>Post Notice</button>

        <h3>🆕 New Updates</h3>
        {notices.length === 0 ? <p>No notices</p> : (
          <>
            {notices.slice((page - 1) * 5, page * 5).map(n => (
              <div key={n._id} className="notice-item-card">
                <div className="notice-header">
                  <h4>{n.title}</h4>
                  <span>{new Date(n.createdAt).toLocaleString()}</span>
                  <FaTrash onClick={() => deleteNotice(n._id)} className="delete-icon"/>
                </div>
                <p>{n.description}</p>
              </div>
            ))}

            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Previous</button>
              <button disabled={page * 5 >= notices.length} onClick={() => setPage(page + 1)}>Next ➡</button>
            </div>
          </>
        )}
      </div>

      {/* Add Student */}
      <div ref={studentRef} className="card student-card">
        <h2>Add Student</h2>
        <input name="name" placeholder="Name" value={studentForm.name} onChange={handleStudentChange} />
        <input name="id_no" placeholder="ID Number" value={studentForm.id_no} onChange={handleStudentChange} />
        <input name="email" placeholder="Email" value={studentForm.email} onChange={handleStudentChange} />
        <input name="branch" placeholder="Branch" value={studentForm.branch} onChange={handleStudentChange} />
        <input name="graduation_year" placeholder="Graduation Year" value={studentForm.graduation_year} onChange={handleStudentChange} />
        <button onClick={addStudent}>Add Student</button>
      </div>
    </div>
  );
}

