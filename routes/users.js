const router = require('express').Router();

const {
  getUserInfo,
  updateUserInfo
 } = require("../controllers/users");


// возвращает информацию о пользователе
router.get("/me", getUserInfo);

// обновляет информацию о пользователе _id
router.patch("/me", updateUserInfo);


module.exports = router;
