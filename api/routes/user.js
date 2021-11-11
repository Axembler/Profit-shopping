const express = require('express');
const { LoaderTargetPlugin } = require('webpack');
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

router.put('/user/updateUser', async (req, res) => {
  updateUser = await User.updateOne(
  {name: req.body.oldName},
  {name: req.body.newName}
  );
  res.status(200).json(updateUser);
});

// УДАЛЕНИЕ ДАННЫХ
router.delete('/user/deleteUser', async (req, res) => {
  const deleteUser = await User.deleteOne({
    name: req.query.name,
    login: req.query.login
  })
  res.status(200).json(deleteUser);
});

// ПОИСК ДНАНЫХ ПО ЛОГИНУ
router.get('/user/getLogin', async (req, res) => {
  const findUserLogin = await User.findOne({
    login: req.query.login
  })
  res.status(200).json(findUserLogin);
});

// ПОИСК ДНАНЫХ ПО ИМЕНИ
router.get('/user/getName', async (req, res) => {
  const findUserName = await User.findOne({
    name: req.query.name
  })
  res.status(200).json(findUserName);
});

module.exports = router
