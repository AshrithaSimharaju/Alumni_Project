import { useState } from 'react';
import axios from 'axios';

export default function AddStudent() {
  const [studentForm, setStudentForm] = useState({
    name: '',
    id_no: '',
    email: '',
    branch: '',
    year: ''
  });
  const token = localStorage.getItem('adminToken');

  const handleChange = e => setStudentForm({ ...studentForm, [e.target.name]: e.target.value });

  const addStudent = async () => {
    const { name, id_no, email, branch, year } = studentForm;
    if (!name || !id_no || !email || !branch || !year) return alert('Fill all fields');
    try {
      await axios.post('http://localhost:5000/api/admin/students', studentForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Student added successfully');
      setStudentForm({ name: '', id_no: '', email: '', branch: '', year: '' });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add student');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h2>Add Student</h2>
      <input name="name" placeholder="Name" value={studentForm.name} onChange={handleChange} style={{ width: '100%', marginBottom: 5 }} />
      <input name="id_no" placeholder="ID Number" value={studentForm.id_no} onChange={handleChange} style={{ width: '100%', marginBottom: 5 }} />
      <input name="email" placeholder="Email" value={studentForm.email} onChange={handleChange} style={{ width: '100%', marginBottom: 5 }} />
      <input name="branch" placeholder="Branch" value={studentForm.branch} onChange={handleChange} style={{ width: '100%', marginBottom: 5 }} />
      <input name="year" placeholder="Year" value={studentForm.year} onChange={handleChange} style={{ width: '100%', marginBottom: 5 }} />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}
