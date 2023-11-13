require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorWithoutStatus = require('./errors/error-without-status');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require("./utils/config");
const limiter = require('./middlewares/limiter');
const helmet = require('helmet');
const { corsMid } = require('./middlewares/cors');

const app = express();
app.use(corsMid);
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);

mongoose.connect(MONGO_URL).then(() => {console.log('connected to db')});

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
