// const allowedCors = [
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'http://127.0.0.1:3000',
//   'http://127.0.0.1:3001',
//   'http://movie.nomoredomainsrocks.ru',
//   'http://api.movie.nomoredomainsrocks.ru',
//   'movie.nomoredomainsrocks.ru',
//   'api.movie.nomoredomainsrocks.ru',
//   ];

// const corsMid = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

//     return res.end();
//   }

//   return next();
// };

// module.exports = { corsMid };

const corsMid = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", true);

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  return next();
};
module.exports = { corsMid };