const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for blog posts
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
