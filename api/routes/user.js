const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/user/post', async (req, res) => {
  // User.findOne(
  //   {
  //     login: req.body.login,
  //     name: req.body.name
  //   }
  // )
  //   .then((user) => {
  //     console.log(user)
  //   })
  try {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    user.save();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/user/delete', async (req, res) => {
  await User.deleteMany(
    {
      login: ''
    }
  )
});

module.exports = router
