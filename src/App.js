import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Main from './Main/Main'
function App() {
  return (
   <div className="App">
       <Routes>
         <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      
    </div>
    
  );
}

export default App;






