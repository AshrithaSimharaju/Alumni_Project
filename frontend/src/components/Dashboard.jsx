import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaThumbsUp, FaShare,FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';

// Safe localStorage parsing
const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
    localStorage.removeItem('user'); 
    return null;
  }
};

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect if user not logged in & fetch posts
  // useEffect(() => {
  //   const user = getUserFromLocalStorage();
  //   if (!user) {
  //     navigate('/login');
  //     return;
  //   }

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/posts');
  //       const formattedPosts = response.data.map((post) => ({
  //         ...post,
  //         fileUrl: post.file ? `http://localhost:5000${post.file}` : null,
  //         authorProfilePicture: post.authorId?.profilePicture
  //           ? `http://localhost:5000${post.authorId.profilePicture}`
  //           : null,
  //         author: post.authorId?.fullName || 'Anonymous',
  //         likeCount: post.likeCount || 0,
  //       }));
  //       setPosts(formattedPosts);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, [navigate]);

  useEffect(() => {
  const user = getUserFromLocalStorage();
  if (!user) {
    navigate('/login');
    return;
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      const formattedPosts = response.data.map((post) => ({
        ...post,
        fileUrl: post.fileUrl ? `http://localhost:5000${post.fileUrl}` : null,
        authorProfilePicture: post.authorId?.profilePicture
          ? `http://localhost:5000${post.authorId.profilePicture}`
          : null,
        author: post.authorId?.fullName || 'Anonymous',
        likeCount: post.likeCount || 0,
      }));
      setPosts(formattedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  fetchPosts();
}, [navigate]);

  // Fetch user profile
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) handleProfileFetch(user._id);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleProfileFetch = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
      setUserProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  };

 const handleDelete = async (postId) => {
  if (!window.confirm('Are you sure you want to delete this post?')) return;
  try {
    await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  } catch (err) {
    console.error('Error deleting post:', err);
  }
};


  const handleCopyLink = (postId) => {
    const postUrl = `${window.location.origin}/posts/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => alert('Post link copied!'));
  };

  const handleUserSearchSubmit = (e) => {
    e.preventDefault();
    if (userSearchTerm.trim()) navigate(`/profiledetails?search=${userSearchTerm}`);
    else alert('Please enter a full name to search.');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Filter posts
  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(postSearchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="search-bar">
          <FaSearch size="25px" />
          <input
            type="text"
            placeholder="Search Alumni..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
          />
          <button onClick={handleUserSearchSubmit}>Search</button>
        </div>
        <div className="header">
          <div className="user-profile-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {userProfile && (
              <div className="user-info">
                <img
                  src={`http://localhost:5000${userProfile.profilePicture}`}
                  alt={userProfile.fullName}
                  className="user-avatar"
                />
                <span>{userProfile.fullName}</span>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={() => navigate('/editprofile')}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/profileview">Profile</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/login1">Contact Admin</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <p>Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <div className="post-list">
            {filteredPosts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <img
                    src={post.authorProfilePicture || 'https://via.placeholder.com/40'}
                    alt="Author"
                    className="author-picture"
                  />
                  <div>
                    <h3>{post.author}</h3>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(post._id)}
                    title="Delete Post"
                    style={{ cursor: 'pointer', marginLeft: 'auto', color: 'red' }}
                  />
                </div>
                <p className="post-description">{post.description}</p>
               {post.fileUrl && (post.fileUrl.endsWith('.mp4') || post.fileUrl.endsWith('.mov')) && (
  <video controls src={post.fileUrl} className="post-media" />
)}

                {post.fileUrl && /\.(jpeg|jpg|png|gif)$/.test(post.fileUrl) && (
                  <img src={post.fileUrl} alt="Post content" className="post-media" />
                )}
                <div className="post-actions">
                  <button onClick={() => handleLike(post._id)}>
                    <FaThumbsUp /> Like ({post.likeCount})
                  </button>
                  <button onClick={() => handleCopyLink(post._id)}>
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

