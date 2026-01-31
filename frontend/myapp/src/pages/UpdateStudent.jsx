import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/addUpdateStudent.css";

const UpdateStudent = () => {
  const [form, setForm] = useState({ name: '', roll: '', email: '',phone: '', age: '', course: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchStudent = useCallback(async () => {
    try {
      const res = await axios.get(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
    } catch (err) {
      alert('Failed to fetch student');
    }
  }, [id, token]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/students/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/students');
    } catch (err) {
      alert('Failed to update student');
    }
  };

  return (
    <div className="container">
      <h1>Update Student</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="roll" type="number" placeholder="Roll" value={form.roll} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="number" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;