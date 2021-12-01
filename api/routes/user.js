const express = require('express');
const { LoaderTargetPlugin } = require('webpack');
const router = express.Router();

const User = require('../models/User');
const assert = require('assert')

// РЕГИСТРАЦИЯ
router.post('/user/post', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
      role: 'User'
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).json({ err });
        return;
      } else res.status(200).json({ user });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// АВТОРИЗАЦИЯ
router.get('/user/getAuth', async (req, res) => {
  const findAuth = await User.findOne({
    login: req.query.login,
    password: req.query.password
  })
  res.status(200).json(findAuth);
})

// ИЗМЕНЕНИЕ НИКНЕЙМА
router.put('/user/updateUser', async (req, res) => {
  updateUser = await User.updateOne(
  {name: req.body.oldName},
  {name: req.body.newName}
  );
  res.status(200).json({
    message: updateUser.modifiedCount === 1
      ? `Nickname user ${req.query.oldName} has been changed to ${req.query.newName}!`
      : `User with the name ${req.query.oldName} not found`
  });
});

// УДАЛЕНИЕ ДАННЫХ
router.delete('/user/deleteUser', async (req, res) => {
  const deleteUser = await User.deleteOne({
    name: req.query.name,
    login: req.query.login
  })
  res.status(200).json({
    message: deleteUser.deletedCount === 1
      ? `User with the name ${req.query.name} and the login ${req.query.login} deleted!`
      : `User with the name ${req.query.name} and the login ${req.query.login} not found`
  });
});

// ПОИСК ДНАНЫХ ПО ЛОГИНУ
router.get('/user/getLogin', async (req, res) => {
  const findUserLogin = await User.findOne({
    login: req.query.login
  })
  res.status(200).json({
    message: findUserLogin !== null
      ? (findUserLogin)
      : `User with the login ${req.query.login} not found`
  });
});

// ПОИСК ДНАНЫХ ПО ИМЕНИ
router.get('/user/getName', async (req, res) => {
  const findUserName = await User.findOne({
    name: req.query.name
  })
  res.status(200).json({
    message: findUserName !== null
      ? (findUserName)
      : `User with name ${req.query.name} not found`
  });
});

// ВЫДАЧА ВИП
router.put('/user/vipUser', async (req, res) => {
  vipUser = await User.updateOne(
  {role: req.body.oldRole},
  {role: req.body.newRole}
  );
  res.status(200).json({
    message: vipUser.modifiedCount === 1
      ? `User get VIP!`
      : `User not found or already has VIP`
  });
});

module.exports = router
