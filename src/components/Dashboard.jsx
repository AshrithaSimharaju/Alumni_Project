
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUserCircle, FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [users, setUsers] = useState([]); // State for users
//   const [loading, setLoading] = useState(true);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [userSearchTerm, setUserSearchTerm] = useState(''); // Separate search term for users
//   const [postSearchTerm, setPostSearchTerm] = useState(''); // Separate search term for posts
  
//   const navigate = useNavigate();

//   // Fetch posts from the backend
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/posts');
//         const formattedPosts = response.data.map((post) => ({
//           ...post,
//           fileUrl: `http://localhost:5000${post.fileUrl}`,
//           authorProfilePicture: post.authorId?.profilePicture
//             ? `http://localhost:5000${post.authorId.profilePicture}`
//             : null,
//           author: post.authorId?.fullName || 'Anonymous',
//           likeCount: post.likeCount || 0, 
//         }));

//         setPosts(formattedPosts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleLike = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === postId
//           ? { ...post, likeCount: post.likeCount + 1 }
//           : post
//       )
//     );
//   };

//   const handleCopyLink = (postId) => {
//     const postUrl = `${window.location.origin}/posts/${postId}`; // Create the URL for the post
//     navigator.clipboard
//       .writeText(postUrl) // Copy the URL to the clipboard
//       .then(() => alert('Post link copied to clipboard!')) // Notify the user
//       .catch((error) => console.error('Error copying link:', error)); // Handle errors
//   };

//   const handleUserSearchSubmit = async (e) => {
//     e.preventDefault();

//     if (userSearchTerm.trim()) {
//       navigate(`/profiledetails?search=${userSearchTerm}`);
//     } else {
//       alert('Please enter a full name to search.');
//     }
//   };

//   const handleProfileFetch = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
//       const contentType = response.headers.get('Content-Type');
//       if (contentType && contentType.includes('application/json')) {
//         const data = await response.json();
//         setUserProfile(data);
//       } else {
//         const errorText = await response.text();
//         console.error('Unexpected response type:', errorText);
//         setError('Error fetching profile data');
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       setError('Error fetching profile data');
//     }
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       handleProfileFetch(user._id);
//     } else {
//       setError('No user found');
//     }

//     // Fetch the list of all users for searching
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/profile');
//         setUsers(response.data);
//         setFilteredUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filter posts by postSearchTerm
//   const filteredPosts = posts.filter((post) =>
//     post.description.toLowerCase().includes(postSearchTerm.toLowerCase())
//   );

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <header className="navbar">
//         <div className="search-bar">
//           <FaSearch size="40px" />
//           <input
//             type="text"
//             placeholder="Search Alumni here..."
//             value={userSearchTerm}
//             onChange={(e) => setUserSearchTerm(e.target.value)} // Update user search term
//           />
//           <button onClick={handleUserSearchSubmit} className="search-btn">Search</button>
//         </div>

//         {/* User Profile in Navbar */}
//         <div className="header">
//           {userProfile && (
//             <div className="user-info">
//               <img
//                 src={`http://localhost:5000${userProfile.profilePicture}`}
//                 alt={userProfile.fullName}
//                 className="user-avatar"
//               />
//               <span>{userProfile.fullName}</span>
//             </div>
//           )}
//         </div>
//       </header>
//       <aside className="sidebar">
//         <nav>
//           <ul>
//             <li><Link to="/gallery">Gallery</Link></li>
//             <li><Link to="/addevent">Add Event</Link></li>
//             <li><Link to="/profileview">Profile</Link></li>
//             <li><Link to="/post">Post</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><Link to="/notifications">Notifications</Link></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {loading ? (
//           <p>Loading posts...</p>
//         ) : filteredPosts.length > 0 ? (
//           <div className="post-list">
//             {filteredPosts.map((post) => (
//               <div key={post._id} className="post-card">
//                 <div className="post-header">
//                   <img
//                     src={post.authorProfilePicture || 'https://via.placeholder.com/40'}
//                     alt="Author"
//                     className="author-picture"
//                   />
//                   <div>
//                     <h3>{post.author}</h3>
//                     <span>{new Date(post.createdAt).toLocaleString()}</span>
//                   </div>
//                 </div>
//                 <p className="post-description">{post.description}</p><br />
//                 {post.fileUrl && post.fileUrl.endsWith('.mp4') && (
//                   <video controls src={post.fileUrl} className="post-media" />
//                 )}
//                 {post.fileUrl && /\.(jpeg|jpg|png)$/.test(post.fileUrl) && (
//                   <img src={post.fileUrl} alt="Post content" className="post-media" />
//                 )}
//                 <div className="post-actions">
//                   <button onClick={() => handleLike(post._id)}>
//                     <FaThumbsUp /> Like ({post.likeCount})
//                   </button>
//                   <button onClick={() => handleCopyLink(post._id)}>
//                     <FaShare /> Share
//                   </button>
//                   <button><FaComment /> Comment</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No posts found.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;








// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       handleProfileFetch(user._id);
//     }
//   }, []);

//   const handleProfileFetch = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
//       const data = await response.json();
//       setUserProfile(data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user'); // Remove user info from localStorage
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <header className="navbar">
//         <div className="search-bar">
//           <FaSearch size="40px" />
//           <input
//             type="text"
//             placeholder="Search Alumni here..."
//             className="search-input"
//           />
//           <button className="search-btn">Search</button>
//         </div>

//         {/* User Profile with Dropdown */}
//         <div className="header">
//           <div
//             className="user-profile-dropdown"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <FaUserCircle size="40px" />
//             <span>{userProfile?.fullName || 'User'}</span>
//             {dropdownOpen && (
//               <div className="dropdown-menu">
//                 <button onClick={() => navigate('/editprofile')}>Edit Profile</button>
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Sidebar */}
//       <aside className="sidebar">
//         <nav>
//           <ul>
//             <li><Link to="/gallery">Gallery</Link></li>
//             <li><Link to="/addevent">Add Event</Link></li>
//             <li><Link to="/profileview">Profile</Link></li>
//             <li><Link to="/post">Post</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><Link to="/notifications">Notifications</Link></li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <p>Welcome to the dashboard!</p>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;








import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState(''); // Separate search term for users
  const [postSearchTerm, setPostSearchTerm] = useState(''); 
  const [dropdownOpen, setDropdownOpen] = useState(false); // Separate search term for posts
  
  const navigate = useNavigate();

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const formattedPosts = response.data.map((post) => ({
          ...post,
          fileUrl: `http://localhost:5000${post.fileUrl}`,
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
  }, []);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, likeCount: post.likeCount + 1 }
          : post
      )
    );
  };

  const handleCopyLink = (postId) => {
    const postUrl = `${window.location.origin}/posts/${postId}`; // Create the URL for the post
    navigator.clipboard
      .writeText(postUrl) // Copy the URL to the clipboard
      .then(() => alert('Post link copied to clipboard!')) // Notify the user
      .catch((error) => console.error('Error copying link:', error)); // Handle errors
  };

  const handleUserSearchSubmit = async (e) => {
    e.preventDefault();

    if (userSearchTerm.trim()) {
      navigate(`/profiledetails?search=${userSearchTerm}`);
    } else {
      alert('Please enter a full name to search.');
    }
  };
  const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user info from localStorage
        navigate('/login'); // Redirect to login page
      };

  const handleProfileFetch = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        const errorText = await response.text();
        console.error('Unexpected response type:', errorText);
        setError('Error fetching profile data');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Error fetching profile data');
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      handleProfileFetch(user._id);
    } else {
      setError('No user found');
    }

    // Fetch the list of all users for searching
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter posts by postSearchTerm
  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(postSearchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="search-bar">
          <FaSearch size="40px" />
          <input
            type="text"
            placeholder="Search Alumni here..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)} // Update user search term
          />
          <button onClick={handleUserSearchSubmit} className="search-btn">Search</button>
        </div>

        {/* User Profile in Navbar */}
        <div className="header">
        <div
            className="user-profile-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
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
      <aside className="sidebar">
        <nav>
          <ul>
            
            <li><Link to="/addevent">Add Event</Link></li>
            <li><Link to="/profileview">Profile</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
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
                </div>
                <p className="post-description">{post.description}</p><br />
                {post.fileUrl && post.fileUrl.endsWith('.mp4') && (
                  <video controls src={post.fileUrl} className="post-media" />
                )}
                {post.fileUrl && /\.(jpeg|jpg|png)$/.test(post.fileUrl) && (
                  <img src={post.fileUrl} alt="Post content" className="post-media" />
                )}
                <div className="post-actions">
                  <button onClick={() => handleLike(post._id)}>
                    <FaThumbsUp /> Like ({post.likeCount})
                  </button>
                  <button onClick={() => handleCopyLink(post._id)}>
                    <FaShare /> Share
                  </button>
                  <button><FaComment /> Comment</button>
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




