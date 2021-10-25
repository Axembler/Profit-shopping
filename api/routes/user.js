const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/user', async (req, res) => {
  // res.json(await User.find());
  try {
    const user = new User({
      name: 'Лох',
      login: 'Да',
      password: 'Нет'
    });
    user.save();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/user/add', async (req, res) => {
  await User.findOne({ login: req.body.login })
    .then(() => {
      try {
        const user = new User({
          name: clientName,
          login: req.body.login,
          password: req.body.password
        });
        user.save();
        res.status(200).json({ data: user });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    })
});

module.exports = router
