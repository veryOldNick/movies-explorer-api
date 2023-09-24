const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');


const app = express();
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb').then(() => {
  console.log('connected to db');
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '650714714b8ae7d573db4bbb',
//   };
//   next();
// });


app.use(router);

app.listen(PORT, () => {
  console.log(`server is on the ${PORT}`);
});