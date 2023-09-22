const router = require('express').Router();

const {
  getUserInfo,
  updateProfile
 } = require("../controllers/users");


// возвращает информацию о пользователе
router.get('/me', getUserInfo);

// обновляет информацию о пользователе _id
router.patch("/me", updateProfile);


module.exports = router;
