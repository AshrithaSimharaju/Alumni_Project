import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import "./ProfileDetails.css";

const ProfileDetails = () => {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const search = searchParams.get('search'); // Get the search term from the URL
  useEffect(() => {
    // Add class to body
    document.body.classList.add('post-page-bkg');

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('post-page-bg');
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile?search=${search}`);
        if (response.data.length > 0) {
          setProfile(response.data[0]); // Assuming only one profile matches the name
        } else {
          setError('No profile found with the given name.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data.');
      }
    };

    if (search) {
      fetchProfile();
    }
  }, [search]);

  return (
    <div className="profiledetails-img">
  {error ? (
    <p>{error}</p>
  ) : profile ? (
    <div className="profile-card">
      <h1>{profile.fullName}</h1>
      <div className="pro-image">
      <img
        src={`http://localhost:5000${profile.profilePicture}`}
        alt={profile.fullName}
        className="profile-avatar"
      /></div>
      <p><strong>Full Name:</strong> {profile.fullName}</p>
      <p><strong>Position:</strong> {profile.currentPosition}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Skills:</strong> {profile.skills}</p>
      <p><strong>Current Position:</strong> {profile.currentPosition}</p>
      <p><strong>Company:</strong> {profile.company}</p>
      <p><strong>About:</strong> {profile.about}</p>
    </div>
  ) : (
    <p>Loading profile...</p>
  )}
</div>

  );
};

export default ProfileDetails;

