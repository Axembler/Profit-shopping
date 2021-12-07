const express = require('express');
const { LoaderTargetPlugin } = require('webpack');
const router = express.Router();

const User = require('../models/User');

// РЕГИСТРАЦИЯ
router.post('/user/post', async (req, res) => {
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
  updateUser = await User.updateOne(
  {nickname: req.body.oldNickame},
  {nickname: req.body.newNickame}
  );
  res.status(200).json({
    message: updateUser.modifiedCount === 1
      ? `Nickname user ${req.query.oldNickame} has been changed to ${req.query.newNickame}!`
      : `User with the nickname ${req.query.oldNickame} not found`
  });
});

// УДАЛЕНИЕ ДАННЫХ
router.delete('/user/deleteUser', async (req, res) => {
  const deleteUser = await User.deleteOne({
    nickname: req.query.nickname,
    email: req.query.email
  })
  res.status(200).json({
    message: deleteUser.deletedCount === 1
      ? `User with the nickname ${req.query.nickname} and the login ${req.query.email} deleted!`
      : `User with the nickname ${req.query.nickname} and the login ${req.query.email} not found`
  });
});

// ПОИСК ДНАНЫХ ПО ЛОГИНУ
router.get('/user/getEmail', async (req, res) => {
  const findUserEmail = await User.findOne({
    email: req.query.email
  })
  res.status(200).json({
    message: findUserEmail !== null
      ? (findUserEmail)
      : `User with the email ${req.query.email} not found`
  });
});

// ПОИСК ДНАНЫХ ПО ИМЕНИ
router.get('/user/getNickame', async (req, res) => {
  const findUserNickame = await User.findOne({
    nickname: req.query.nickname
  })
  res.status(200).json({
    message: findUserNickame !== null
      ? (findUserNickame)
      : `User with name ${req.query.nickname} not found`
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
