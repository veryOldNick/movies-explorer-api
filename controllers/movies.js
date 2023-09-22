const mongoose = require('mongoose');
const Card = require('../models/movies');

const BadRequestError = require('../errors/bad-request-error'); // 400
const NotFoundError = require('../errors/page-not-found-error'); // 404
const Forbidden = require('../errors/forbidden'); // 403

const createCard = (req, res, next) => {
  const { country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN } = req.body;
  const owner = req.user._id;
  Card.create({ country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN, })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  const { _id } = req.user;
  Card.find({owner: _id })
    .populate("owner", "_id")
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не имеете прав для удаления карточки');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
