const express = require('express');
const router = express.Router();
const multer = require('multer');
const Blog = require('../models/blogModel');
const CommentDB = require('../models/commentModel');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('coverImage'), async (req, res) => {
  const { title, content } = req.body;

  //const coverImage = req.file ? `./public/uploads/${req.file.filename}` : null;
  const coverImage = req.file ? `./public/uploads/${req.file.filename}` : null;

  const blog = await Blog.create({
    title,
    content,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`
  });
  return res.status(200).json({BlogID: blog._id});
});

router.get('/addBlog', async (req, res) => {
  return res.render('addBlog');
});

router.get('/:id', async (req, res) => {

  console.log('handos handnsdjfsf');
  const blogID = req.params.id;
  const blog = await Blog.findById(blogID);

  if (!blog) {
    return res.status(404).json({message:'Blog not found'});
  }

  const comments = await CommentDB.find({ blogId: blogID }).populate('CommentBy');
   return res.status(200).json({blog, comments});

})


//comment route

router.post('/comment/:id', async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  const { comment } = req.body;
  const CommentBy = req.user._id;

  console.log('CommentBy', CommentBy)
  const commentRes = await CommentDB.create({
    blogId,
    comment,
    CommentBy,
  });
  res.redirect(`/blog/${req.params.id}`);

})

module.exports = router;