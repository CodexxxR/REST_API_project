const express = require('express');
const router = express.Router()
const Blog = require('../models/blog')

//getting all
router.get('/', async (req,res)=>{
    try {
        const blogs = await Blog.find()
        res.send(blogs)
    } catch(err){
        res.status(500).json({message: err.message})
    }
});
//getting one
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
  })
  

//creating one
router.post('/', async (req,res)=>{
    const blog = new Blog({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
    try {
        const newBlog = await blog.save()
        res.status(201).json(newBlog)
    } catch(err){
        res.status(400).json({message: err.message})
    }
});
//updating one
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
      res.blog.title = req.body.title
    }
    if (req.body.body != null) {
      res.blog.body = req.body.body
    }
    try {
      const updatedBlog = await res.blog.save()
      res.json(updatedBlog)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
//deleting one
router.delete('/:id', getBlog, async (req, res) => {
    try {
      await res.blog.remove()
      res.json({ message: 'Deleted the Blog' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
async function getBlog(req, res, next) {
    let blog
    try {
      blog = await Blog.findById(req.params.id)
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.blog = blog
    next()
  }
module.exports = router