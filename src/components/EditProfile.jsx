// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './EditProfile.css';

// const EditProfile = ({userId}) => {
//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     email: '',
//     type1: '',
//     location: '',
//     skills: '',
//     currentPosition:'',
//     company:'',
//     about:'',
//     profilePicture:'',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch the logged-in user's profile data
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       axios
//         .get(`http://localhost:5000/api/profile/${user._id}`)
//         .then((response) => {
//           setProfileData(response.data);
//         })
//         .catch((err) => {
//           setError('Failed to load profile data');
//           console.error(err);
//         });
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       [name]: value,
//     });
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const user = JSON.parse(localStorage.getItem('user'));
//     console.log(user);
//     if (user) {
//       axios
//         .put(`http://localhost:5000/api/profile/${user._id}`, profileData)
//         .then((response) => {
//             console.log(profileData);
//           alert('Profile updated successfully!');
//           navigate('/dashboard');
//         })
//         .catch((err) => {
//           setError('Failed to update profile');
//           console.error(err);
//         });
//     }
//   };
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Optional: Preview the image
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileData((prevData) => ({
//           ...prevData,
//           profilePicture: reader.result, // Base64-encoded string for preview
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  

//   return (
//     <div className="edit-profile-container">
//       <h2>Edit Profile</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={profileData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={profileData.email}
//             onChange={handleChange}
//             disabled
//           />
//         </div>
//  <div className="form-group">
//   <label htmlFor="type1">Type</label>
//   <select
//     id="type1"
//     name="type1"
//     value={profileData.type1}
//     onChange={handleChange}
//     required
//     >
//     <option value="">Select Type</option> {/* Default option */}
//     <option value="alumni">alumni</option>
//     <option value="student">student</option>
//     <option value="admin">admin</option>
//   </select>
//     </div>

//         <div className="form-group">
//           <label htmlFor="location">Location</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={profileData.location}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="skills">Skills</label>
//           <input
//             type="text"
//             id="skills"
//             name="skills"
//             value={profileData.skills}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="currentposition">CurrentPosition</label>
//           <input
//             type="text"
//             id="currentposition"
//             name="currentposition"
//             value={profileData.currentPosition}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="company">Company</label>
//           <input
//             type="text"
//             id="company"
//             name="company"
//             value={profileData.company}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="about">About</label>
//           <textarea
//             id="about"
//             name="about"
//             value={profileData.about}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//   <label htmlFor="profilePicture">Profile Picture</label>
//   <input
//     type="file"
//     id="profilePicture"
//     name="profilePicture"
//     accept="image/*" // Restrict to image files
//     onChange={handleFileChange}
//   />
// </div>

//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    type1: '',
    profilePicture: '',
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Type:
        <select
          name="type1"
          value={formData.type1}
          onChange={handleChange}
        >
          <option value="alumni">Alumni</option>
          <option value="student">Student</option>
        </select>
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;
