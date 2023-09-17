const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb').then(() => {
  console.log('connected to db');
});
// mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
//   console.log('connected to db');
// });

// // app.use((req, res, next) => {
// //   req.user = {
// //     _id: '64d3df77b028bc1ab5cb3ee5',
// //   };
// //   next();
// // });
app.use((req, res, next) => {
  req.user = {
    _id: '64d3df77b028bc1ab5cb3ee5',
  };
  next();
});

app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ошибка 404. Нет такой страницы' });
});

app.listen(PORT, () => {
  console.log(`server is on the ${PORT}`);
});