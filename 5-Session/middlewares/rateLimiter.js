const { Pool } = require('pg')
const { RateLimiterPostgres } = require('rate-limiter-flexible');

const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'? { rejectUnauthorized: false } : true
});


const rateLimiterOpts = new RateLimiterPostgres({
    storeClient: client,
    points: 4, 
    duration: 1,
    blockDuration: 60,
    tableName: 'brute_force',
    keyPrefix: 'tmp'
});


const rateLimiter = async (req, res, next) => {
    // On the basis of ip address, but can be modified according to your needs
    try {
        await rateLimiterOpts.consume(req.ip)
      next()
    } catch (error) {
      res.status(429).render('block_page')
    }
  };
  
  module.exports = rateLimiter;