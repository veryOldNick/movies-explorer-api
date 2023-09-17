const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUserById,
} = require('../controllers/users');

// создаёт пользователя
router.post('/', createUser);

// возвращает всех пользователей
router.get('/', getUsers);

// возвращает пользователя по _id
router.get('/:userId', getUserById);


module.exports = router;