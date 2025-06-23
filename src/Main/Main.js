

// import React, { useState, useEffect } from "react";
// import "./Main.css";
// import { useNavigate } from "react-router-dom";
// import AES from "crypto-js/aes";
// import CryptoJS from "crypto-js";

// export default function Main() {
//   const [passwords, setPasswords] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [newPurpose, setNewPurpose] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [selectedPassword, setSelectedPassword] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   const currentUser = localStorage.getItem("currentUser");
//   const navigate = useNavigate();

//   const rawPassword = sessionStorage.getItem("userPassword");

  

//   useEffect(() => {
//   if (!rawPassword) {
//     alert("Session expired. Please login again.");
//     navigate("/login");
//   }
// }, [rawPassword]);


//   const secretKey = CryptoJS.SHA256(rawPassword).toString();

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/");
//   };

 
//   useEffect(() => {
//     if (!currentUser) return;

//     const savedData = JSON.parse(localStorage.getItem("passwordData") || "{}");
//     const userData = savedData[currentUser] || [];

//     const decryptedData = userData.map((item) => ({
//       id: item.id,
//       purpose: item.purpose,
//       password: AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8),
//     }));

//     setPasswords(decryptedData);
//   }, [currentUser]);

//   useEffect(() => {
//     if (!currentUser) return;

//     const encryptedData = passwords.map((item) => ({
//       id: item.id,
//       purpose: item.purpose,
//       password: AES.encrypt(item.password, secretKey).toString(),
//     }));

//     const allData = JSON.parse(localStorage.getItem("passwordData") || "{}");
//     allData[currentUser] = encryptedData;
//     localStorage.setItem("passwordData", JSON.stringify(allData));
//   }, [passwords, currentUser]);

//   const handleAddPassword = () => {
//     if (newPurpose.trim() === "" || newPassword.trim() === "") return;

//     const newEntry = {
//       id: Date.now(),
//       purpose: newPurpose,
//       password: newPassword,
//     };

//     setPasswords([...passwords, newEntry]);
//     resetPopup();
//   };

//   const handleUpdatePassword = () => {
//     if (newPurpose.trim() === "" || newPassword.trim() === "") return;

//     const updated = passwords.map((item) =>
//       item.id === selectedPassword.id
//         ? { ...item, purpose: newPurpose, password: newPassword }
//         : item
//     );

//     setPasswords(updated);
//     resetPopup();
//   };

//   const handleDelete = (id) => {
//     setPasswords(passwords.filter((item) => item.id !== id));
//   };

//   const handlePurposeClick = (item) => {
//     setSelectedPassword(item);
//     setIsEditing(false);
//     setShowPopup(true);
//   };

//   const handleEditClick = (item) => {
//     setSelectedPassword(item);
//     setNewPurpose(item.purpose);
//     setNewPassword(item.password);
//     setIsEditing(true);
//     setShowPopup(true);
//   };

//   const resetPopup = () => {
//     setNewPurpose("");
//     setNewPassword("");
//     setSelectedPassword(null);
//     setIsEditing(false);
//     setShowPopup(false);
//   };

//   const filteredPasswords = passwords.filter((item) =>
//     item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="main-container">
//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           className="plus-button"
//           onClick={() => {
//             setShowPopup(true);
//             setSelectedPassword(null);
//             setIsEditing(false);
//           }}
//         >
//           +
//         </button>
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {filteredPasswords.length > 0 && (
//         <div className="password-list">
//           {filteredPasswords.map((item) => (
//             <div className="password-item" key={item.id}>
//               <div
//                 className="purpose"
//                 onClick={() => handlePurposeClick(item)}
//               >
//                 {item.purpose}
//               </div>
//               <button
//                 className="edit-button"
//                 onClick={() => handleEditClick(item)}
//               >
//                 Modify
//               </button>
//               <button
//                 className="delete-button"
//                 onClick={() => handleDelete(item.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <button className="close-x" onClick={resetPopup}>
//               &times;
//             </button>

//             {selectedPassword && !isEditing ? (
//               <>
//                 <h3>{selectedPassword.purpose}</h3>
//                 <p>Password: {selectedPassword.password}</p>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Purpose"
//                   value={newPurpose}
//                   onChange={(e) => setNewPurpose(e.target.value)}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <button
//                   className="submit-button"
//                   onClick={isEditing ? handleUpdatePassword : handleAddPassword}
//                 >
//                   {isEditing ? "Update" : "Submit"}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

export default function Main() {
  const [passwords, setPasswords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const rawPassword = sessionStorage.getItem("userPassword");

  useEffect(() => {
    if (!rawPassword) {
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  }, [rawPassword]);

  const secretKey = CryptoJS.SHA256(rawPassword).toString();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  useEffect(() => {
    if (!currentUser) return;

    const savedData = JSON.parse(localStorage.getItem("passwordData") || "{}");
    const userData = savedData[currentUser] || [];

    const decryptedData = userData.map((item) => ({
      id: item.id,
      purpose: item.purpose,
      password: AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8),
    }));

    setPasswords(decryptedData);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const encryptedData = passwords.map((item) => ({
      id: item.id,
      purpose: item.purpose,
      password: AES.encrypt(item.password, secretKey).toString(),
    }));

    const allData = JSON.parse(localStorage.getItem("passwordData") || "{}");
    allData[currentUser] = encryptedData;
    localStorage.setItem("passwordData", JSON.stringify(allData));
  }, [passwords, currentUser]);

  const handleAddPassword = () => {
    if (newPurpose.trim() === "" || newPassword.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      purpose: newPurpose,
      password: newPassword,
    };

    setPasswords([...passwords, newEntry]);
    resetPopup();
  };

  const handleUpdatePassword = () => {
    if (newPurpose.trim() === "" || newPassword.trim() === "") return;

    const updated = passwords.map((item) =>
      item.id === selectedPassword.id
        ? { ...item, purpose: newPurpose, password: newPassword }
        : item
    );

    setPasswords(updated);
    resetPopup();
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter((item) => item.id !== id));
  };

  const handlePurposeClick = (item) => {
    setSelectedPassword(item);
    setIsEditing(false);
    setShowPopup(true);
  };

  const handleEditClick = (item) => {
    setSelectedPassword(item);
    setNewPurpose(item.purpose);
    setNewPassword(item.password);
    setIsEditing(true);
    setShowPopup(true);
  };

  const resetPopup = () => {
    setNewPurpose("");
    setNewPassword("");
    setSelectedPassword(null);
    setIsEditing(false);
    setShowPopup(false);
  };

  const filteredPasswords = passwords.filter((item) =>
    item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="plus-button"
          onClick={() => {
            setShowPopup(true);
            setSelectedPassword(null);
            setIsEditing(false);
          }}
        >
          +
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {filteredPasswords.length > 0 && (
        <div className="password-list">
          {filteredPasswords.map((item) => (
            <div className="password-item" key={item.id}>
              <div
                className="purpose"
                onClick={() => handlePurposeClick(item)}
              >
                {item.purpose}
              </div>
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(item)}
                >
                  Modify
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-x" onClick={resetPopup}>
              &times;
            </button>

            {selectedPassword && !isEditing ? (
              <>
                <h3>{selectedPassword.purpose}</h3>
                <p>Password: {selectedPassword.password}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Purpose"
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="submit-button"
                  onClick={isEditing ? handleUpdatePassword : handleAddPassword}
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
