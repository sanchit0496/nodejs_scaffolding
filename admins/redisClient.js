const Redis = require('ioredis');

// Create a new Redis client instance. The default connection is to localhost on port 6379.
// If you need to connect to a Redis server on a different host or port, you can pass in options.
const redisClient = new Redis({
  host: 'localhost', // the Redis server host
  port: 6379,        // the Redis server port
  password: '', // if your Redis server requires authentication
  db: 0,             // default database to use
  lazyConnect: true,
  // Additional options if needed...
});

// Event listeners for Redis client
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis client error', err);
});

// Export the client for use elsewhere in your application
module.exports = redisClient;
