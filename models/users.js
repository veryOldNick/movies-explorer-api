const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

// module.exports = mongoose.model('user', userSchema);


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   about: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   avatar: {
//     type: String,
//     required: true,
//   },
// });

module.exports = mongoose.model('user', userSchema);