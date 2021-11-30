const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// [GET] /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'The posts information could not be retrieved' });
  }
});

// [GET] /api/posts/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Posts.findById(id);

    if (!post) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: 'The post information could not be retrieved' });
  }
});

// [POST] /api/posts
router.post('/', async (req, res) => {
  const { title, contents } = req.body;

  try {
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {
      const { id } = await Posts.insert({ title, contents });
      res.status(201).json({ title, contents, id });
    }
  } catch (err) {
    res.status(500).json({ message: 'There was an error while saving the post to the database' });
  }
});

// [PUT] /api/posts/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  try {
    if (!title || !contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {
      const updatedPosts = await Posts.update(id, { title, contents });

      if (!updatedPosts) {
        res.status(404).json({ message: 'The post with the specified ID does not exist' });
      } else {
        res.status(200).json({ title, contents, id: parseInt(id) });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'The post information could not be modified' });
  }
});

module.exports = router;
