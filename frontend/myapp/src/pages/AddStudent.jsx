import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/addUpdateStudent.css";

const AddStudent = () => {
  const [form, setForm] = useState({ name: '', roll: '', email: '',phone: '', age: '', course: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/students');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <div className="container">
      <h1>Add Student</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="roll" type="number" placeholder="Roll" value={form.roll} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="number" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;