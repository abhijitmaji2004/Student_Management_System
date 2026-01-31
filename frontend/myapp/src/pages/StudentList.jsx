import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/studentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem('token');

  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get('/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      alert('Failed to fetch students');
    }
  }, [token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchStudents();
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };

  return (
    <div className="container">
      <h1>Student's List</h1>
      <Link to="/add-student" className="btn-primary">Add Student</Link>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>
                <Link to={`/update-student/${student._id}`} className="btn-secondary">Update</Link>
                <button onClick={() => handleDelete(student._id)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;