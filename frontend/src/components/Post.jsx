

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Get the logged-in user's ID (make sure this is stored in localStorage when the user logs in)
  const userId = JSON.parse(localStorage.getItem('user'))?._id;  // Assuming 'user' is stored in localStorage

  useEffect(() => {
    // Add class to body
    document.body.classList.add('post-page-bg');

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('post-page-bg');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage('You must be logged in to create a post.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('authorId', userId);  // Add the logged-in user's ID to the form data
    if (file) formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Post uploaded successfully!');
      setDescription('');
      setFile(null);
      navigate('/dashboard');  // Redirect to the dashboard after posting
    } catch (error) {
      console.error('Error uploading post:', error);
      setMessage('Error uploading post.');
    }
  };

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Post;

