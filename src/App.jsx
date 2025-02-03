
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import Events from './components/Events';
import AddEvent from './components/AddEvent';
// import Profile from './components/Profile';
import Post from './components/Post';
import Navbar from './components/Navbar';
import LoginAdm from './components/LoginAdm';
import ProfilePage from './components/ProfilePage';
import ProfileViewPage from './components/ProfileViewPage';
import ContactForm from './components/ContactForm';
import Notifications from './components/Notifications';
import ProfileDetails from './components/ProfileDetails'
import About from './components/About'
import EditProfile from './components/EditProfile';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gallery" element={<Gallery />} />
         <Route path="/post" element={<Post />} /> 
        <Route path="/event" element={<Events />} /> 
        <Route path="/loginadm" element={<LoginAdm />} /> 
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/profileview" element={<ProfileViewPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profiledetails" element={<ProfileDetails />} />
        <Route path="/about" element={<About/>} /> 
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
