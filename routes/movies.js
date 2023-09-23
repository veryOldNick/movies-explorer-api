const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const regUrl = require('../utils/constants');

const {
  createCard,
  getCards,
  deleteCard,
} = require('../controllers/movies');

// создаёт карточку
router.post('/', createCard);

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getCards);

// удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);


module.exports = router;
