const express = require('express');
const router = express.Router();
const UserDB = require('../models/userModel');
const CommentDB = require('../models/commentModel');
const { handleUserSignUp, handleUserLogin } = require('../controller/userAuth');
const { createHmac, randomBytes } = require('crypto');
const { checkAuthenticationCookie } = require('../middleware/authentication');


//Sign UP Route and Implementation
router.get('/signup', (req, res) => {
  return res.render('signup');
}).post('/signup', handleUserSignUp);

router.post('/verify-otp', async(req, res) => {
  const { otp } = req.body
  if (otp == 1234) {
    req.session.emailVerified = true;

    const FullName =  req.session.FullName;
    const password = req.session.password;
     const email = req.session.email;


     await UserDB.create({
    FullName, 
    email, 
    password 
  });
     return res.status(200).json({ message: "OTP verified successfully" });
  } else {
       return res.status(400).json({ message: "Invalid OTP" });
  }
})



router.get('/login', (req, res) => {
  return res.render('login');
}).post('/login', handleUserLogin);

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  console.log(' Token cookie cleared');
  return res.status(200).json({ message: "suceess Logout" });
});

router.get("/me", checkAuthenticationCookie("token"), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ user: req.user });
});

app.get('/check-session', (req, res) => {
  console.log("Session data:", req.session);
  res.json({ session: req.session });
});



router.post('/comment/:id/like', async (req, res) => {

  const commentID = req.params.id;
  const userId = req.user._id;
  const comment = await CommentDB.findById(commentID);

  if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

  const alreadyLiked = comment.likes.includes(userId);

  if (alreadyLiked) {
    // Unlike
    comment.likes.pull(userId);
    await comment.save();

    console.log('COMMENT LENTH ID', comment.likes.length);

    return res.json({
      success: true,
      liked: false,
      totalLikes: comment.likes.length

    });
  } else {
    // Like
    comment.likes.push(userId);
    await comment.save();

    return res.json({
      success: true,
      liked: true,
      totalLikes: comment.likes.length

    });

  }

})





module.exports = router;
