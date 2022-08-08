const { createClient } = require('redis');

const connectRedis = () => {
    const client = createClient({legacyMode:true});
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('connected to redis'))
    return client
}



module.exports = {
    connectRedis
}