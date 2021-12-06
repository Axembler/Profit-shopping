const mongoose = require('mongoose');
const { Schema } = mongoose;

//список спец. символов: !"№;%:?*()_=+@#$^&<>,.-

const User = new Schema({
  name: {
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
  login: {
    type: String,
    required: [true, 'must be entered'],
    trim: true,
    lowercase: true,
    minlength: [4, 'is too short'],
    maxlength: [24, 'is too long'],
    validate: {
      validator: function(login) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(login);
      },
      message: 'is invalid!'
    }
  },
  password: {
    type: String,
    required: [true, 'must be entered'],
    trim: true,
    minlength: [6, 'is too short'],
    maxlength: [18, 'is too long'],
    enum: {
      values: ['444444', '333333'],
      message: '{VALUE} is not supported'
    },
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
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('User', User);