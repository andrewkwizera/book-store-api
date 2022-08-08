const { createClient } = require('redis');
const logger = require('../config/logger')

const connectRedis = () => {
    const client = createClient({legacyMode:true});
    client.on('error', (err) => logger.info('Redis Client Error', err));
    client.on('connect', () => logger.info('connected to redis'))
    return client
}



module.exports = {
    connectRedis
}