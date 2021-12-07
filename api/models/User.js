const mongoose = require('mongoose');
const { Schema } = mongoose;

//список спец. символов: !"№;%:?*()_=+@#$^&<>,.-

const User = new Schema({
  nickname: {
    type: String,
    required: [true, 'must be entered'],
    trim: true,
    minlength: [4, 'is too short'],
    maxlength: [14, 'is too long'],
    validate: {
      validator: function(name) {
        return /^[0-9a-zA-Z\_]+$/.test(name);
      },
      message: 'is invalid!'
    }
  },
  email: {
    type: String,
    required: [true, 'must be entered'],
    trim: true,
    lowercase: true,
    minlength: [4, 'is too short'],
    validate: {
      validator: function(email) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(email);
      },
      message: 'is invalid!'
    }
  },
  password: {
    type: String,
    required: [true, 'must be entered'],
    trim: true,
    minlength: [8, 'is too short'],
    maxlength: [24, 'is too long'],
    validate: {
      validator: function(password) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(password);
      },
      message: 'is invalid!'
    }
  },
  role: {
    type: String,
    required: true,
    default: 'User'
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('User', User);