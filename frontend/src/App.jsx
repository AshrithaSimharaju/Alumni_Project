
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Post from './components/Post';
import Navbar from './components/Navbar';
import LoginAdm from './components/LoginAdm';
import ProfilePage from './components/ProfilePage';
import ProfileViewPage from './components/ProfileViewPage';
import ContactForm from './components/ContactForm';
import ContactForm1 from './components/contactAdmin';
import Notifications from './components/Notifications';
import ProfileDetails from './components/ProfileDetails'
import About from './components/About'
import EditProfile from './components/EditProfile';
import Admin_login from './components/Admin_login';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import AddStudent from './components/AddStudent';
import PostNotice from './components/PostNotice';
import Login1 from './components/Login1';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={< Admin_login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
         <Route path="/post" element={<Post />} /> 
        <Route path="/event" element={<Events />} /> 
                <Route path="/login1" element={<Login1 />} /> 
        <Route path="/admin_Auth" element={<AdminAuth />}/>
        <Route path="/loginadm" element={<LoginAdm />} /> 
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                    <Route path="/add-student" element={<AddStudent />} />
        <Route path="/post-notice" element={<PostNotice />} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/profileview" element={<ProfileViewPage />} />
        <Route path="/contact" element={<ContactForm />} />
                <Route path="/contact_admin" element={<ContactForm1 />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profiledetails" element={<ProfileDetails />} />
        <Route path="/about" element={<About/>} /> 
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;








