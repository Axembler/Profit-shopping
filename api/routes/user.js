const express = require('express');
const { LoaderTargetPlugin } = require('webpack');
const router = express.Router();

const User = require('../models/User');

// РЕГИСТРАЦИЯ
router.post('/user/post', async (req, res) => {
  const findUserRegNickname = await User.findOne({
    nickname: req.body.nickname
  })
  const findUserRegEmail = await User.findOne({
    email: req.body.email
  })
  if (findUserRegNickname == null && findUserRegEmail == null) { 
    try {
      const user = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password
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
  }
  else {
    if (findUserRegNickname && findUserRegEmail) {
      res.status(200).json({ error: 'User with this email and nickname already exist' });
    }
    else if (findUserRegNickname) {
      res.status(200).json({ error: 'User with this nickname already exist' });
    }
    else if (findUserRegEmail) {
      res.status(200).json({ error: 'User with this email already exist' });
    }
  }
});

// АВТОРИЗАЦИЯ
router.get('/user/getAuth', async (req, res) => {
  const findAuth = await User.findOne({
    email: req.query.email,
    password: req.query.password
  })
  res.status(200).json(findAuth);
})

// ИЗМЕНЕНИЕ НИКНЕЙМА
router.put('/user/updateUser', async (req, res) => {
  const date = new Date(Date.now())
  const updateUser = await User.updateOne(
  {nickname: req.body.oldNickname},
  {nickname: req.body.newNickname}
  );
  res.status(200).json({
    message: updateUser.modifiedCount === 1
      ? `Nickname user ${req.body.oldNickname} has been changed to ${req.body.newNickname}!`
      : `User with the nickname ${req.body.oldNickname} not found`,
    date: date.toLocaleString()
  });
});

// УДАЛЕНИЕ ДАННЫХ
router.delete('/user/deleteUser', async (req, res) => {
  const date = new Date(Date.now())
  const deleteUser = await User.deleteOne({
    nickname: req.query.nickname,
    email: req.query.email
  })
  res.status(200).json({
    message: deleteUser.deletedCount === 1
      ? `User with the nickname ${req.query.nickname} and the login ${req.query.email} deleted!`
      : `User with the nickname ${req.query.nickname} and the login ${req.query.email} not found`,
    date: date.toLocaleString()
  });
});

// ПОИСК ДАННЫХ ПО ЛОГИНУ
router.get('/user/getEmail', async (req, res) => {
  const date = new Date(Date.now())
  const findUserEmail = await User.findOne({
    email: req.query.email,
  })
  res.status(200).json({
    message: findUserEmail !== null
      ? (findUserEmail)
      : `User with the email ${req.query.email} not found`,
    date: date.toLocaleString()
  });
});

// ПОИСК ДАННЫХ ПО ИМЕНИ
router.get('/user/getNickame', async (req, res) => {
  const date = new Date(Date.now())
  const findUserNickame = await User.findOne({
    nickname: req.query.nickname
  })
  res.status(200).json({
    message: findUserNickame !== null
      ? (findUserNickame)
      : `User with name ${req.query.nickname} not found`,
    date: date.toLocaleString()
  });
});

// ПОИСК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
router.get('/user/getUsers', async (req, res) => {
  const date = new Date(Date.now())
  const findUsers = await User.find()
  res.status(200).json({
    message: findUsers.length
      ? (findUsers)
      : 'Users not found',
    date: date.toLocaleString()
  });
});

// ВЫДАЧА ВИП
router.put('/user/vipUser', async (req, res) => {
  const date = new Date(Date.now())
  const vipUser = await User.updateOne(
    {nickname: req.body.nickname},
    {role: "VIP"}
  );
  res.status(200).json({
    message: vipUser.modifiedCount === 1
      ? `User get VIP!`
      : `User not found or already has VIP`,
    date: date.toLocaleString()
  });
});

module.exports = router
