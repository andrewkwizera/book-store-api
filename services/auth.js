const {nanoid} = require("nanoid");
const {BadRequest} = require('http-errors');
const {connectRedis} = require('../db/redis');
const logger = require("../utils/logger");
const redisClient = connectRedis()

redisClient.connect().then().catch(console.error)

const EMAIL_TTL = 10 * 60 * 24

const createUserActivationToken = async (user) => {
  try {
    const token = nanoid();
    const userData = {
      id: user._id,
      email: user.email,
      type:'activation'
    };
    await redisClient.setEx(token, EMAIL_TTL, JSON.stringify(userData))
    return token
  } catch (e) {
    logger.error(e)
  }
};

const checkUserActivationToken =  async (token) => {
  try {
       const userInfo = await redisClient.get(token)
       if(!userInfo) throw new Error('invalid activation token')
       // An extra guard 
       if(userInfo.type !== 'activation') throw new Error('invalid token')
       return userInfo
  }catch(e){
    throw new BadRequest('expired or invalid activation link')
  }

}


/**
 * 
 * @param {*} user 
 * @returns token 
 * @description create a reset token for resting passwords
 * ideally in production you would want to seperate this into a speretate redis 
 * database 
 */
const createUserResetToken = async (user) => {
  const token = nanoid();
  const userData = {
    id: user._id,
    email: user.email,
    type:'reset'
  };
  await redisClient.setEx(token, EMAIL_TTL, JSON.stringify(userData))
  return token
}

const checkUserResetToken =  async (token) => {
  try {
       const userInfo = await redisClient.get(token)
       if(!userInfo) throw new Error('invalid reset token')
       if(userInfo.type !== 'reset') throw new Error('invalid token type')
       return userInfo
  }catch(e){
    throw new BadRequest('expired or invalid activation link')
  }

}


module.exports = {
    createUserActivationToken,
    checkUserActivationToken,
    createUserResetToken,
    checkUserResetToken
}