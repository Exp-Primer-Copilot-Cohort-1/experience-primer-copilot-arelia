// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Load the comments data
const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', function (req, res) {
  res.json(comments);
});

// Get single comments
app.get('/comments/:id', function (req, res) {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// Add new comment
app.post('/comments', function (req, res) {
  const comment = req.body;
  comments.push(comment);
  res.json(comment);
});

// Update comment
app.put('/comments/:id', function (req, res) {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  comment.content = req.body.content;
  res.json(comment);
});

// Delete comment
app.delete('/comments/:id', function (req, res) {
  const id = req.params.id;
  const index = comments.findIndex(comment => comment.id === id);
  comments.splice(index, 1);
  res.json({ message: 'Comment deleted' });
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
