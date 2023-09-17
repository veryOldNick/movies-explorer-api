const User = require('../models/user');

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};