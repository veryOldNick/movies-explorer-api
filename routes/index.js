const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regUrl = require('../utils/constants');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/page-not-found-error'); // 404

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}),createUser);

// авторизация
router.use(auth);

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
