const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
// const regUrl = require('../utils/constants');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/page-not-found-error'); // 404

router.post('/signin', login);

router.post('/signup', createUser);

// авторизация
router.use(auth);

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
