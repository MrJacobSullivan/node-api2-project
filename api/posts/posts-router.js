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
  try {
    const { id } = req.params;
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

module.exports = router;
