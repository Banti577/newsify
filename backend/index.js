
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const staticRouter = require('./routes/staticRoute');
const blogRouter = require('./routes/blogRoute');
const mongoose = require('mongoose');
const UserDB = require('./models/userModel');
const Blog = require('./models/blogModel');
const { connectToMongoDB } = require('./connection');
const cookieParser = require('cookie-parser');
const { checkAuthenticationCookie } = require('./middleware/authentication');
const session = require('express-session');
const cors = require("cors");
require('dotenv').config();


//Middleware
app.use(cors({
  origin: "http://localhost:3000",
   credentials: true  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'aatena@biharmai', // कोई strong secret डालो
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure: true तभी जब HTTPS हो
}));
app.use(checkAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));






//Global Middleware to make user available in all views

app.use((req, res, next) => {
  // console.log("USER from cookie:", req.user);
  res.locals.user = req.user;
  next();
});


//Routes
app.use('/user', staticRouter);
app.use('/blog', blogRouter);

app.get('/api', async(req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  console.log('bhaiya ji saiyyaa');
   res.json(allBlogs);
});


connectToMongoDB(process.env.MONGO_URL);
//'10.162.156.212',

app.listen(port, (req, res) => {
console.log(`Server is running on http://localhost:${port}`);
})