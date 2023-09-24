const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  updateProfile
 } = require("../controllers/users");


// возвращает информацию о пользователе
router.get('/me', getUserInfo);

// обновляет информацию о пользователе _id
router.patch("/me", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}),updateProfile);


module.exports = router;
