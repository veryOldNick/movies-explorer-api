const mongoose = require('mongoose');

const User = require('../models/users');
const BadRequestError = require('../errors/bad-request-error'); // 400
const NotFoundError = require('../errors/page-not-found-error'); // 404


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
};