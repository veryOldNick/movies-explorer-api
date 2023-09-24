const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/constants');

const {
  createCard,
  getCards,
  deleteCard,
} = require('../controllers/movies');

// создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regUrl),
    trailerLink: Joi.string().required().pattern(regUrl),
    thumbnail: Joi.string().required().pattern(regUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
})
,createCard);

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getCards);

// удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}),deleteCard);


module.exports = router;
