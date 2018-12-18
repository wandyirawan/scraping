const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 8081;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/fabelio';
} else if (env === 'test') {
  process.env.PORT = 8081;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/fabelioTest';
}
