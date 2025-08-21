

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileViewPage.css';

const ProfileViewPage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add class to body
    document.body.classList.add('profile-view-page-bg');

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('profile-view-page-bg');
    };
  }, []);

  useEffect(() => {
    const fetchLoggedInUserProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
          setError('User is not logged in.');
          return;
        }
        const userId = user._id;
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile data.');
      }
    };

    fetchLoggedInUserProfile();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

 const handleBack = () => {
  navigate('/editprofile', { state: { userId: profile._id } });
};


  return (
    <>
 <div className="profile-h1">
    </div>

      <div className="main">
        <div className="profile-view-container">
          <div className="profile-header">
            <img
              src={`http://localhost:5000${profile.profilePicture}`}
              alt={profile.fullName}
              className="profile-avatar"
            />
            <h1>{profile.fullName}</h1>
          </div>
          <div className="profile-details">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.type1}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Company:</strong> {profile.company}</p>
            <p><strong>Position:</strong> {profile.currentPosition}</p>
                        <p><strong>About:</strong> {profile.about}</p>
          </div>
        </div>
        <div className="back-button">
          <button type="button" onClick={handleBack} style={{ marginTop: '10px' }}>
            Editprofile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileViewPage;


