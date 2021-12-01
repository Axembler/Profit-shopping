const mongoose = require('mongoose');
const { Schema } = mongoose;

//список спец. символов: !"№;%:?*()_=+@#$^&<>,.-

const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, 'is too short'],
    maxlength: [12, 'is too long'],
    validate: {
      validator: function(v) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(v);
      },
      message: 'is invalid!'
    }
  },
  login: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, 'is too short'],
    maxlength: [24, 'is too long'],
    validate: {
      validator: function(v) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(v);
      },
      message: 'is invalid!'
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'is too short'],
    maxlength: [18, 'is too long'],
    validate: {
      validator: function(v) {
        return /^[0-9a-zA-Z\!\"\№\;\%\:\?\*\(\)\_\=\+\@\#\$\^\&\<\>\,\.\-]+$/.test(v);
      },
      message: 'is invalid!'
    }
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', User);