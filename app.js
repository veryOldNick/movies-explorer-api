require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorWithoutStatus = require('./errors/error-without-status');
const { errors } = require('celebrate');
const { JWT_SECRET } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb').then(() => {
  console.log('connected to db');
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorWithoutStatus);

app.listen(PORT, () => {
  console.log(`server is on the ${PORT}`);
});