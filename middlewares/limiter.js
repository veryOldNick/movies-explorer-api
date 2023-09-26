const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Количество запросов с вашего IP превышено. Повторите попытку позже.",
});

module.exports = limiter;