const {
  MONGO_URL = "mongodb://127.0.0.1:27017/bitfilmsdb",
  JWT_SECRET = "JWT_SECRET",
  NODE_ENV,
  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  MONGO_URL,
};