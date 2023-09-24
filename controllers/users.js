const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const BadRequestError = require('../errors/bad-request-error'); // 400
const NotFoundError = require('../errors/page-not-found-error'); // 404
const ConflictError = require('../errors/conflict-error'); // 409

const createUser = (req, res, next) => {
  const { name, email, password, } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash, })
        .then((user) => {
          const { _id } = user;
          res.status(201).send({ name, email, _id,});
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          return next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'bla bla bla', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с таким id не найден');
    }
    res.status(200).send({ data: user });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Некорректный  id'));
    }
    return next(err);
  });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

module.exports = {
  getUserInfo,
  updateProfile,
  createUser,
  login
};