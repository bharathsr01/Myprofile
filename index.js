const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// In-memory student data
const students = [];

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const existing = students.find(s => s.username === username);
  if (existing) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  students.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'Student registered successfully.' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const student = students.find(s => s.username === username);
  if (!student) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  const valid = await bcrypt.compare(password, student.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
  res.json({ message: 'Login successful.' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
