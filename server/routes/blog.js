const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const Blog = require('../models/Blog');

router.route('/')
  .get((req, res) => {
    Blog.find({}, (err, chats) => {
      res.status(err ? 400 : 200).send(err || chats);
    });
  })
  .post((req, res) => {
    console.log('req.body: ', req.body);
    let newBlogPost = req.body;
    console.log('newBlogPost: ', newBlogPost);
    Blog.create(req.body)
      .then((blogPost) => {
        blogPost.title = newBlogPost.title;
        blogPost.author = newBlogPost.author;
        blogPost.content = newBlogPost.content;
        return blogPost.save();
      })
      .then((blogPost) => {
        res.send(blogPost);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

router.route('/:id')
  .put((req, res) => {
    let id = req.params.id;
    let postUpdates = req.body;
    console.log('postUpdates: ', postUpdates);
    Blog.findByIdAndUpdate(id, {$set: postUpdates}, {'new': true})
      .then((blogPost) => {
        res.send(blogPost);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    let id = req.params.id;
    Blog.findByIdAndRemove(id)
      .then((query) => {
        res.send(query);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

module.exports = router;
