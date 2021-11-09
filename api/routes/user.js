const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/user/post', async (req, res) => {
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
  await User.deleteMany()
});

router.get('/user/getLogin', async (req, res) => {
  console.log(req.query)
  const findUser = await User.findOne({
    login: req.query.login
  })
  res.status(200).json(findUser);
});

router.get('/user/getNickname', async (req, res) => {
  console.log(req.query)
  const findUser = await User.findOne({
    name: req.query.nickname
  })
  res.status(200).json(findUser);
});

module.exports = router
