


// import React, { useState } from "react";
// import './Signup.css';
// import { useNavigate } from 'react-router-dom'; 
// import CryptoJS from "crypto-js";

// export default function Signup() {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     email: '',
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = () => {
//     const { email, username, password } = userData;

//     // Basic validation
//     if (!email || !username || !password) {
//       alert("All fields are required.");
//       return;
//     }

//     // Save the data to localStorage
//     localStorage.setItem("user", JSON.stringify(userData));
//     alert("Account created successfully!");

//     // Navigate to login
//     navigate("/login");


      


//   };

//   return (
//     <div className="container">
//       <h1>Sign Up</h1>

//       <div className="box">
//         <i className="fa-solid fa-envelope"></i>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Your Email"
//           value={userData.email}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="box">
//         <i className="fa-solid fa-user"></i>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Your Username"
//           value={userData.username}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="box">
//         <i className="fa-solid fa-lock"></i>
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Your Password"
//           value={userData.password}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="button-group">
//         <button className="btn" onClick={handleSubmit}>
//           Sign Up
//         </button>

//         <button className="btn login-btn" onClick={() => navigate('/login')}>
//           Login
//         </button>
//       </div>

//       <p className="login-text">Already have an account?</p>
//     </div>
//   );
// }








import React, { useState } from "react";
import './Signup.css';
import { useNavigate } from 'react-router-dom'; 
import CryptoJS from "crypto-js";

export default function Signup() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { email, username, password } = userData;

    // Basic validation
    if (!email || !username || !password) {
      alert("All fields are required.");
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};

    // Check if username already exists
    if (existingUsers[username]) {
      alert("Username already exists. Please choose another.");
      return;
    }

    // 🔐 Hash the password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Prepare new user object
    const newUser = {
      email,
      username,
      password: hashedPassword,
    };

    // Save to localStorage under "users" object
    existingUsers[username] = newUser;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <div className="box">
        <i className="fa-solid fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>

      <div className="box">
        <i className="fa-solid fa-user"></i>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          value={userData.username}
          onChange={handleChange}
        />
      </div>

      <div className="box">
        <i className="fa-solid fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>

      <div className="button-group">
        <button className="btn" onClick={handleSubmit}>
          Sign Up
        </button>

        <button className="btn login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>

      <p className="login-text">Already have an account?</p>
    </div>
  );
}
