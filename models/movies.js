const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country:" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "link" должно быть заполнено'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "link" должно быть заполнено'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "link" должно быть заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Поле "owner" должно быть заполнено'],
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "owner" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "owner" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "owner" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("movie", movieSchema);