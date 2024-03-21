const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];
let nextId = 3; // To generate unique IDs for new users

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a specific user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = nextId++;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PATCH (update) an existing user by ID
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE an existing user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
