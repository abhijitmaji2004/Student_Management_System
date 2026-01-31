const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/students', auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/students/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/students', auth, async (req, res) => {
  const { name, roll, email, phone, age, course } = req.body;
  try {
    const newStudent = new Student({ name, roll, email, phone, age, course });
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/students/:id', auth, async (req, res) => {
  const { name, roll, email, phone, age, course } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, { name, roll, email, phone, age, course }, { new: true });
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/students/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;