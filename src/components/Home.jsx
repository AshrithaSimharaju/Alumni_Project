// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Home.css"; // Import your CSS file for Home

// function Home() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedProfile = localStorage.getItem("profile");
//     if (storedProfile) {
//       navigate("/dashboard");
//     }
//   }, []);

//   return (
//     <div>
//                     <div className="navbar">
//                       <div className="navbar-left">
//                          <p>Rajiv Gandhi University Of Knowledge Technologies BASAR</p>
//                        </div>
//                        <div className="navbar-right">
//                          <Link to="/Signup" className="nav-link">
//                            Signup
//                          </Link>
//                          <Link to="/Login" className="nav-link">
//                           Login
//                         </Link>

//                        </div>
//                      </div>

//                      <div className="college-info">
//        <div className="college-text">
//          <h1>RGUKT Basar</h1>
//          <p>
//             RGUKT College is a prestigious institution known for its academic excellence and vibrant campus life. Our alumni network spans across the state, and we offer a wide range of courses designed to equip students with the skills and knowledge they need to succeed.
//          </p>
//        </div>
//      </div>
//      </div>
//   );
// }

// export default Home;




import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"; // Import your CSS file for Home

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
                    <div className="navbar">
                      <div className="navbar-left">
                         <p>Alumni Association Platform</p>
                       </div>
                       <div className="navbar-right">
                         <Link to="/Signup" className="nav-link">
                           Signup
                         </Link>
                         <Link to="/Login" className="nav-link">
                          Login
                        </Link>
                        <Link to="/About" className="nav-link">
                          About
                        </Link>
                       </div>
                     </div>

                     <div className="college-info">
       <div className="college-text">
         <p>
         "Welcome back to the place where your journey began. The Alumni Association of Rajiv Gandhi University Of Knowledge Technologies is a community of achievers, innovators, and dreamers. Here, connections are made, memories are cherished, and legacies are built. Join us as we continue to shape the future together."
         </p>
       </div>
     </div>
     </div>
  );
}

export default Home;


