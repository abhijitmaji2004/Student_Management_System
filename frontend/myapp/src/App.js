import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';  // Confirm your folder is 'pages'
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import Navbar from './Layout/Navbar';
import './css/global.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/students" element={isAuthenticated ? <StudentList /> : <Navigate to="/login" />} />
          <Route path="/add-student" element={isAuthenticated ? <AddStudent /> : <Navigate to="/login" />} />
          <Route path="/update-student/:id" element={isAuthenticated ? <UpdateStudent /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/students" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;