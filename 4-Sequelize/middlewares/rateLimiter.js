const { Pool } = require('pg')
const { RateLimiterPostgres } = require('rate-limiter-flexible');

const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});


const rateLimiterOpts = new RateLimiterPostgres({
    storeClient: client,
    points: 4, // 10 requests
    duration: 1,
    blockDuration: 60
});


const rateLimiter = async (req, res, next) => {
    // On the basis of ip address, but can be modified according to your needs
    try {
      if (!req.session.user.is_admin)
        await rateLimiterOpts.consume(req.ip)
      next()
    } catch (error) {
      res.status(429).send('بلوك يا ابن الوسخة');
    }
  };
  
  module.exports = rateLimiter;